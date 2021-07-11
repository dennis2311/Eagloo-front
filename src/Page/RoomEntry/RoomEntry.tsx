import { Form, Button, Select, Space, Typography, message } from "antd";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_ENDPOINT } from "../../constants";
import { useAppStore } from "../../stores";
import { toastErrorMessage } from "../../Util/ToastMessages";

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
                    body: JSON.stringify({
                        no: positionNo,
                        socketId: "",
                        userName: "",
                    }),
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
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
                    toastErrorMessage("이미 존재하는 자리입니다.");
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
            <input
                type="number"
                value={roomNo}
                onChange={(e) => {
                    setRoomNo(Number(e.target.value));
                }}
                placeholder="방 번호"
            />
            <input
                type="number"
                value={positionNo}
                onChange={(e) => {
                    setPositionNo(Number(e.target.value));
                }}
                placeholder="자리 번호"
            />
            <button
                onClick={() => {
                    onFinish({ roomNo, positionNo });
                }}
            >
                방 입장하기
            </button>
        </Container>
    );
};

interface entryInput {
    roomNo: number;
    positionNo: number;
}

const Container = styled.div`
    background-color: #bebebe;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
`;
