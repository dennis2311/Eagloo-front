import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp({ history }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [mailInput, setMailInput] = useState("");
    const [secretInput, setSecretInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
    const [secretSended, setSecretSended] = useState(false);
    const [secretAuthenticated, setSecretAuthenticated] = useState(false);

    // 회원가입1단계
    async function sendSecret() {
        try {
            const { data } = await axios.post(
                `${server}/api/user/${mailInput}`
            );
            if (data.success) {
                setSecretSended(true);
                setSecretAuthenticated(false);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
            alert("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    // 회원가입2단계
    async function confirmSecret() {
        try {
            const { data } = await axios.get(
                `${server}/api/user/${mailInput}/${secretInput}`
            );
            if (data.success) {
                setSecretAuthenticated(true);
                alert("메일 인증이 완료되었습니다! 비밀번호를 설정해주세요");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
            alert("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    // 회원가입3단계
    async function setPassword() {
        if (passwordInput !== passwordConfirmInput) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            try {
                const { data } = await axios.put(
                    `${server}/api/user/${mailInput}/${passwordInput}`
                );
                if (data.success) {
                    alert("계정 생성이 완료되었습니다! 홈화면으로 돌아갑니다");
                    history.push("/");
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.log(err);
                alert("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요");
            }
        }
    }

    return (
        <div>
            새 계정 만들기
            <div>
                <input
                    type="text"
                    value={mailInput}
                    placeholder="연세대학교 메일 계정"
                    onChange={(e) => setMailInput(e.target.value)}
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
