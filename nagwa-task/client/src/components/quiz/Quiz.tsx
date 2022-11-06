import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import Progress from "../progressBar/Progress";

import "./Quiz.css";

const Quiz: FC = () => {
  /**
   * The useNavigate hook lets you navigate programmatically
   */
  let navigate = useNavigate();

  /**
   * useFetch is a custom hook for request rank endpoint
   * @param {string} url - url lead to endpoint
   */

  const [data, error, isLoading] = useFetch("http://localhost:3030/api/words");

  // array with question answers for mapping into buttons
  const answers: string[] = ["adverb", "verb", "noun", "adjective"];

  // useState to handle index of current questions
  const [currQuestion, setCurrQuestion] = useState<number | 0>(0);

  // useState to know current number if question and send it to progress component
  const [numOfQuestion, SetNumOfQuestion] = useState<number | 0>(0);

  // useState to handle final right answers and send it to rank page
  const [rightAnswers, setRightAnswers] = useState<number | 0>(0);

  /**
   * [correctAnswer , incorrectAnswer] for show users if selected answer correct ot incorrect
   */
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState<boolean | null>(null);
  const [avalible, setAvalible] = useState<boolean>(false);

  /**
   * function for get next question
   * @param currQuestion
   * @returns next Question
   */

  const nextQuestion = () => {
    setCurrQuestion((currQuestion) => currQuestion + 1);
  };

  /**
   * function to check if answer is right
   * @param value  ==> value = selected answer
   */

  const checkAnswer = (value: string) => {
    if (value === data[currQuestion].pos) {
      //stop user from slecting multiple choices
      setAvalible(true);
      // increase number of questions by one
      SetNumOfQuestion((numOfQuestion) => numOfQuestion + 1);

      // increase number of right answers by one
      setRightAnswers((rightAnswers) => rightAnswers + 1);

      // set correct answer to true and show to user
      setCorrectAnswer(true);

      // if usesr reach last question it stop
      if (currQuestion === data.length - 1) return;

      setTimeout(() => {
        setAvalible(false);
        // set correct answer to false then get next question
        setCorrectAnswer(false);
        nextQuestion();
      }, 1000);
    } else {
      // increase number of questions by one if the answer is incorrect
      SetNumOfQuestion((numOfQuestion) => numOfQuestion + 1);

      //stop user from slecting multiple choices
      setAvalible(true);

      // set incorrect answer to true and show to user
      setIncorrectAnswer(true);

      // if usesr reach last question it stop
      if (currQuestion === data.length - 1) return;

      setTimeout(() => {
        setAvalible(false);
        // set correct answer to false then get next question
        setIncorrectAnswer(false);
        nextQuestion();
      }, 1000);
    }
  };

  // function check if user reach last question
  // it calc score percentage then redirect to rank page with it
  const calcResult = () => {
    setTimeout(() => {
      if (numOfQuestion === 10) {
        const totalNoOfQuestions = 10;
        //score = (number of correct answers / total number of questions)*100
        const scorePercentd = (rightAnswers / totalNoOfQuestions) * 100;
        navigate(`score/${scorePercentd}`);
      }
    }, 1000);
  };

  calcResult();


  return (
    <>
      {/* conditional render for loading component */}
      {isLoading && <Loading />}

      {/* conditional render for error component */}
      {error && <Error />}

      {/* conditional render for data */}
      {data && (
        <>
          <Progress progress={numOfQuestion} />
          <div className="quiz">
            <p className="quiz__title">Words: {currQuestion + 1}/10</p>
            <div className="quiz__box">
              <div className="quiz__inside">
                <h2 className="quiz__word">{data[currQuestion]?.word}</h2>
              </div>
              <div className="quiz__inside">
                {correctAnswer && (
                  <p className="quiz__answer">Correct Answer</p>
                )}
                {incorrectAnswer && (
                  <p className="quiz__answer">Incorrect Answer</p>
                )}
              </div>
            </div>

            {/* mapping into answers array to render it */}
            <div
              className="quiz__buttons"
              style={{ pointerEvents: avalible ? "none" : "auto" }}
            >
              {answers.map((value, index) => {
                return (
                  <button
                    className="quiz__action"
                    key={index}
                    onClick={() => checkAnswer(value)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
