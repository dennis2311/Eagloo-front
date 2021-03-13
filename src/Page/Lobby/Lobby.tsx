import React, { useEffect } from "react";
import axios from "axios";
import { server } from "../../Util/server";
import styled, { keyframes } from "styled-components";
import { UserRouterPageContainer } from "../../Component/StyledComponent/div";
import YonseiLink from "../../Component/Link/YonseiLink";
import ForumLink from "../../Component/Link/ForumLink";
import MainBanner from "../../Component/Banner/MainBanner";
import RoomLink from "../../Component/Link/RoomLink";
import Calendar from "../../Component/Calendar/Calendar";

// TODO : 컴포넌트 default -> 상수화 수정.

const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0
  }
  to {
    transform: translateY(0px);
    opacity: 1
  }
`;

const LobbyContainer = styled(UserRouterPageContainer)`
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
    useEffect(() => {
        async function booXios() {
            const token = window.localStorage.getItem("token");
            console.log(`send http request with header token ${token}`);
            axios
                .get(`${server}/api/user/boo`, {
                    // headers: { token },
                })
                .then(function ({ data }) {
                    console.log("boo 요청 성공");
                    console.log(data);
                })
                .catch(function (error) {
                    console.log("boo 요청 실패 :");
                    console.dir(error.response);
                });
        }

        booXios();
    }, []);

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
