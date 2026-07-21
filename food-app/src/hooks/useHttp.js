import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok)
    throw new Error(
      responseData.message || "Somethin went wrong, failed to process request",
    );

  return responseData;
};

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const clearData = () => setData(initialData);

  const sendRequest = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const responseData = await sendHttpRequest(url, {
          ...config,
          body: data,
        });
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went really wrong!");
      }
      setLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (!config || (config && (!config.method || config.method === "GET")))
      sendRequest();
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
};

export default useHttp;
