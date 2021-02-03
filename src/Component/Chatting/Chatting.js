import React, { useState } from "react";
import styled from "styled-components";
import ChattingBody from "./ChattingBody";
import ChattingFoot from "./ChattingFoot";

const ChattingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 80vh;
    padding: 20px;
    background-color: whitesmoke;
`;

export default function Chatting({ socket }) {
    const [messages, setMessages] = useState([]);

    socket.on("new message", (message) => {
        setMessages([...messages, message]);
    });

    return (
        <ChattingContainer>
            <ChattingBody messages={messages} />
            <ChattingFoot
                socket={socket}
                messages={messages}
                setMessages={setMessages}
            />
        </ChattingContainer>
    );
}
