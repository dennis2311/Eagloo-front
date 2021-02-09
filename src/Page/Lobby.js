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
    justify-content: space-between;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    padding: 30px;
    animation-name: ${slideUp};
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
`;

const RoomsContainer = styled.div`
    padding: 30px;
    width: 50%;
    border: 5px aqua solid;
`;

const SchedulerContainer = styled.div`
    padding: 30px;
    width: 50%;
    border: 5px greenyellow solid;
`;

export default function Lobby() {
    return (
        <LobbyContainer>
            <RoomsContainer>
                <p>
                    <span>
                        자신이 속한 대학, 혹은 듣고 있는 강의가 열린 대학으로
                        들어가 공부하세요!
                    </span>
                </p>
                <Link to={`/public/business`}>경영대학</Link>
                <Link to={`/public/engineer`}>공학대학</Link>
                <Link to={`/public/underwood`}>국제대학</Link>
                <Link to={`/public/socsci`}>사회과학대학</Link>
            </RoomsContainer>
            <SchedulerContainer>
                <Scheduler />
            </SchedulerContainer>
        </LobbyContainer>
    );
}
