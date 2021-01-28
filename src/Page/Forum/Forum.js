import React from "react";
import styled from "styled-components";
import ForumHead from "./ForumHead";
import ForumBody from "./ForumBody";
import ForumFoot from "./ForumFoot";

const ForumContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Forum() {
    return (
        <ForumContainer>
            <ForumHead />
            <ForumBody />
            <ForumFoot />
        </ForumContainer>
    );
}

export default Forum;
