import { connectRoom } from "./room";

class Api {
    connectRoom = connectRoom;
}

export const api = new Api();
