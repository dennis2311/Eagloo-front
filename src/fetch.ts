class Api {
    private endpoint: string = process.env.REACT_APP_SERVER || "";
    createUser() {
        // fetch요청 create user.
    }
}

export const api = new Api();
