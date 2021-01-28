import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UserHeaderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

function UserHeader({ setIsLoggedIn }) {
    function makeFeedback() {
        alert("피드백 생성창");
    }

    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    return (
        <UserHeaderContainer>
            <div>
                <Link to={`/about`}>About</Link>
            </div>
            <div>
                <button
                    onClick={() => {
                        makeFeedback();
                    }}
                >
                    건의하기
                </button>
            </div>
            <div>
                <Link to={`/forum`}>포럼</Link>
            </div>
            <div>
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    로그아웃
                </button>
            </div>
        </UserHeaderContainer>
    );
}

export default UserHeader;
