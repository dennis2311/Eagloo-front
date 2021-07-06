import { API_ENDPOINT } from "../../constants";

console.log("API_ENDPOINT: ", API_ENDPOINT);

export interface IConnectRoomResponse {
    ok: boolean;
    message?: string;
    rooms?: {
        stream: string;
    }[];
}

export const connectRoom = (stream: string) =>
    fetch(API_ENDPOINT + `/api/room/${stream}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify({ room: "power", age: 123 }),
    });
