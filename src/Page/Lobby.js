import React from "react";
import { Link } from "react-router-dom";
import Scheduler from "../Component/Scheduler";
import "../Style/Lobby.css";

function Lobby() {
    return (
        <div id="lobby">
            <div className="rooms">
                <p>
                    <span>
                        자신이 속한 대학, 혹은 듣고 있는 강의가 열린 대학으로
                        들어가 공부하세요!
                    </span>
                </p>
                <Link to={`/public/business`}>경영대학</Link>
                <Link to={`/public/engineer`}>공학대학</Link>
                <Link to={`/public/underwood`}>국제대학</Link>
                <Link to={`/public/socsci`}>사회과학대학</Link>
            </div>
            <div className="scheduler">
                <Scheduler />
            </div>
        </div>
    );
}

export default Lobby;
