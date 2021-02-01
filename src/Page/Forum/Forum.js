import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ForumHead from "./ForumHead";
import ForumBody from "./ForumBody";
import ForumFoot from "./ForumFoot";
import toastErrorMessage from "../../Util/ToastErrorMessage";

const server = "https://eaglooserver.herokuapp.com";

const ForumContainer = styled.div`
    display: flex;
    min-width: 960px;
    width: 90%;
    flex-direction: column;
    align-items: center;
    border: 2px solid blueviolet;
`;

// TODO
// useEffect 클린업 설정할 것
export default function Forum() {
    const [loading, setLoading] = useState(true);
    const [college, setCollege] = useState("all");
    const [totalThreads, setTotalThreads] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentThreads, setCurrentThreads] = useState([]);

    // 전체 스레드 수 반환
    useEffect(() => {
        async function getTotalThreads() {
            console.log("선택한 옵션의 전체 스레드 수를 계산 중입니다");
            try {
                const { data } = await axios.get(
                    `${server}/api/thread/all/total`
                );
                if (data.success) {
                    console.log(data.totalThreads);
                    setTotalThreads(data.totalThreads);
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (error) {
                toastErrorMessage("서버 통신 중 오류가 발생했습니다");
            }
        }

        getTotalThreads();
    }, [college]);

    // 표시할 스레드 반환
    useEffect(() => {
        async function getCurrentThreads() {
            try {
                const { data } = await axios.get(
                    `${server}/api/thread/${college}/page/${currentPage}`
                );
                if (data.success) {
                    console.dir(data.threads);
                    setCurrentThreads(data.threads);
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                toastErrorMessage("서버 통신 중 오류가 발생했습니다");
            }
        }
        setLoading(true);
        getCurrentThreads();
        setLoading(false);
    }, [college, currentPage]);

    return (
        <ForumContainer>
            <ForumHead college={college} setCollege={setCollege} />
            <ForumBody
                loading={loading}
                totalThreads={totalThreads}
                currentThreads={currentThreads}
            />
            <ForumFoot
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </ForumContainer>
    );
}
