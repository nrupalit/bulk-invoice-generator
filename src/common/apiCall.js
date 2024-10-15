import axios from "axios";
import { API_BASE } from "./apiConst";

export default function apiCall(url, method, data) {
    return axios({
        url: `${API_BASE}${url}`,
        method,
        headers: {
            "Content-Type": "application/json"
        },
        data,
    });
}