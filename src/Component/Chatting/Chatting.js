import React, { useState } from "react";
import styled from "styled-components";
import ChattingBody from "./ChattingBody";
import ChattingFoot from "./ChattingFoot";

const ChattingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 80vh;
    padding: 20px;
    position: fixed;
    top: 90px;
    right: 0;
    transform: translate(
        ${(props) => {
            return props.chattingOpen ? "0" : "400px";
        }}
    );
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: whitesmoke;
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
