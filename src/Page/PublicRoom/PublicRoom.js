import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../Service/Socket";
import Peer from "simple-peer";
import UserSpace from "./UserSpace";
import Calendar from "../../Component/Calendar/Calendar";
import { toast } from "react-toastify";

const PublicRoomContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    min-height: 720px;
    padding: 0 max(50px, 4%);
    padding-top: 117px;
`;

const LeftRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33.25%;
    min-width: 337.5px;
    border: 1px solid red;
`;

const MiddleRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33.25%;
    min-width: 337.5px;
    padding: 0 15px;
`;

const RightRoomContainer = styled.div`
    display: flex;
    width: 36.5%;
    min-width: 365px;
    height: 720px;
    min-height: 640px;
`;

const Cont = styled.div`
    width: 40%;
    height: auto;
    padding: 20px;
    border: 2px solid lightseagreen;
`;

const CamBox = styled.video`
    width: 40%;
    height: auto;
    padding: 20px;
    border: 2px solid lightyellow;
`;

function TestPeer({ peerCamRef }) {
    return <CamBox ref={peerCamRef} autoPlay playsInline />;
}

export default function PublicRoom(props) {
    const socket = useContext(SocketContext);
    const roomNo = props.match.params.roomNo;

    const userCamRef = useRef(null);
    const camAcceptedRef = useRef(false);
    const [camAccepted, setCamAccepted] = useState(false);

    const peersRef = useRef(new Array(4).fill(null));

    const streamsRef = useRef(new Array(4).fill(null));
    const peer0CamRef = useRef(null);
    const peer1CamRef = useRef(null);
    const peer2CamRef = useRef(null);
    const peer3CamRef = useRef(null);

    const peersOnlineRef = useRef(new Array(4).fill(false));
    const [peer0Online, setPeer0Online] = useState(peersOnlineRef.current[0]);
    const [peer1Online, setPeer1Online] = useState(peersOnlineRef.current[1]);
    const [peer2Online, setPeer2Online] = useState(peersOnlineRef.current[2]);
    const [peer3Online, setPeer3Online] = useState(peersOnlineRef.current[3]);

    // TODO
    // 접근 거부시 다시 물어볼 수 있는 장치 필요
    useEffect(() => {
        socket.on("rejected", (message) => {
            toast.error(message);
        });

        socket.on("accepted", (allPeerId) => {
            allPeerId.forEach((peerId, index) => {
                const peer = createPeer(
                    index,
                    peerId,
                    socket.id,
                    userCamRef.current.srcObject
                );
                peersRef.current[index] = peer;
            });
        });

        socket.on("cam requested", (payload) => {
            const peerIndex = findVacancy();
            console.log(`새로운 ${peerIndex}번 참여자에게 캠 요청 수신`);
            const peer = addPeer(
                peerIndex,
                payload.callerId,
                payload.signal,
                userCamRef.current.srcObject,
                payload.index
            );
            peersRef.current[peerIndex] = peer;
        });

        socket.on("cam request accepted", (payload) => {
            console.log(`${payload.index}번 참여자가 캠 요청을 수락`);
            peersRef.current[payload.index].signal(payload.signal);
        });

        socket.on("peer quit", (payload) => {
            handlePeerQuit(payload.quitPeerId);
        });

        // 방 나가는 경우 socket on 전부 off
        // (안 하면 재입장시 기능 중복됨)
        return function quitRoom() {
            socket.off("rejected");
            socket.off("accepted");
            socket.off("cam requested");
            socket.off("cam request accepted");
            socket.off("peer quit");

            socket.emit("quit");
            if (userCamRef.current.srcObject) {
                const tracks = userCamRef.current.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }
            userCamRef.current = null;
        };
    }, []);

    function getUserCam() {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                setCamAccepted(true);
                userCamRef.current.srcObject = stream;
            })
            .catch(() => {});
    }

    function enterRoom() {
        socket.emit("enter", roomNo);
    }

    function quitRoom() {
        socket.emit("quit");
    }

    function findVacancy() {
        const index = peersOnlineRef.current.findIndex((online) => {
            return !online;
        });
        return index;
    }

    function createPeer(index, peerId, callerId, stream) {
        // updatePeerOnline(index);
        setEachPeerOnline(index);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            console.log(`${index}번 참여자에게 캠 요청`);
            socket.emit("request peer cam", {
                index,
                peerId,
                callerId,
                signal,
            });
        });

        peer.on("stream", (stream) => {
            console.log(`${index}번 참여자로부터 stream 수신 완료`);
            streamsRef.current[index] = stream;
            assignStream(index, stream);
            // refreshStream();
        });

        return peer;
    }

    function addPeer(peerIndex, callerId, callerSignal, stream, myIndex) {
        setEachPeerOnline(peerIndex);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("accept peer cam request", {
                callerId,
                index: myIndex,
                signal,
            });
        });

        peer.on("stream", (stream) => {
            console.log(`${peerIndex}번 참여자로부터 stream 수신 완료`);
            streamsRef.current[peerIndex] = stream;
            assignStream(peerIndex, stream);
            // refreshStream();
        });

        peer.signal(callerSignal);

        return peer;
    }

    function handlePeerQuit() {}

    function handlePeerQuitWhileRequest() {}

    function setEachPeerOnline(index) {
        peersOnlineRef.current[index] = true;
        switch (index) {
            case 0:
                setPeer0Online(true);
                break;
            case 1:
                setPeer1Online(true);
                break;
            case 2:
                setPeer2Online(true);
                break;
            case 3:
                setPeer3Online(true);
                break;
            default:
        }
    }

    function assignStream(index, stream) {
        switch (index) {
            case 0:
                if (peer0CamRef.current) {
                    peer0CamRef.current.srcObject = stream;
                }
                break;
            case 1:
                if (peer1CamRef.current) {
                    peer1CamRef.current.srcObject = stream;
                }
                break;
            case 2:
                if (peer2CamRef.current) {
                    peer2CamRef.current.srcObject = stream;
                }
                break;
            case 3:
                if (peer3CamRef.current) {
                    peer3CamRef.current.srcObject = stream;
                }
                break;
            default:
        }
    }

    function refreshStream() {
        if (peer0CamRef.current) {
            peer0CamRef.current.srcObject = streamsRef.current[0];
        }
        if (peer1CamRef.current) {
            peer1CamRef.current.srcObject = streamsRef.current[1];
        }
        if (peer2CamRef.current) {
            peer2CamRef.current.srcObject = streamsRef.current[2];
        }
        if (peer3CamRef.current) {
            peer3CamRef.current.srcObject = streamsRef.current[3];
        }
    }

    return (
        <PublicRoomContainer>
            <LeftRoomContainer>
                {/* {peersOnline.map((online, index) =>
                    !online ? (
                        <Cont key={`${index}th-peer`}>
                            {`${index}번 참여자는 현재 오프라인 상태입니다`}
                        </Cont>
                    ) : (
                        <TestPeer
                            key={`${index}th-peer`}
                            index={index}
                            stream={streams[index]}
                        />
                    )
                )} */}
                {!peer0Online ? (
                    <Cont>{`0번 참여자는 현재 오프라인 상태입니다`}</Cont>
                ) : (
                    <TestPeer key={`0th-peer`} peerCamRef={peer0CamRef} />
                )}
                {!peer1Online ? (
                    <Cont>{`1번 참여자는 현재 오프라인 상태입니다`}</Cont>
                ) : (
                    <TestPeer key={`1th-peer`} peerCamRef={peer1CamRef} />
                )}
                {!peer2Online ? (
                    <Cont>{`2번 참여자는 현재 오프라인 상태입니다`}</Cont>
                ) : (
                    <TestPeer key={`2th-peer`} peerCamRef={peer2CamRef} />
                )}
                {!peer3Online ? (
                    <Cont>{`3번 참여자는 현재 오프라인 상태입니다`}</Cont>
                ) : (
                    <TestPeer key={`3th-peer`} peerCamRef={peer3CamRef} />
                )}
            </LeftRoomContainer>
            <MiddleRoomContainer>
                <UserSpace
                    roomNo={roomNo}
                    getUserCam={getUserCam}
                    userCamRef={userCamRef}
                    camAccepted={camAccepted}
                    enterRoom={enterRoom}
                    quitRoom={quitRoom}
                />
            </MiddleRoomContainer>
            <RightRoomContainer>
                <Calendar />
            </RightRoomContainer>
        </PublicRoomContainer>
    );
}
