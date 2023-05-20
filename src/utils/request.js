import axios from "axios";
import router from "../router";

const request = axios.create({
    // baseURL: 'http://10.24.154.57:8080',// fdz
    // baseURL: 'http://10.24.233.83:8080',// lsm
    // baseURL: 'http://10.26.248.111:8080',// siri
    baseURL: 'http://10.25.9.108:8080', //xyw
    timeout: 100000
})


export default request