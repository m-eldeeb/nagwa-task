import { FC } from "react";
import { Link } from "react-router-dom";

import usePost from "../../hooks/usePost";
import Error from "../error/Error";
import Loading from "../loading/Loading";

import "./Result.css";

const Result: FC<{ score: string }> = ({ score }) => {
  /**
   * usePost is a custom hook for request rank endpoint
   
  
   * @param {string} url - url lead to endpoint
   * @param {string} score - data we send in request body
   */

  const [data, error, isLoading] = usePost({
    url: "http://localhost:3030/api/score/",
    sendingData: score,
  });

  return (
    <>
      {/* conditional render for loading component */}
      {isLoading && <Loading />}

      {/* conditional render for error component */}
      {error && <Error />}

      {/* conditional render for data */}
      {data >= 0 && (
        <div className="result">
          <p className="result__text">
            Congrats you have finished your test and your rank is
            <span className="result__score"> [{data}%]</span>
          </p>

          {/* try agin btn have link to back practice screen  */}
          <Link to="/" className="result__btn">
            try again
          </Link>
        </div>
      )}
    </>
  );
};

export default Result;
