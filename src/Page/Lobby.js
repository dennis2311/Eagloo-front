import React from "react";
import { Link } from "react-router-dom";
import Scheduler from "../Component/Scheduler/Scheduler";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0
  }
  to {
    transform: translateY(0px);
    opacity: 1
  }
`;

const LobbyContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    padding: 0 max(50px, 4%);
    animation: ${slideUp} 0.5s ease-out;
`;

const LeftLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    min-width: 210px;
    border: 1px solid red;
`;

const MiddleLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 41%;
    min-width: 465px;
    margin: 0 40px;
    border: 1px solid red;
`;

const RightLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 36.5%;
    min-width: 365px;
    border: 1px solid red;
`;

export default function Lobby() {
    return (
        <LobbyContainer>
            <LeftLobbyContainer></LeftLobbyContainer>
            <MiddleLobbyContainer></MiddleLobbyContainer>
            <RightLobbyContainer>
                <Scheduler />
            </RightLobbyContainer>
        </LobbyContainer>
    );
}
