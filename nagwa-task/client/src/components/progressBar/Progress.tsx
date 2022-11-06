import { FC, useEffect } from "react";
import { useState } from "react";

import "./Progress.css";

const Progress: FC<{ progress: number }> = ({ progress: noRightAnswers }) => {
  /**
   * [progressPercentage, setProgressPercentage] to mange progress
   */
  let [progressPercentage, setProgressPercentage] = useState<number | 0>(0);

  /**
   * useEffect take a dependency [progress]
   * component will run each time progress change
   */

  useEffect(() => {
    // preogress = (number of answered questions / total number of questions) * 100
    const totalNoOfQuestions = 10;
    const preogress = (noRightAnswers / totalNoOfQuestions) * 100;
    setProgressPercentage(preogress);
  }, [noRightAnswers]);

  return (
    <div className="progress">
      <div className="progress__bar">
        <div
          className="progress__percent"
          style={{ width: progressPercentage + "%" }}
        ></div>
        <div className="progress__text">{progressPercentage}%</div>
      </div>
    </div>
  );

};

export default Progress;
