import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import ForumHead from "./ForumHead";
import ForumBody from "./ForumBody";
import ForumFoot from "./ForumFoot";
import Foo from "./foo";

const server = "https://eaglooserver.herokuapp.com";

const ForumContainer = styled.div`
    display: flex;
    min-width: 960px;
    width: 90%;
    flex-direction: column;
    align-items: center;
    border: 2px solid blueviolet;
`;

export default function Forum() {
    const [college, setCollege] = useState("All");
    const [totalThreads, setTotalThreads] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentThreads, setCurrentThreads] = useState([]);

    useEffect(() => {
        async function getThreads() {
            try {
                // const { data } = await axios.get(`${server}/threads`);
                // setTotalThreads(data.length);
            } catch (error) {}
        }
        getThreads();
    }, []);

    return (
        <ForumContainer>
            <ForumHead college={college} setCollege={setCollege} />
            <ForumBody currentThreads={currentThreads} />
            <ForumFoot
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCurrentThreads={setCurrentThreads}
            />
        </ForumContainer>
    );
}
