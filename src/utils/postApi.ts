import axios from "axios";

export const postApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})