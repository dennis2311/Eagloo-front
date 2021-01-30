import React from "react";
import styled from "styled-components";
import SubthreadEach from "./SubthreadEach";

const MainthreadEachRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 20px;
    border: 2px solid brown;
`;

export default function MainthreadEach({ mainthread }) {
    return (
        <MainthreadEachRow>
            <div>{`제목 : ${mainthread.subject}`}</div>
            <div>{`작성자 : ${mainthread.user.email}`}</div>
            <div>{`작성일 : ${mainthread.createdAt}`}</div>
            <div>{`내용 : ${mainthread.content}`}</div>
            {mainthread.subthreads.map((subthread) => (
                <SubthreadEach key={subthread.id} subthread={subthread} />
            ))}
        </MainthreadEachRow>
    );
}
