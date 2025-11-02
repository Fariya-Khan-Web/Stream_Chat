import axios from "axios";

// const BASE_URL = import.meta.env.MODE === 'development'? 'http://localhost:5001/api' : 
// console.log(BASE_URL)

const axiosInst = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})


export default axiosInst