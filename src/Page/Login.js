import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    toastLoginSuccessMessage,
    toastErrorMessage,
} from "../Util/ToastMessages";
import loginIcon from "../resource/img/login-icon.png";
import { StylelessButton } from "../Style/component/button";

var hash = require("object-hash");

const LoginPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.mainBlue};
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 337.5px;
`;

const EaglooIcon = styled.img`
    padding-bottom: 30px;
`;

const EaglooLabel = styled.h1`
    color: #ffffff;
    font-size: 66px;
    font-family: "SamlipHopang";
    letter-spacing: 3px;
    padding-bottom: 8px;
`;

const EaglooSubLabel = styled.h2`
    color: #ffffff;
    font-size: 21px;
    font-family: "JejuGothic";
    padding-bottom: 40px;
`;

const IdBoxContainer = styled.div`
    position: relative;
    width: 100%;
`;

const YonseiMailPlaceholder = styled.h4`
    position: absolute;
    top: 15px;
    right: 12px;
    color: ${(props) => props.theme.mailPlaceholder};
    font-size: 18px;
    font-family: "JejuGothic";
`;

const IdBox = styled.input`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: "JejuGothic";
    padding: 0 12px;
    margin-bottom: 15px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${(props) => props.theme.placeholder};
    }
`;

const PasswordBox = styled(IdBox)``;

const SignInButton = styled(StylelessButton)`
    width: 100%;
    height: 46px;
    color: #ffffff;
    font-size: 22px;
    font-family: "JejuGothic";
    border-radius: 8px;
    background-color: ${(props) => props.theme.buttonBlue};
    margin-bottom: 38px;
`;

const UtilButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 92%;
    margin-bottom: 50px;
`;

const UtilButton = styled.div`
    color: ${(props) => props.theme.mainDarkBlue};
    font-size: 16px;
    font-family: "JejuGothic";
`;

export default function Login({ setIsLoggedIn }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    async function handleLogin() {
        const { data } = await axios.get(
            `${server}/api/user/${emailInput}/${hash(passwordInput)}`
        );
        if (data.success) {
            window.localStorage.setItem("email", emailInput);
            window.localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
            toastLoginSuccessMessage(emailInput);
        } else {
            toastErrorMessage(data.message);
        }
    }

    return (
        <LoginPage>
            <LoginContainer>
                <EaglooIcon src={loginIcon} alt="login icon" />
                <EaglooLabel>EAGLOO</EaglooLabel>
                <EaglooSubLabel>연세대학교 온라인 스터디공간</EaglooSubLabel>
                <IdBoxContainer className="idboxcontainer">
                    <IdBox
                        type="text"
                        value={emailInput}
                        placeholder="id"
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <YonseiMailPlaceholder>@yonsei.ac.kr</YonseiMailPlaceholder>
                </IdBoxContainer>
                <PasswordBox
                    type="password"
                    value={passwordInput}
                    placeholder="password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />
                <SignInButton onClick={() => handleLogin()}>
                    sign in
                </SignInButton>
                <UtilButtonsContainer>
                    <UtilButton>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/signup"
                        >
                            회원가입
                        </Link>
                    </UtilButton>
                    <UtilButton>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/"
                        >
                            아이디 찾기
                        </Link>
                    </UtilButton>
                    <UtilButton>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/"
                        >
                            비밀번호 찾기
                        </Link>
                    </UtilButton>
                </UtilButtonsContainer>
            </LoginContainer>
        </LoginPage>
    );
}
