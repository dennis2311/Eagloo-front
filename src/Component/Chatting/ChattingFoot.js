import React, { useState } from "react";
import styled from "styled-components";

const ChattingFootContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

const ChattingInput = styled.input`
    width: 85%;
    height: 24px;
    padding: 0 10px;
    font-size: 17px;
    font-family: "JejuGothic";
    border: none;
    :focus {
        outline: none;
    }
`;

export default function ChattingFoot({ socket, messages, setMessages }) {
    const email = window.localStorage.getItem("email");
    const [chattingInput, setChattingInput] = useState("");

    return (
        <ChattingFootContainer>
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
        </ChattingFootContainer>
    );
}
