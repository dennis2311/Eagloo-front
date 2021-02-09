import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import headerIcon from "../../resource/img/header-icon.png";

const MainHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 88px;
    background-color: #1d74ff;
`;

const MainHeaderComponentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 40px;
    bottom: 27px;
`;

const MainHeaderComponent = styled.div`
    flex-direction: right;
    padding: 0 15px;
    font-size: 18px;
    font-family: "JejuGothic";
    color: #c0d1ff;
`;

const WhiteVerticalLine = styled.div`
    width: 1px;
    height: 24px;
    border-right: 2px solid #c0d1ff;
`;

export default function MainHeaer({ setIsLoggedIn }) {
    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    const email = window.localStorage.getItem("email");

    return (
        <MainHeaderContainer>
            <Link to="/">
                <img src={headerIcon} />
            </Link>
            <MainHeaderComponentsContainer>
                <MainHeaderComponent>{`${email} 님`}</MainHeaderComponent>
                <MainHeaderComponent>
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        로그아웃
                    </Link>
                </MainHeaderComponent>
                <WhiteVerticalLine />
                <MainHeaderComponent>MY</MainHeaderComponent>
            </MainHeaderComponentsContainer>
        </MainHeaderContainer>
    );
}
