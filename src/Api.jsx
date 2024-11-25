import axios from "axios";

const Api = axios.create({
  baseURL: "http://20.84.65.106:3333",
});

export default Api;
