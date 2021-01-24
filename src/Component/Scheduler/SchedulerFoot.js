import React, { useState } from "react";
import styled from "styled-components";

const SchedulerFootRow = styled.div`
    border: 2px solid darkorange;
    padding: 5px 15px;
    min-height: 100px;
`;

const ScheduleCreateInput = styled.input`
    width: 100%;
    height: inherit;
`;

function SchedulerFoot({ schedules, setSchedules }) {
    const [newScheduleInput, setNewScheduleInput] = useState("");

    function createSchedule() {
        if (newScheduleInput !== "") {
            const newSchedule = { content: newScheduleInput, state: 0 };
            setSchedules([...schedules, newSchedule]);
            setNewScheduleInput("");
        }
        return;
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
                    if (e.key === "Enter") {
                        createSchedule();
                    }
                }}
                placeholder="새로운 일정을 입력 후 엔터를 눌러주세요"
            />
        </SchedulerFootRow>
    );
}

export default SchedulerFoot;
