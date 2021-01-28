import React from "react";
import styled from "styled-components";

const ForumHeadRow = styled.div`
    display: flex;
    float: left;
`;

function ForumHead() {
    return <ForumHeadRow>카테고리 선택</ForumHeadRow>;
}

export default ForumHead;
