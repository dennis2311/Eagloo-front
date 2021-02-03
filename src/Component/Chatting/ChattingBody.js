import React from "react";
import styled from "styled-components";
import ChattingContent from "./ChattingContent";

const ChattingBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 2px solid red;
`;

export default function ChattingBody({ messages }) {
    return (
        <ChattingBodyContainer>
            {messages.map((message) => (
                <ChattingContent message={message} />
            ))}
        </ChattingBodyContainer>
    );
}
