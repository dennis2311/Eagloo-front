import React, { useState } from "react";
import styled from "styled-components";
import SubthreadEach from "./SubthreadEach";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const ArcodionContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
    padding: 20px;
    border: 2px solid brown;
`;

const ArcodionHead = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const ArcodionSubject = styled.div``;

const ArcodionInfo = styled.div``;

const ArcodionContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function MainthreadEach({ mainthread }) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <ArcodionContainer>
            <Accordion
                expanded={expanded === "content"}
                onChange={handleChange("content")}
            >
                <AccordionSummary>
                    <ArcodionHead>
                        <ArcodionSubject>{mainthread.subject}</ArcodionSubject>
                        <ArcodionInfo>
                            <div>{`작성자 : ${mainthread.user.email}`}</div>
                            <div>{`작성일 : ${mainthread.createdAt}`}</div>
                        </ArcodionInfo>
                    </ArcodionHead>
                </AccordionSummary>
                <AccordionDetails>
                    <ArcodionContent>{mainthread.content}</ArcodionContent>
                    {mainthread.subthreads.map((subthread) => (
                        <SubthreadEach
                            key={subthread.id}
                            subthread={subthread}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
        </ArcodionContainer>
    );
}
