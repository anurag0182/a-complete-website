
import axios from "axios";

const API = axios.create({
  baseURL: "https://a-complete-website.onrender.com/api",
});

export const getBlogs = async () => {
  const res = await API.get("/blogging/");
  console.log("API DATA:", res.data);  
  return res;
};
