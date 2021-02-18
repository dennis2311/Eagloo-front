import React from "react";
import styled from "styled-components";
import peerOfflineImage from "../../resource/img/peer-offline.gif";

const PeerSpaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 180px;
    min-height: 180px;
    margin-bottom: 20px;
`;
const PeerCamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    border: 2px solid ${(props) => props.theme.mainDarkBlue};
    border-radius: 12px;
    overflow: hidden;
`;

const PeerOfflineImageContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const PeerOfflineImage = styled.img`
    width: auto;
    height: 100%;
    max-height: 100%;
    display: block;
`;

const PeerCam = styled.video`
    width: 60%;
    height: auto;
    border-radius: 12px;
`;

export default function PeerSpace({ peerOnline, peerCamRef }) {
    return (
        <PeerSpaceContainer>
            <PeerCamContainer>
                {!peerOnline ? (
                    <PeerOfflineImageContainer>
                        <PeerOfflineImage
                            src={peerOfflineImage}
                            alt="peer-offline-image"
                        />
                    </PeerOfflineImageContainer>
                ) : (
                    <PeerCam ref={peerCamRef} autoPlay playsInline />
                )}
            </PeerCamContainer>
        </PeerSpaceContainer>
    );
}
