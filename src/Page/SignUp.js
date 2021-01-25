import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import toastErrorMessage from "../Util/ToastErrorMessage";

var hash = require("object-hash");

function SignUp({ history }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [emailInput, setEmailInput] = useState("");
    const [secretInput, setSecretInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
    const [secretSended, setSecretSended] = useState(false);
    const [secretAuthenticated, setSecretAuthenticated] = useState(false);

    const serverErrorMessage = "서버 통신 중 오류가 발생하였습니다";

    // 회원가입1단계
    async function sendSecret() {
        try {
            const { data } = await axios.post(`${server}/api/user`, {
                email: emailInput,
            });
            if (data.success) {
                setSecretSended(true);
                setSecretAuthenticated(false);
                toast.info(
                    <div>
                        <span role="img" aria-label="smile-face">
                            😃
                        </span>
                        &nbsp; {emailInput}@yonsei.ac.kr 로
                        <br />
                        &emsp; 인증 메일이 전송되었습니다
                    </div>
                );
            } else {
                toastErrorMessage(data.message);
            }
        } catch (err) {
            console.log(err);
            toastErrorMessage(serverErrorMessage);
        }
    }

    // 회원가입2단계
    async function confirmSecret() {
        try {
            const { data } = await axios.put(`${server}/api/user/secret`, {
                email: emailInput,
                givenSecret: secretInput,
            });
            if (data.success) {
                setSecretAuthenticated(true);
                toast.success(
                    <div>
                        <span role="img" aria-label="smile-face">
                            😆
                        </span>
                        &nbsp; 메일 인증이 완료되었습니다!
                        <br />
                        &emsp;비밀번호를 설정해주세요
                    </div>
                );
            } else {
                toastErrorMessage(data.message);
            }
        } catch (err) {
            console.log(err);
            toastErrorMessage(serverErrorMessage);
        }
    }

    // 회원가입3단계
    async function setPassword() {
        if (passwordInput !== passwordConfirmInput) {
            toastErrorMessage("비밀번호가 일치하지 않아요");
        } else {
            try {
                const { data } = await axios.put(
                    `${server}/api/user/password`,
                    {
                        email: emailInput,
                        givenPassword: hash(passwordInput),
                    }
                );
                if (data.success) {
                    toast.success(`😎 계정 생성이 완료되었습니다!`);
                    history.push("/");
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                console.log(err);
                toastErrorMessage(serverErrorMessage);
            }
        }
    }

    return (
        <div>
            새 계정 만들기
            <div>
                <input
                    type="text"
                    value={emailInput}
                    placeholder="연세대학교 메일 계정"
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                @yonsei.ac.kr
                <button onClick={() => sendSecret()}>인증 단어 발송</button>
            </div>
            {secretSended ? (
                <div>
                    <input
                        type="text"
                        value={secretInput}
                        placeholder="메일로 도착한 인증 단어를 입력해 주세요"
                        onChange={(e) => setSecretInput(e.target.value)}
                    />
                    <button onClick={() => confirmSecret()}>인증하기</button>
                </div>
            ) : (
                <></>
            )}
            {secretAuthenticated ? (
                <div>
                    <div>
                        <input
                            type="password"
                            value={passwordInput}
                            placeholder="비밀번호"
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={passwordConfirmInput}
                            placeholder="비밀번호 확인"
                            onChange={(e) =>
                                setPasswordConfirmInput(e.target.value)
                            }
                        />
                    </div>
                    <button onClick={() => setPassword()}>계정 생성하기</button>
                </div>
            ) : (
                <></>
            )}
            <Link to="/">
                <button>홈으로 돌아가기</button>
            </Link>
        </div>
    );
}

export default SignUp;
