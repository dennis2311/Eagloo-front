import io from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect(`http://localhost:8000`);
export const SocketContext = createContext();
