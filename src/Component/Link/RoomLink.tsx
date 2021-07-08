import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const RoomLink = () => {
    return (
        <EntryLink>
            <Link to="/entry">방 입장 엔트리로 이동</Link>
        </EntryLink>
    );
};

const EntryLink = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-family: "SamlipHopang";
    border-radius: 8px;
    background-color: ${(props) => props.theme.headerGray};
`;
