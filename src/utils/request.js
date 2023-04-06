import axios from "axios";
import router from "../router";

const request = axios.create({

    baseURL: 'http://10.24.154.57:8080',// fdz
    // baseURL: 'http://10.24.233.83:8080',// lsm
    timeout: 5000
})


export default request