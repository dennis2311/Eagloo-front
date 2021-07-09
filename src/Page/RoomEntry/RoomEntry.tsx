import { Form, Button, Select, Space, Typography, message } from "antd";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserRouterPageContainer } from "../../Component/StyledComponent/div";
import { API_ENDPOINT } from "../../constants";
import { useAppStore } from "../../stores";

export const RoomEntry = () => {
    const numberOfRooms = Array(6).fill(null);
    const numberOfPositions = Array(12).fill(null);
    const [roomNo, setRoomNo] = useState<number>(1);
    const [positionNo, setPositionNo] = useState<number>(1);
    const [rooms, setRooms] = useState([]);
    const { push } = useHistory();
    const appStore = useAppStore();

    // 엔트리에 진입하면 가장 먼저 방 현황을 가져옴
    const { data } = useQuery(
        "rooms",
        () =>
            fetch(API_ENDPOINT + `/api/room`, {
                method: "GET",
                // headers: {
                //   "Content-Type": "application/json",
                // },
            }),
        {
            onSuccess: async (res) => {
                // data = Room[]
                // Room = { no, details[] }
                // details = { no, socketId, userName }
                const data = await res.json();
                setRooms(data);
            },
            onError: (err) => {
                console.log("useQuery onError: ", err);
            },
        }
    );

    // 방 입장 시도를 위해 간접적으로 호출되는 함수 (onFinish에서 mutate 호출)
    const { mutate } = useMutation(
        "connectRoom",
        (params: { roomNo: number; positionNo: number }) =>
            fetch(
                API_ENDPOINT +
                    `/api/room/${params.roomNo}/position/${params.positionNo}`,
                {
                    method: "POST",
                    body: JSON.stringify({ userId: "1", userName: "kkh" }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ),
        {
            onSuccess: async (e) => {
                console.log("useMutation onSuccess: ", e);
                const res = await e.json();
                if (res.ok) {
                    appStore.onChangeIsEntered(true);
                    push(`/room/${res.roomNo}/position/${res.positionNo}`);
                } else {
                    message.error("이미 존재하는 자리입니다.");
                }
            },
            onError: (err) => {
                console.log("useMutation onError: ", err);
            },
        }
    );

    const onFinish = (ei: entryInput) => {
        mutate({ roomNo: ei.roomNo, positionNo: ei.positionNo });
    };

    return (
        <Container>
            <Row>
                {numberOfRooms.map((_, index) => {
                    return (
                        <label>
                            <input
                                type="radio"
                                name="room"
                                key={`room-${index + 1}`}
                                onClick={() => {
                                    setRoomNo(index + 1);
                                }}
                            />
                            {`${index + 1}번 방`}
                        </label>
                    );
                })}
            </Row>
            <Row>
                {numberOfPositions.map((_, index) => {
                    return (
                        <label>
                            <input
                                type="radio"
                                name="position"
                                key={`position-${index + 1}`}
                                onClick={() => {
                                    setPositionNo(index + 1);
                                }}
                            />
                            {`${index + 1}번 자리`}
                        </label>
                    );
                })}
            </Row>
            <Row>
                <button
                    onClick={() => {
                        onFinish({ roomNo, positionNo });
                    }}
                >
                    {`${roomNo}번 방 ${positionNo}번 자리로 입장하기`}
                </button>
            </Row>
        </Container>
    );
};

interface entryInput {
    roomNo: number;
    positionNo: number;
}

interface roomDetail {
    no: number;
    socketId: string;
    userName: string;
}

const Container = styled(UserRouterPageContainer)`
    background-color: #bebebe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
`;

const Row = styled.div`
    display: flex;
    width: 80%;
    min-height: 120px;
    margin-bottom: 15px;
    border: 2px solid black;
`;

const RoomButton = styled.div``;
const PositionButton = styled.button``;
