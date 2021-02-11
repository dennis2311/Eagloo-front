import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SchedulerHead from "./SchedulerHead";
import SchedulerBody from "./SchedulerBody";
import SchedulerError from "./SchedulerError";
import SchedulerFoot from "./SchedulerFoot";
import { toastErrorMessage } from "../../Util/ToastMessages";

const server = "https://eaglooserver.herokuapp.com";

const SchedulerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SchedulerUpper = styled.div`
    display: flex;
    flex-direction: column;
    height: 540px;
`;

const SchedulerBottom = styled.div``;

// TODO
// useEffect 클린업 설정할 것
// (스케쥴러 로딩이 되기 전에 라우터로 움직이는 경우 메모리 누수 발생)
export default function Scheduler() {
    const [loading, setLoading] = useState(true);
    const email = window.localStorage.getItem("email");
    const [schedules, setSchedules] = useState([]);
    const [loadSuccess, setLoadSuccess] = useState(true);

    useEffect(() => {
        async function getSchedules(email) {
            try {
                const { data } = await axios.get(
                    `${server}/api/schedule/${email}/`
                );
                if (loading) {
                    setSchedules(data.schedules);
                }
            } catch (err) {
                toastErrorMessage("스케쥴러를 받아오지 못했습니다");
            }
        }
        getSchedules(email);

        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <SchedulerContainer>
            <SchedulerUpper>
                <SchedulerHead
                    email={email}
                    schedules={schedules}
                    loadSuccess={loadSuccess}
                />
                {loadSuccess ? (
                    <SchedulerBody
                        schedules={schedules}
                        setSchedules={setSchedules}
                    />
                ) : (
                    <SchedulerError email={email} />
                )}
            </SchedulerUpper>
            <SchedulerBottom>
                <SchedulerFoot
                    email={email}
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            </SchedulerBottom>
        </SchedulerContainer>
    );
}
