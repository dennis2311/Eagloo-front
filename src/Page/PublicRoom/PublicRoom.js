import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../Service/Socket";
import Peer from "simple-peer";
import SelfCam from "./SelfCam";
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
    background-color: ${(props) => props.theme.backgroundWhite};
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
    border: 1px solid red;
`;

const RightRoomContainer = styled.div`
    display: flex;
    width: 36.5%;
    min-width: 365px;
    height: 720px;
    min-height: 640px;
`;

const CamBox = styled.video`
    width: 40%;
    height: auto;
`;

function PeerCam(props) {
    const peerCamRef = useRef();

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            peerCamRef.current.srcObject = stream;
        });
    }, []);

    return <CamBox ref={peerCamRef} autoPlay playsInline />;
}

export default function PublicRoom(props) {
    const socket = useContext(SocketContext);
    const roomNo = props.match.params.roomNo;
    const selfCamRef = useRef(null);
    const [peers, setPeers] = useState([]);
    const peersRef = useRef([]);
    const [camAccepted, setCamAccepted] = useState(false);

    function enterRoom() {
        socket.emit("enter", roomNo);
    }

    function createPeer(callerId, peerId, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("request peer cam", {
                signal,
                callerId,
                peerId,
            });
        });

        return peer;
    }

    function addPeer(callerSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("accept peer cam request", {
                signal,
                callerId,
            });
        });

        peer.signal(callerSignal);

        return peer;
    }

    // TODO
    // 접근 거부시 다시 물어볼 수 있는 장치 필요
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                selfCamRef.current.srcObject = stream;
                setCamAccepted(true);
            })
            .catch(() => {});

        socket.on("rejected", (message) => {
            toast.error(message);
        });

        socket.on("accepted", (allPeerId) => {
            toast.success(
                `방 입장에 성공하였습니다. 현재 인원 : ${allPeerId.length + 1}`
            );
            const peers = [];
            allPeerId.forEach((peerId) => {
                const peer = createPeer(
                    socket.id,
                    peerId,
                    selfCamRef.current.srcObject
                );
                peersRef.current.push({
                    peer,
                    peerId,
                });
                peers.push(peer);
            });
            setPeers(peers);
        });

        socket.on("cam requested", (payload) => {
            const peer = addPeer(
                payload.signal,
                payload.callerId,
                selfCamRef.current.srcObject
            );
            peersRef.current.push({ peer, peerId: payload.callerId });
            setPeers([...peers, peer]);
        });

        socket.on("cam request accepted", (payload) => {
            const peerObject = peersRef.current.find(
                (peersRefEach) => peersRefEach.peerId === payload.id
            );
            peerObject.peer.signal(payload.signal);
        });

        socket.on("peer quit");

        return function quitRoom() {
            socket.off("rejected");
            socket.off("accepted");
            socket.off("cam requested");
            socket.off("cam request accepted");
            socket.off("peer quit");

            socket.emit("quit");
            if (selfCamRef.current.srcObject) {
                const tracks = selfCamRef.current.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }
            selfCamRef.current = null;
        };
    }, []);

    return (
        <PublicRoomContainer>
            <LeftRoomContainer>
                {peers.map((peer, index) => {
                    return (
                        <>
                            <h3>{`${index}번 참여자`}</h3>
                            <PeerCam key={index} peer={peer} />
                        </>
                    );
                })}
            </LeftRoomContainer>
            <MiddleRoomContainer>
                <SelfCam
                    selfCamRef={selfCamRef}
                    camAccepted={camAccepted}
                    enterRoom={enterRoom}
                />
            </MiddleRoomContainer>
            <RightRoomContainer>
                <Calendar />
            </RightRoomContainer>
        </PublicRoomContainer>
    );
}
