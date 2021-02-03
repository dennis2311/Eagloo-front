import React, { useState } from "react";
import styled from "styled-components";

const ChattingInput = styled.input`
    border: 2px solid black;
    :focus {
        border: none;
    }
`;

export default function ChattingFoot({ socket, messages, setMessages }) {
    const email = window.localStorage.getItem("email");
    const [chattingInput, setChattingInput] = useState("");

    return (
        <ChattingInput
            value={chattingInput}
            onChange={(e) => {
                setChattingInput(e.target.value);
            }}
            onKeyPress={(e) => {
                if (e.key === "Enter" && chattingInput !== "") {
                    try {
                        socket.emit(
                            "message send",
                            `${email} : ${chattingInput}`
                        );
                        setChattingInput("");
                        setMessages([
                            ...messages,
                            `${email} : ${chattingInput}`,
                        ]);
                    } catch (err) {
                        console.log(err);
                    }
                }
            }}
        />
    );
}
