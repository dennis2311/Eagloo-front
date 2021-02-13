import React from "react";
import ScheduleEach from "./ScheduleEach";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const SchedulerBodyRow = styled.div`
    position: relative;
    display: flex;
    height: ${(props) => (props.schedulerOpen ? "540px" : "36px")};
    overflow: ${(props) => (props.schedulerOpen ? "auto" : "hidden")};
    flex-direction: column;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Loading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
`;

const LoadingMessage = styled.h3`
    color: #ffffff;
    font-family: "JejuGothic";
    margin-top: 12px;
`;

export default function SchedulerBody({
    loading,
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
            {loading && (
                <Loading>
                    <CircularProgress />
                    <LoadingMessage>
                        스케쥴 목록을 읽어오는 중입니다
                    </LoadingMessage>
                </Loading>
            )}
        </SchedulerBodyRow>
    );
}
