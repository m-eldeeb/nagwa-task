import axios from "axios";
import { useEffect, useState } from "react";

/**
 * interface to define data
 */

interface DataInterface {
  id: number;
  word: string;
  pos: string;
}

const useFetch = (url: string) => {
  /**
   * We use [useState] to mange states
   * [data,setData] to store fetching data from api
   * [error, setError] to set eror if fetching data is failed
   * [isLoading, setIsLoading] to mange request state
   */
  const [data, setData] = useState<DataInterface[]>([]);
  const [error, setError] = useState<Boolean | string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  /**
   * useEffect perform side effects for funtion component
   * with dependencies []
   * axios package to make requests to a given endpoint [Get] Request
   */
  useEffect(() => {
    axios
      .get<DataInterface[]>(url)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return [data, error, isLoading] as const;
};

export default useFetch;
