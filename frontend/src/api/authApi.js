import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const signup = (data) => API.post("/auth/signUp", data);

export const signin = (data) => API.post("/auth/signIn", data);

export const logout = () => API.post("/auth/logout");

export const getUser = () => API.get("/user/data");