import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserRouterPageContainer } from "../../Component/StyledComponent/div";
import { SocketContext } from "../../Service/Socket";
import Peer from "simple-peer";
import PeerSpace from "./PeerSpace";
import UserSpace from "./UserSpace";
import Calendar from "../../Component/Calendar/Calendar";
import { toast } from "react-toastify";

const PublicRoomContainer = styled(UserRouterPageContainer)``;

const LeftRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 33.25%;
    min-width: 337.5px;
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

// TODO
// 새로고침 했을 때 Ref 들이 그대로 남아있어서 오류 발생
// (반드시 고쳐야 함)
export default function PublicRoom(props) {
    const socket = useContext(SocketContext);
    const email = window.localStorage.getItem("email");
    const roomNo = props.match.params.roomNo;
    const [roomEntered, setRoomEntered] = useState(false);

    const userCamRef = useRef(null);
    const [camAccepted, setCamAccepted] = useState(false);

    const peersRef = useRef(new Array(4).fill(null));
    const peerToIndexRef = useRef({});

    const streamsRef = useRef(new Array(4).fill(null));
    const peer0CamRef = useRef(null);
    const peer1CamRef = useRef(null);
    const peer2CamRef = useRef(null);
    const peer3CamRef = useRef(null);

    const peersOnlineRef = useRef(new Array(4).fill(false));
    const [peer0Online, setPeer0Online] = useState(false);
    const [peer1Online, setPeer1Online] = useState(false);
    const [peer2Online, setPeer2Online] = useState(false);
    const [peer3Online, setPeer3Online] = useState(false);

    // TODO
    // 접근 거부시 다시 물어볼 수 있는 장치 필요
    useEffect(() => {
        socket.on("rejected", (message) => {
            toast.error(message);
        });

        socket.on("accepted", (allPeerId) => {
            setRoomEntered(true);
            allPeerId.forEach((peerId, index) => {
                if (peerId !== socket.id) {
                    const peer = createPeer(
                        index,
                        peerId,
                        socket.id,
                        userCamRef.current.srcObject
                    );
                    peersRef.current[index] = peer;
                    peerToIndexRef.current[peerId] = index;
                }
            });
        });

        socket.on("cam requested", (payload) => {
            const peerIndex = findVacancy();
            const peer = addPeer(
                peerIndex,
                payload.callerId,
                payload.signal,
                userCamRef.current.srcObject,
                payload.index
            );
            peersRef.current[peerIndex] = peer;
            peerToIndexRef.current[payload.callerId] = peerIndex;
        });

        socket.on("cam request accepted", (payload) => {
            // TODO
            // stream 받아온 후 한번 더 확인
            // socket.emit("peer still alive")
            peersRef.current[payload.index].signal(payload.signal);
        });

        socket.on("peer quit", (quitPeerId) => {
            handlePeerQuit(quitPeerId);
        });

        // socket.on("peer dead")

        // unmount되는 경우 socket on 전부 off
        // (안 하면 재입장시 기능 중복됨)
        return () => {
            socket.off("rejected");
            socket.off("accepted");
            socket.off("cam requested");
            socket.off("cam request accepted");
            socket.off("peer quit");
            // socket.off("peer dead")

            socket.emit("quit", email);
            if (userCamRef.current) {
                const tracks = userCamRef.current.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }
            userCamRef.current = null;

            peersRef.current.forEach((peer) => {
                if (peer) {
                    peer.destroy();
                }
            });
            peersRef.current = [null, null, null, null];
            peerToIndexRef.current = {};
            streamsRef.current = [null, null, null, null];
            peer0CamRef.current = null;
            peer1CamRef.current = null;
            peer2CamRef.current = null;
            peer3CamRef.current = null;
            peersOnlineRef.current = [false, false, false, false];
            setPeer0Online(false);
            setPeer1Online(false);
            setPeer2Online(false);
            setPeer3Online(false);
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
        socket.emit("enter", { roomNo, email });
    }

    function quitRoom() {
        setRoomEntered(false);
        socket.emit("quit", email);
        peersRef.current.forEach((peer) => {
            if (peer) {
                peer.destroy();
            }
        });
        peersRef.current = [null, null, null, null];
        peerToIndexRef.current = {};
        streamsRef.current = [null, null, null, null];
        peer0CamRef.current = null;
        peer1CamRef.current = null;
        peer2CamRef.current = null;
        peer3CamRef.current = null;
        peersOnlineRef.current = [false, false, false, false];
        setPeer0Online(false);
        setPeer1Online(false);
        setPeer2Online(false);
        setPeer3Online(false);
    }

    function findVacancy() {
        const index = peersOnlineRef.current.findIndex((online) => {
            return !online;
        });
        return index;
    }

    function createPeer(index, peerId, callerId, stream) {
        setEachPeerOnline(index);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("request peer cam", {
                index,
                peerId,
                callerId,
                signal,
            });
        });

        peer.on("stream", (stream) => {
            streamsRef.current[index] = stream;
            assignStream(index, stream);
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
        });

        peer.signal(callerSignal);

        return peer;
    }

    function handlePeerQuit(quitPeerId) {
        const quitPeerIndex = peerToIndexRef.current[quitPeerId];
        delete peerToIndexRef.current[quitPeerId];
        if (peersRef.current[quitPeerIndex]) {
            peersRef.current[quitPeerIndex].destroy();
        }
        peersRef.current[quitPeerIndex] = null;
        setEachPeerOffline(quitPeerIndex);
        deleteStream(quitPeerIndex);
    }

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

    function setEachPeerOffline(index) {
        peersOnlineRef.current[index] = false;
        switch (index) {
            case 0:
                setPeer0Online(false);
                break;
            case 1:
                setPeer1Online(false);
                break;
            case 2:
                setPeer2Online(false);
                break;
            case 3:
                setPeer3Online(false);
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

    function deleteStream(index) {
        streamsRef.current[index] = null;
        switch (index) {
            case 0:
                if (peer0CamRef.current) {
                    peer0CamRef.current = null;
                }
                break;
            case 1:
                if (peer1CamRef.current) {
                    peer1CamRef.current = null;
                }
                break;
            case 2:
                if (peer2CamRef.current) {
                    peer2CamRef.current = null;
                }
                break;
            case 3:
                if (peer3CamRef.current) {
                    peer3CamRef.current = null;
                }
                break;
            default:
        }
    }

    return (
        <PublicRoomContainer>
            <LeftRoomContainer>
                <PeerSpace
                    key={`0thPeer`}
                    peerOnline={peer0Online}
                    peerCamRef={peer0CamRef}
                />
                <PeerSpace
                    key={`1thPeer`}
                    peerOnline={peer1Online}
                    peerCamRef={peer1CamRef}
                />
                <PeerSpace
                    key={`2thPeer`}
                    peerOnline={peer2Online}
                    peerCamRef={peer2CamRef}
                />
                <PeerSpace
                    key={`3thPeer`}
                    peerOnline={peer3Online}
                    peerCamRef={peer3CamRef}
                />
            </LeftRoomContainer>
            <MiddleRoomContainer>
                <UserSpace
                    roomNo={roomNo}
                    roomEntered={roomEntered}
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
