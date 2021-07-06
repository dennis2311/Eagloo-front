import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { UserRouterPageContainer } from "../../Component/StyledComponent/div";
import Peer from "peerjs";
// import { SocketContext } from "../../Service/Socket";
// import PeerSpaceEach from "./PeerSpaceEach";
// import UserSpace from "./UserSpace";
import Calendar from "../../Component/Calendar/Calendar";
// import { toast } from "react-toastify";
// import { Channel } from "../../constants";
// import { toastErrorMessage } from "src/Util/ToastMessages";

import UserCam from "./UserCam";
import { useAppStore } from "../../stores";
import { useHistory } from "react-router";
import { socket } from "../../Service/Socket";

const PublicRoomContainer = styled(UserRouterPageContainer)``;

const LeftRoomContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
    direction: rtl;
    width: 28%;
    min-width: 270px;
`;

const MiddleRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 38.25%;
    min-width: 380px;
    padding: 0 45px;
`;

const RightRoomContainer = styled.div`
    display: flex;
    width: 36.5%;
    min-width: 365px;
    height: 720px;
    min-height: 640px;
`;
const FixedWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.24);
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    flex-flow: column;
`;

let peer;

export default function PublicRoom() {
    const as = useAppStore((s) => s);
    const { push } = useHistory();
    console.log("as: ", as);
    if (!as.videoStreams || !as.myStream) {
        return (
            <FixedWrapper>
                올바른 접근경로가 아닙니다.
                <p style={{ marginTop: 6 }}>
                    <button onClick={() => push("/")}>홈으로 </button>
                </p>
            </FixedWrapper>
        );
    } else {
        // 소켓연동.
        // socket.on("");
        //
        if (!peer) {
            // 없는경우에 생성.
            peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            });
        }
    }

    return (
        <PublicRoomContainer>
            <LeftRoomContainer>
                {/* videoStreams는 서버측에서 결과받은걸로 적용해야합니다. */}
                {/* {videoStreams.map((videoStream, index) => {
                    return <UserCam key={index} stream={videoStream} />;
                })} */}
            </LeftRoomContainer>
            <MiddleRoomContainer>
                <UserCam stream={as.myStream} />
            </MiddleRoomContainer>
            <RightRoomContainer>
                <div>hello world</div>
                <Calendar />
            </RightRoomContainer>
        </PublicRoomContainer>
    );
}

// const userCamRef = useRef(null);
// const [camAccepted, setCamAccepted] = useState(false);

// const peersRef = useRef(new Array(4).fill(null));
// const peerToIndexRef = useRef({});

// const [peer0Stream, setPeer0Stream] = useState(null);
// const [peer1Stream, setPeer1Stream] = useState(null);
// const [peer2Stream, setPeer2Stream] = useState(null);
// const [peer3Stream, setPeer3Stream] = useState(null);

// const peersOnlineRef = useRef(new Array(4).fill(false));
// const [peer0Online, setPeer0Online] = useState(false);
// const [peer1Online, setPeer1Online] = useState(false);
// const [peer2Online, setPeer2Online] = useState(false);
// const [peer3Online, setPeer3Online] = useState(false);

// const [peer0Loading, setPeer0Loading] = useState(false);
// const [peer1Loading, setPeer1Loading] = useState(false);
// const [peer2Loading, setPeer2Loading] = useState(false);
// const [peer3Loading, setPeer3Loading] = useState(false);

// // TODO
// // 접근 거부시 다시 물어볼 수 있는 장치 필요
// socket.on(
//     Channel.입장거부,
//     (message) => {
//         useEffect(() => {
//             console.log("message: ", message);
//             toast.error(message);
//         });
//         socket.on(Channel.입장수락, (allPeerId) => {
//             setRoomEntered(true);
//             allPeerId.forEach((peerId, index) => {
//                 if (peerId !== socket.id) {
//                     const peer = createPeer(
//                         index,
//                         peerId,
//                         socket.id,
//                         userCamRef.current.srcObject
//                     );
//                     peersRef.current[index] = peer;
//                     peerToIndexRef.current[peerId] = index;
//                 }
//             });
//         });

//         socket.on(Channel.캠요청됨, (payload) => {
//             const peerIndex = findVacancy();
//             const peer = addPeer(
//                 peerIndex,
//                 payload.callerId,
//                 payload.signal,
//                 userCamRef.current.srcObject,
//                 payload.index
//             );
//             peersRef.current[peerIndex] = peer;
//             peerToIndexRef.current[payload.callerId] = peerIndex;
//         });

//         socket.on(Channel.캠요청수락됨, (payload) => {
//             // TODO
//             // stream 받아온 후 한번 더 확인
//             // socket.emit("peer still alive")
//             peersRef.current[payload.index].signal(payload.signal);
//         });

//         socket.on(Channel.참여자퇴실, (quitPeerId) => {
//             handlePeerQuit(quitPeerId);
//         });

//         // socket.on("peer dead")

//         // unmount되는 경우 socket on 전부 off
//         // (안 하면 재입장시 기능 중복됨)
//         return () => {
//             socket.off(Channel.입장거부);
//             socket.off(Channel.입장수락);
//             socket.off(Channel.캠요청됨);
//             socket.off(Channel.캠요청수락됨);
//             socket.off(Channel.참여자퇴실);
//             // socket.off("peer dead")

//             socket.emit(Channel.퇴실, email);
//             if (userCamRef.current) {
//                 const tracks = userCamRef.current.srcObject.getTracks();
//                 tracks.forEach((track) => {
//                     track.stop();
//                 });
//             }
//             userCamRef.current = null;

//             peersRef.current.forEach((peer) => {
//                 if (peer) {
//                     peer.destroy();
//                 }
//             });
//             peersRef.current = [null, null, null, null];
//             peerToIndexRef.current = {};
//             setPeer0Stream(null);
//             setPeer1Stream(null);
//             setPeer2Stream(null);
//             setPeer3Stream(null);
//             peersOnlineRef.current = [false, false, false, false];
//             setPeer0Online(false);
//             setPeer1Online(false);
//             setPeer2Online(false);
//             setPeer3Online(false);
//         };
//     },
//     []
// );

// function getUserCam() {
//     navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//             setCamAccepted(true);
//             userCamRef.current.srcObject = stream;
//         })
//         .catch(() => {});
// }

// function enterRoom() {
//     console.log("SOCKET: ", socket);
//     socket.emit(Channel.입실시도, { roomNo, email });
// }

// function quitRoom() {
//     setRoomEntered(false);
//     socket.emit(Channel.퇴실, email);
//     peersRef.current.forEach((peer) => {
//         if (peer) {
//             peer.destroy();
//         }
//     });
//     peersRef.current = [null, null, null, null];
//     peerToIndexRef.current = {};
//     setPeer0Stream(null);
//     setPeer1Stream(null);
//     setPeer2Stream(null);
//     setPeer3Stream(null);
//     peersOnlineRef.current = [false, false, false, false];
//     setPeer0Online(false);
//     setPeer1Online(false);
//     setPeer2Online(false);
//     setPeer3Online(false);
// }

// function findVacancy() {
//     const index = peersOnlineRef.current.findIndex((online) => {
//         return !online;
//     });
//     return index;
// }

// function createPeer(index, peerId, callerId, stream) {
//     setEachPeerOnline(index);
//     setEachPeerLoading(index);
//     const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream,
//     });

//     peer.on("signal", (signal) => {
//         socket.emit(Channel.캠요청, {
//             index,
//             peerId,
//             callerId,
//             signal,
//         });
//     });

//     peer.on("stream", (stream) => {
//         setEachPeerUnloading(index);
//         assignStream(index, stream);
//     });

//     return peer;
// }

// function addPeer(peerIndex, callerId, callerSignal, stream, myIndex) {
//     setEachPeerOnline(peerIndex);
//     setEachPeerLoading(peerIndex);
//     const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream,
//     });

//     peer.on("signal", (signal) => {
//         socket.emit(Channel.캠요청수락, {
//             callerId,
//             index: myIndex,
//             signal,
//         });
//     });

//     peer.on("stream", (stream) => {
//         setEachPeerUnloading(peerIndex);
//         assignStream(peerIndex, stream);
//     });

//     peer.signal(callerSignal);

//     return peer;
// }

// function handlePeerQuit(quitPeerId) {
//     const quitPeerIndex = peerToIndexRef.current[quitPeerId];
//     delete peerToIndexRef.current[quitPeerId];
//     if (peersRef.current[quitPeerIndex]) {
//         peersRef.current[quitPeerIndex].destroy();
//     }
//     peersRef.current[quitPeerIndex] = null;
//     setEachPeerOffline(quitPeerIndex);
//     deleteStream(quitPeerIndex);
// }

// function setEachPeerOnline(index) {
//     peersOnlineRef.current[index] = true;
//     switch (index) {
//         case 0:
//             setPeer0Online(true);
//             break;
//         case 1:
//             setPeer1Online(true);
//             break;
//         case 2:
//             setPeer2Online(true);
//             break;
//         case 3:
//             setPeer3Online(true);
//             break;
//         default:
//     }
// }

// function setEachPeerOffline(index) {
//     peersOnlineRef.current[index] = false;
//     switch (index) {
//         case 0:
//             setPeer0Online(false);
//             break;
//         case 1:
//             setPeer1Online(false);
//             break;
//         case 2:
//             setPeer2Online(false);
//             break;
//         case 3:
//             setPeer3Online(false);
//             break;
//         default:
//     }
// }

// function setEachPeerLoading(index) {
//     switch (index) {
//         case 0:
//             setPeer0Loading(true);
//             break;
//         case 1:
//             setPeer1Loading(true);
//             break;
//         case 2:
//             setPeer2Loading(true);
//             break;
//         case 3:
//             setPeer3Loading(true);
//             break;
//         default:
//     }
// }

// function setEachPeerUnloading(index) {
//     switch (index) {
//         case 0:
//             setPeer0Loading(false);
//             break;
//         case 1:
//             setPeer1Loading(false);
//             break;
//         case 2:
//             setPeer2Loading(false);
//             break;
//         case 3:
//             setPeer3Loading(false);
//             break;
//         default:
//     }
// }

// function assignStream(index, stream) {
//     switch (index) {
//         case 0:
//             setPeer0Stream(stream);
//             break;
//         case 1:
//             setPeer1Stream(stream);
//             break;
//         case 2:
//             setPeer2Stream(stream);
//             break;
//         case 3:
//             setPeer3Stream(stream);
//             break;
//         default:
//     }
// }

// function deleteStream(index) {
//     switch (index) {
//         case 0:
//             setPeer0Stream(null);
//             break;
//         case 1:
//             setPeer1Stream(null);
//             break;
//         case 2:
//             setPeer2Stream(null);
//             break;
//         case 3:
//             setPeer3Stream(null);
//             break;
//         default:
//     }
// }
