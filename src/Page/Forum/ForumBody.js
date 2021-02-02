import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import MainthreadEach from "./MainthreadEach";

const ForumBodyRow = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 600px;
    flex-direction: column;
`;

const TotalThreadsTeller = styled.div`
    padding: 15px;
    background-color: #dddddd;
`;

const ForumLoading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
`;

const LoadingMessage = styled.h1`
    margin-top: 15px;
    color: #ffffff;
`;

export default function ForumBody({ loading, totalThreads, currentThreads }) {
    return (
        <ForumBodyRow>
            <TotalThreadsTeller>
                {`총 ${totalThreads}개의 게시물`}
            </TotalThreadsTeller>
            {currentThreads.map((mainthread) => (
                <MainthreadEach key={mainthread.id} mainthread={mainthread} />
            ))}
            {loading && (
                <ForumLoading>
                    <CircularProgress />
                    <LoadingMessage>
                        {`게시판 목록을 불러오는 중입니다`}
                    </LoadingMessage>
                </ForumLoading>
            )}
        </ForumBodyRow>
    );
}
