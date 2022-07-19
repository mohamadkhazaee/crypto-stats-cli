import axios from "axios";
const instance = axios.create({
  baseURL: "https://rest.coinapi.io",
  timeout: 1000,
});
export default instance;
