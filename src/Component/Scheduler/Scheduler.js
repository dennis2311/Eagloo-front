import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SchedulerHead from "./SchedulerHead";
import SchedulerBody from "./SchedulerBody";
import SchedulerError from "./SchedulerError";
import SchedulerFoot from "./SchedulerFoot";

const server = "https://eaglooserver.herokuapp.com";

const SchedulerUpper = styled.div`
    display: flex;
    flex-direction: column;
    height: 540px;
`;

const SchedulerBottom = styled.div``;

function Scheduler() {
    const [userEmail, setUserEmail] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loadSuccess, setLoadSuccess] = useState(true);

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        setUserEmail(email);
        async function getSchedules(userEmail) {
            try {
                const { data } = await axios.get(
                    `${server}/api/schedule/${userEmail}/`
                );
                setSchedules(data.schedules);
            } catch (err) {
                setLoadSuccess(false);
            }
        }
        getSchedules(email);
    }, []);

    return (
        <>
            <SchedulerUpper>
                <SchedulerHead userEmail={userEmail} schedules={schedules} />
                {loadSuccess ? (
                    <SchedulerBody
                        schedules={schedules}
                        setSchedules={setSchedules}
                    />
                ) : (
                    <SchedulerError userEmail={userEmail} />
                )}
            </SchedulerUpper>
            <SchedulerBottom>
                <SchedulerFoot
                    userEmail={userEmail}
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            </SchedulerBottom>
        </>
    );
}

export default Scheduler;
