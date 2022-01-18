import { useState, useEffect } from "react";

export const UseFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({ loading: true, data: null });

  useEffect(() => {
    getData(url);
  }, [url]);

  async function getData(url) {
    try {
      setFetchedData({ loading: true, data: null });
      const res = await fetch(url);
      const data = await res.json();
      setFetchedData({ loading: false, data });
    } catch (error) {
      console.error(error);
    }
  }

  return fetchedData.data;
};
