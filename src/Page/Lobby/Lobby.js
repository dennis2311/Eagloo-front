import React from "react";
import styled, { keyframes } from "styled-components";
import YonseiLink from "../../Component/Link/YonseiLink";
import ForumLink from "../../Component/Link/ForumLink";
import MainBanner from "../../Component/Banner/MainBanner";
import RoomLink from "../../Component/Link/RoomLink";
import Calendar from "../../Component/Calendar/Calendar";

const slideUp = keyframes`
  from {
    transform: translateY(60px);
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
    width: 36.5%;
    min-width: 365px;
    height: 720px;
    min-height: 640px;
`;

const LeftUpperLobbyContainer = styled.div`
    margin-bottom: 50px;
`;

const LeftBottomLobbyContainer = styled.div``;

const MiddleUpperLobbyContainer = styled.div`
    height: 200px;
    margin-bottom: 50px;
`;

const MiddleBottomLobbyContainer = styled.div``;

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
                <MiddleBottomLobbyContainer>
                    <RoomLink />
                </MiddleBottomLobbyContainer>
            </MiddleLobbyContainer>
            <RightLobbyContainer>
                <Calendar />
            </RightLobbyContainer>
        </LobbyContainer>
    );
}
