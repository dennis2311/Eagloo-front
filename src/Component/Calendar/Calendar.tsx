import React from "react";
import styled from "styled-components";
import { CalendarBody } from "./CalendarBody";
import { CalendarHead } from "./CalendarHead";
import { Scheduler } from "../Scheduler/Scheduler";

const CalendarContainer = styled.div`
    position: relative;
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export function Calendar() {
    return (
        <CalendarContainer>
            <CalendarHead />
            <CalendarBody />
            <Scheduler />
        </CalendarContainer>
    );
}
