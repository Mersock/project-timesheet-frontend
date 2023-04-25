import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "config";
import { useHistory } from "react-router-dom";

axios.defaults.baseURL = backendUrl;

export const useAxiosFetch = (axiosParams, initFetch = false) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();


  const fetchData = async () => {
    try {
      const response = await axios.request(axiosParams);
      setData(response.data);
    } catch (error) {
      setError(error);
      setLoading(false);
      if (error.response.status == 401) {
        history.push('/auth')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initFetch) {
      fetchData();
    }
  }, [initFetch]);

  return { data, error, loading, fetchData };
};
