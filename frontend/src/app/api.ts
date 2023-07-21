import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000"
});

// api.interceptors.request.use(
//     config => {
//         if (config.method === "post" || config.method === "patch") {
//             config.headers["Content-Type"] = "multipart/form-data";
//         }
//         return config;
//     }, 
//     error => {
//         return Promise.reject(error);
//     }
// );


// api.interceptors.request.use(
//     config => {
//         config.headers["Authorization"] = token;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );