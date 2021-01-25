import { toast } from "react-toastify";

function toastErrorMessage(message) {
    toast.error(`😥 ${message}`);
}

export default toastErrorMessage;
