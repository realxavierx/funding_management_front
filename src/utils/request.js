import axios from "axios";
import router from "../router";
const request = axios.create({
    baseURL: 'http://10.16.42.166:8080',
    timeout: 5000
})


export default request