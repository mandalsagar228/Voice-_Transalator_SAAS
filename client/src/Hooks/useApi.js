import { useState } from "react";
import API from "../Services/api";

// custom hooks

const useApi = (urlObject) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const call = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      let res = await API(payload, urlObject);

      setResponse(res);
      console.log("respose  from  useapi", res);
    } catch (error) {
      setError(error);
      console.log("error  from  useapi", error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { call, response, error, isLoading };
};

export default useApi;
