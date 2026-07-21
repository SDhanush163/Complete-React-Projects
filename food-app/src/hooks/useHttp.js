import { useCallback, useEffect, useState } from "react";

// Sends an HTTP request and returns the response data
const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const responseData = await response.json();

  // Throw an error if the request fails
  if (!response.ok)
    throw new Error(
      responseData.message || "Somethin went wrong, failed to process request",
    );

  return responseData;
};

// Custom hook for handling HTTP requests
const useHttp = (url, config, initialData) => {
  // Stores response data
  const [data, setData] = useState(initialData);

  // Tracks loading state
  const [isLoading, setLoading] = useState(false);

  // Stores any request errors
  const [error, setError] = useState();

  // Reset data to its initial value
  const clearData = () => setData(initialData);

  // Sends the HTTP request
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

  // Automatically fetch data for GET requests
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
