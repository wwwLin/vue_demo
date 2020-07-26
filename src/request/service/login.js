import axios from "../http";
import qs from "qs";

/*eslint-disable*/
const baseUrl = window.baseUrl;

const LoginService = {
    userLogin(params) { return axios.post(`${baseUrl}/user/login`, qs.stringify(params)) },
    userRegister(params) { console.log(params);return axios.post(`${baseUrl}/user/register`, qs.stringify(params)) },
    oserOut() { return axios.get(`${baseUrl}/user/out`) }
}

export default LoginService;