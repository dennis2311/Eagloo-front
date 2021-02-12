import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import YonseiLink from "../../Component/Link/YonseiLink";
import ForumLink from "../../Component/Link/ForumLink";
import MainBanner from "../../Component/Banner/MainBanner";
import Scheduler from "../../Component/Scheduler/Scheduler";

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
    min-height: 720px;
    padding: 0 max(50px, 4%);
    padding-top: 65px;
    animation: ${slideUp} 0.5s ease-out;
`;

const LeftLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 21%;
    min-width: 210px;
`;

const MiddleLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 45.5%;
    min-width: 465px;
    margin: 0 40px;
`;

const RightLobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 36.5%;
    min-width: 365px;
    border: 1px solid red;
`;

const LeftUpperLobbyContainer = styled.div`
    margin-bottom: 50px;
`;

const LeftBottomLobbyContainer = styled.div``;

const MiddleUpperLobbyContainer = styled.div`
    height: 200px;
    margin-bottom: 50px;
`;

const MiddleBottomLobbyContainer = styled.div`
    border: 1px solid red;
`;

const RightUpperLobbyContainer = styled.div``;

const RightBottomLobbyContainer = styled.div``;

export default function Lobby() {
    return (
        <LobbyContainer>
            <LeftLobbyContainer>
                <LeftUpperLobbyContainer>
                    <YonseiLink />
                </LeftUpperLobbyContainer>
                <LeftBottomLobbyContainer>
                    <ForumLink />
                </LeftBottomLobbyContainer>
            </LeftLobbyContainer>
            <MiddleLobbyContainer>
                <MiddleUpperLobbyContainer>
                    <MainBanner />
                </MiddleUpperLobbyContainer>
                <MiddleBottomLobbyContainer></MiddleBottomLobbyContainer>
            </MiddleLobbyContainer>
            <RightLobbyContainer>
                <Scheduler />
            </RightLobbyContainer>
        </LobbyContainer>
    );
}
