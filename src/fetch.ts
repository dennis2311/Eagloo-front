import axios from "axios";

class Api {
    private endpoint: string = process.env.REACT_APP_SERVER || "";

    middleWare(token: string) {
        axios.get(`${this.endpoint}/api/user/boo`);
    }

    createUser() {
        // fetch요청 create user.
    }
}

export const api = new Api();
