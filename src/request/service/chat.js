import axios from "../http";
import qs from "qs";

const baseUrl = window.baseUrl;

const ChatService = {
    sendMsg(params) { return axios.post(`${baseUrl}/chat/sendMsg`, qs.stringify(params)) },
    getMsg() { return axios.get(`${baseUrl}/chat/getMsg`) }
}

export default ChatService;