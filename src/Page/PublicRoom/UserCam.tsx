import React, { useRef } from "react";
import styled from "styled-components";

const Cam = styled.video`
    width: 100%;
    height: auto;
    border-radius: 15px;
`;
interface IProps {
    stream: any;
}

const UserCam: React.FC<IProps> = ({ stream }) => {
    const camRef = useRef(stream);

    return <Cam ref={camRef} autoPlay playsInline />;
};

export default UserCam;
