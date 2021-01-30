import React from "react";
import styled from "styled-components";
import MainthreadEach from "./MainthreadEach";

const ForumBodyRow = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function ForumBody({ totalThreads, currentThreads }) {
    return (
        <ForumBodyRow>
            <div>{`총 ${totalThreads}개`}</div>
            {currentThreads.map((mainthread) => (
                <MainthreadEach key={mainthread.id} mainthread={mainthread} />
            ))}
        </ForumBodyRow>
    );
}
