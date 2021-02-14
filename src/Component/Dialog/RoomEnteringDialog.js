import React from "react";
import styled from "styled-components";

const DialogContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 720px;
    height: 540px;
    border: 3px solid gray;
    border-radius: 5%;
    background-color: #ffffff;
    transform: translateY(
        ${(props) => {
            return props.enteringRoom ? "0" : "540px";
        }}
    );
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export default function RoomEnteringDialog({ enteringRoom, setEnteringRoom }) {
    return <DialogContainer enteringRoom={enteringRoom}></DialogContainer>;
}
