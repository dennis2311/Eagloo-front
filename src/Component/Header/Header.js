import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";
import CommonHeader from "./CommonHeader";
import NoticeHeader from "./NoticeHeader";

const HeaderContainer = styled.header`
    width: 100%;
`;

const MainHeader = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: antiquewhite;
`;

function Header({ isLoggedIn, setIsLoggedIn, setFeedbackOpen }) {
    return (
        <HeaderContainer>
            <MainHeader>
                <div>
                    <Link to={`/`}>홈으로</Link>
                </div>
                <h2>
                    유저들은 이 헤더를 보게 됩니다 ㅋㅋㄹㅃㅃ 대략 이글루 아이콘
                    넣을거임
                </h2>
                {isLoggedIn ? (
                    <UserHeader
                        setIsLoggedIn={setIsLoggedIn}
                        setFeedbackOpen={setFeedbackOpen}
                    />
                ) : (
                    <CommonHeader />
                )}
            </MainHeader>
            <NoticeHeader />
        </HeaderContainer>
    );
}

export default Header;
