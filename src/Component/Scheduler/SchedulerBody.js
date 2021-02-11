import React from "react";
import ScheduleEach from "./ScheduleEach";
import styled from "styled-components";

const SchedulerBodyRow = styled.div`
    border: 2px solid darkolivegreen;
    overflow: auto;
`;

export default function SchedulerBody({ schedules, setSchedules }) {
    return (
        <SchedulerBodyRow>
            {schedules.map((scheduleEach) => (
                <ScheduleEach
                    key={scheduleEach.id}
                    scheduleEach={scheduleEach}
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            ))}
        </SchedulerBodyRow>
    );
}
