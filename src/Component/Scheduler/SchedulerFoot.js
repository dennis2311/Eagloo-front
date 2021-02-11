import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toastErrorMessage } from "../../Util/ToastMessages";

const server = "https://eaglooserver.herokuapp.com";

const SchedulerFootRow = styled.div`
    border: 2px solid darkorange;
    padding: 5px 15px;
    min-height: 100px;
`;

const ScheduleCreateInput = styled.input`
    width: 100%;
    height: inherit;
`;

export default function SchedulerFoot({ email, schedules, setSchedules }) {
    const [newScheduleInput, setNewScheduleInput] = useState("");

    async function createSchedule() {
        const { data } = await axios.post(`${server}/api/schedule`, {
            email,
            content: newScheduleInput,
        });
        if (data.success) {
            setSchedules([...schedules, data.schedule]);
            setNewScheduleInput("");
        } else {
            toastErrorMessage(data.message);
        }
    }

    return (
        <SchedulerFootRow>
            <ScheduleCreateInput
                type="text"
                value={newScheduleInput}
                onChange={(e) => {
                    setNewScheduleInput(e.target.value);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter" && newScheduleInput !== "") {
                        createSchedule();
                    }
                }}
                placeholder="새로운 일정을 입력 후 엔터를 눌러주세요"
            />
        </SchedulerFootRow>
    );
}
