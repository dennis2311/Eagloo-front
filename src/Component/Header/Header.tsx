import * as React from "react";
import styled, { keyframes } from "styled-components";
import { MainHeader } from "./MainHeader";
import { SubHeader } from "./SubHeader";

const HeaderShow = keyframes`
    from{
        transform : translateY(-88px);
    }
    to{
        transform : translateY(0);
    }
`;

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 1000;
    animation: ${HeaderShow} 0.5s ease-out;
`;

type HeaderProps = {
    setIsLoggedIn: boolean;
    setFeedbackOpen: VoidFunction;
};

export function Header({ setIsLoggedIn, setFeedbackOpen }: HeaderProps) {
    return (
        <HeaderContainer>
            <MainHeader setIsLoggedIn={setIsLoggedIn} />
            <SubHeader setFeedbackOpen={setFeedbackOpen} />
        </HeaderContainer>
    );
}
