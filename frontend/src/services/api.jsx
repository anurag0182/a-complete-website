
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getBlogs = async () => {
  const res = await API.get("/blogging/");
  console.log("API DATA:", res.data);  
  return res;
};
