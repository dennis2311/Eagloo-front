import React from "react";
import ScheduleEach from "./ScheduleEach";
import styled from "styled-components";

const SchedulerBodyRow = styled.div`
    display: flex;
    height: ${(props) => (props.schedulerOpen ? "540px" : "36px")};
    flex-direction: column;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export default function SchedulerBody({
    schedulerOpen,
    schedules,
    setSchedules,
}) {
    return (
        <SchedulerBodyRow schedulerOpen={schedulerOpen}>
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
