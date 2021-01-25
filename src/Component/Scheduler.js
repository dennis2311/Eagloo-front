import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SchedulerHead from "./Scheduler/SchedulerHead";
import SchedulerBody from "./Scheduler/SchedulerBody";
import SchedulerFoot from "./Scheduler/SchedulerFoot";

const SchedulerUpper = styled.div`
    display: flex;
    flex-direction: column;
    height: 540px;
`;

const SchedulerBottom = styled.div``;

function Scheduler() {
    const server = "https://eaglooserver.herokuapp.com";
    const [userEmail, setUserEmail] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loadComlete, setLoadComplete] = useState(true);

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        setUserEmail(email);
        async function getSchedules(email) {
            try {
                const { data } = await axios.get(
                    `${server}/api/schedule/${email}/`
                );
                setSchedules(data.schedules);
            } catch (err) {
                setLoadComplete(false);
            }
        }
        getSchedules(email);
    }, []);

    return (
        <section>
            <SchedulerUpper>
                <SchedulerHead userEmail={userEmail} schedules={schedules} />
                <SchedulerBody
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            </SchedulerUpper>
            <SchedulerBottom>
                <SchedulerFoot
                    userEmail={userEmail}
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            </SchedulerBottom>
        </section>
    );
}

export default Scheduler;
