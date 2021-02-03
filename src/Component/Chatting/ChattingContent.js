import React from "react";
import styled from "styled-components";

const MessageRow = styled.div`
    display: flex;
    float: left;
    height: auto;
    padding: 20px;
    background-color: #e1c5c0;
`;

export default function ChattingContent({ message }) {
    return <MessageRow>{message}</MessageRow>;
}
