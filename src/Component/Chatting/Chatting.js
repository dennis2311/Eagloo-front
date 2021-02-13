import React, { useState } from "react";
import styled from "styled-components";
import ChattingBody from "./ChattingBody";
import ChattingFoot from "./ChattingFoot";

const ChattingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 160px;
    right: 0;
    width: 540px;
    height: max(700px, 78vh);
    background-color: #e6f1ff;
    padding: 15px;
    border-radius: 20px;
    transform: translate(
        ${(props) => {
            return props.chattingOpen ? "0" : "540px";
        }}
    );
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export default function Chatting({ socket, chattingOpen }) {
    const [messages, setMessages] = useState([]);

    socket.on("new message", (message) => {
        setMessages([...messages, message]);
    });

    return (
        <ChattingContainer chattingOpen={chattingOpen}>
            <ChattingBody messages={messages} />
            <ChattingFoot
                socket={socket}
                messages={messages}
                setMessages={setMessages}
            />
        </ChattingContainer>
    );
}
