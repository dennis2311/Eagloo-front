import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import * as Peer from "simple-peer";
// import Peer from "simple-peer"
import styled from "styled-components";
import { API_ENDPOINT } from "../../constants";
import { message, PageHeader, Space, Tag } from "antd";
import { useAppStore } from "../../stores";

enum Channel {
    JOIN = "JOIN",
    DISCONNECT = "DISCONNECT",
    GET_CURRENT_ROOM = "GET_CURRENT_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
    NEW_USER = "NEW_USER",
    RECEIVING_SIGNAL = "RECEIVING_SIGNAL",
    SENDING_SIGNAL = "SENDING_SIGNAL",
    RETURNING_SIGNAL = "RETURNING_SIGNAL",
}

export const PublicRoom: React.FC<RouteComponentProps> = (props) => {
    const appStore = useAppStore();
    const { push } = useHistory();
    const [peers, setPeers] = useState([]);
    const peersRef = useRef<Peer.Instance[]>([]);
    const socketRef = useRef<typeof Socket>();
    const userVideo = useRef<HTMLVideoElement | undefined>(undefined);
    const roomId = Number(props.match.params?.roomId || 0);
    const positionId = Number(props.match.params?.positionId || 0);

    if (!appStore.isEntered) {
        /** 단순히 URL로 접근하는 경우 */
        message.warn("올바른 접근방식이 아닙니다.");
        push("/");
    }

    if (roomId == 0 || positionId == 0) {
        //TODO
        message.warn("알 수 없는 오류");
        push("/");
    }

    useEffect(() => {
        socketRef.current = io(API_ENDPOINT);
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: false,
            })
            .then((stream) => {
                userVideo.current?.srcObject = stream;
                // socketRef.current?.on("disconnect", (d) => {
                //     socketRef.current?.off();
                //     socketRef.current?.disconnect();
                //     socketRef.current?.close();
                // });

                /** 1. 방참가 */
                socketRef.current?.emit(Channel.JOIN, {
                    roomNo: roomId,
                    positionNo: positionId,
                });

                /** 2. 참여한 방의 기존 사용자들의 정보를 가져옴. */
                socketRef.current?.on(
                    Channel.GET_CURRENT_ROOM,
                    (roomDetails) => {
                        if (roomDetails.length) {
                            const peers = [];
                            if (!!roomDetails?.length) {
                                roomDetails?.forEach((roomDetail) => {
                                    // createPeer 함수 내부에서 각 peer 에게 SENDING SIGNAL
                                    const peer = createPeer(
                                        roomDetail.socketId,
                                        socketRef.current?.id,
                                        stream,
                                        positionId
                                    );
                                    peersRef.current.push({
                                        peer,
                                        socketId: roomDetail.socketId,
                                        no: roomDetail.no,
                                    });
                                    peers.push({
                                        peer: peer,
                                        no: roomDetail.no,
                                    });
                                });
                            }
                            setPeers(peers);
                        }
                    }
                );

                /** 4. 새 유저가 접속한 경우. */
                socketRef.current?.on(Channel.NEW_USER, (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.socketId === payload.callerId
                    );
                    if (!item) {
                        const peer = addPeer(
                            payload.signal,
                            payload.callerId,
                            stream
                        );
                        peersRef.current.push({
                            peer,
                            socketId: payload.callerId,
                        });
                        setPeers((peers) => [
                            ...peers,
                            { peer: peer, no: payload.no },
                        ]);
                    }
                });
                console.log("stream: ", stream.id);

                /** 5. 기존 참여자로부터 signal에 대한 응답 수신. */
                socketRef.current?.on(Channel.RECEIVING_SIGNAL, (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.socketId === payload.id
                    );
                    // 최종 연결
                    item?.peer.signal(payload.signal);
                });

                /** 같은 방 다른 참여자의 연결이 끊긴경우 */
                socketRef.current?.on(
                    Channel.DISCONNECT,
                    (positionNo: number) => {
                        document.getElementById(`room-${positionNo}`)?.remove();
                    }
                );
            })
            /** 캠 요청 거절한 경우 */
            .catch((err) => {
                push("/entry");
            });

        return () => {
            socketRef.current?.disconnect();
            socketRef.current?.close();
        };
    }, []);

    // 자신이 방에 새로 입장할 때 호출
    function createPeer(
        userToSignal: string,
        callerId: number,
        stream: MediaStream,
        no: number
    ) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal) => {
            /** 3. 기존 참여자들에게 signal 발신. */
            socketRef.current?.emit(Channel.SENDING_SIGNAL, {
                userToSignal,
                callerId,
                signal,
                no,
            });
        });
        return peer;
    }

    // 새로운 참여자가 입장했을 때 호출
    function addPeer(
        incomingSignal: string,
        callerId: number,
        stream: MediaStream
    ) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        // 새로운 참여자에게 자신의 signal 발신
        peer.on("signal", (signal) => {
            socketRef.current?.emit(Channel.RETURNING_SIGNAL, {
                signal,
                callerId,
            });
        });

        peer.signal(incomingSignal);
        return peer;
    }

    // useEffect(() => {
    //     return () => {
    //         socketRef.current?.close();
    //     };
    // }, []);

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    push("/");
                    appStore.onChangeIsEntered(false);
                }}
                title="뒤로가기"
                subTitle={`${roomId}번 클래스`}
            />
            <Container>
                <Space
                    direction="vertical"
                    style={{ width: "100%", alignItems: "center" }}
                >
                    <Tag color="blue">{positionId}번 자리</Tag>
                    <StyledVideo ref={userVideo} autoPlay playsInline />
                </Space>
                <Space
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    wrap
                >
                    {peers.map((peer, index) => {
                        return (
                            <Video
                                key={peer.no}
                                no={peer.no}
                                peer={peer.peer}
                            />
                        );
                    })}
                </Space>
                <hr />
            </Container>
        </>
    );
};

const Video = (props) => {
    const ref = useRef<HTMLVideoElement>();

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
        props.peer.on("close", () => {
            document.getElementById(`container-${props.no}`)?.remove();
        });
        return () => {
            document.getElementById(`container-${props.no}`)?.remove();
            // ref.current?.remove();
        };
    }, []);

    return (
        <VideoContainer id={`room-${props.no}`}>
            <Tag color="orange">{props.no}번 자리</Tag>
            {/* <StyledVideo playsInline autoPlay ref={ref} muted /> */}
            <StyledVideo playsInline autoPlay ref={ref} />
        </VideoContainer>
    );
};

const MyVideo: React.FC<{ ref: any }> = ({ ref }) => {
    return <video ref={ref} autoPlay playsInline />;
};

const Container = styled.div`
    display: flex;
    min-height: 80vh;
    width: 100%;
    margin: 0 auto;
    flex-flow: column;
    justify-content: center;
`;
const VideoContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;
const StyledVideo = styled.video`
    max-height: 400px;
    box-shadow: 0 2px 14px rgb(0 0 0 / 42%);
    border-radius: 6px;
`;
