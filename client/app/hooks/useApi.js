import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);

    if (!response.ok) {
      setError(!response.ok);
      setErrorMessage(response.message);
    }
    setData(response.data);
    setLoading(false);

    return response;
  };

  return { data, error, loading, errorMessage, request };
};
