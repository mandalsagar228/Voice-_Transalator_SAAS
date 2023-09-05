import axios from "axios";

const API_URL = "http://localhost:8000";

const API = async (payload, urlObject) => {
  return await axios({
    method: urlObject.method,
    url: `${API_URL}/${urlObject.endPoint}`,

    data: payload,
  });
};

export default API;
