import React, { useState, useEffect, useRef } from "react";
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
    const [college, setCollege] = useState("All");
    const [totalThreads, setTotalThreads] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentThreads, setCurrentThreads] = useState([]);

    useEffect(() => {
        // 전체 스레드 수 반환
        async function getTotalThreads() {
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

        // 표시할 스레드 반환
        async function getCurrentThreads() {
            try {
                const { data } = await axios.get(
                    `${server}/api/thread/all/page/${currentPage}`
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

        getTotalThreads();
        getCurrentThreads();
    }, []);

    async function getTotalThreads() {
        try {
            // 전체 스레드
            if (college === "All") {
                const { data } = await axios.get(
                    `${server}/api/thread/all/total`
                );
                if (data.success) {
                    setTotalThreads(data.totalThreads);
                } else {
                    toastErrorMessage(data.message);
                }

                // 특정 대학 지정
            } else {
                const { data } = await axios.get(
                    `${server}/api/thread/${college}/total`
                );
                if (data.success) {
                    setTotalThreads(data.totalThreads);
                } else {
                    toastErrorMessage(data.message);
                }
            }
        } catch (err) {}
    }

    async function getCurrentThreads() {
        try {
            // 전체 스레드
            if (college === "All") {
                const { data } = await axios.get(
                    `${server}/api/thread/all/page/${currentPage}`
                );
                if (data.success) {
                    setCurrentThreads(data.threads);
                } else {
                    toastErrorMessage(data.message);
                }

                // 특정 대학 지정
            } else {
                const { data } = await axios.get(
                    `${server}/api/thread/${college}/page/${currentPage}`
                );
                if (data.success) {
                    setCurrentThreads(data.threads);
                } else {
                    toastErrorMessage(data.message);
                }
            }
        } catch (err) {
            toastErrorMessage("서버 통신 중 오류가 발생했습니다");
        }
    }

    return (
        <ForumContainer>
            <ForumHead college={college} setCollege={setCollege} />
            <ForumBody
                totalThreads={totalThreads}
                currentThreads={currentThreads}
            />
            <ForumFoot
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                getCurrentThreads={getCurrentThreads}
                getTotalThreads={getTotalThreads}
            />
        </ForumContainer>
    );
}
