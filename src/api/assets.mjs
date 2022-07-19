import axios from "./instance.mjs";
export const getAssets = () =>
  axios.get("/v1/assets?apikey=E81D57BB-175D-44AD-963C-F6547D6F2110");
