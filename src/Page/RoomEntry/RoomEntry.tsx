import { Form, Button, Select, Space, Typography, message } from "antd";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_ENDPOINT } from "../../constants";
import { useAppStore } from "../../stores";

export const RoomEntry = () => {
    const [roomNo, setRoomNo] = useState(0);
    const [positionNo, setPositionNo] = useState(0);
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
            <button
                onClick={() => {
                    onFinish({ roomNo: 1, positionNo: 2 });
                }}
            >
                어쨌든 시도
            </button>
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

const Container = styled.div`
    background-color: #bebebe;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
`;

const RoomSelector = styled.div``;
const PositionSelector = styled.button``;
