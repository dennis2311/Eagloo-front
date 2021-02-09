import React from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";
// import UserHeader from "./UserHeader";
// import CommonHeader from "./CommonHeader";
// import NoticeHeader from "./NoticeHeader";

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
`;

function Header({ setIsLoggedIn, setFeedbackOpen }) {
    return (
        <HeaderContainer>
            <MainHeader setIsLoggedIn={setIsLoggedIn} />
            <SubHeader setFeedbackOpen={setFeedbackOpen} />
        </HeaderContainer>
    );
}

export default Header;
