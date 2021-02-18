import io from "socket.io-client";
import { createContext } from "react";

// export const socket = io.connect(`http://localhost:8000`);
export const socket = io.connect(`https://eaglooserver.herokuapp.com`);
export const SocketContext = createContext();
