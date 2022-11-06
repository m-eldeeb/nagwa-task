import axios from "axios";
import { useEffect, useState } from "react";

/**
 * interface to define data
 */

interface Props {
  url: string;
  sendingData: string;
}

const usePost = ({ url, sendingData }: Props) => {
  /**
   * We use [useState] to mange states
   * [data,setData] to store fetching data from api
   * [error, setError] to set eror if fetching data is failed
   * [isLoading, setIsLoading] to mange request state
   */

  const [data, setData] = useState<number>(0);
  const [error, setError] = useState<Boolean | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  /**
   * useEffect perform side effects for funtion component
   * with dependencies []
   * axios package to make requests to a given endpoint [Post] Request
   */

  /**
   * @param {string} url - url lead to endpoint
   * @param {string} sendingData - data we send in request body
   */
  useEffect(() => {
    axios
      .post(url, { score: sendingData })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url, sendingData]);
  return [data, error, isLoading] as const;
};

export default usePost;
