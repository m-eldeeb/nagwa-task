import { Request, Response } from "express";
import { readFileSync } from "fs";
import { join, dirname } from "path";

// interface for describing [testData.json] file
interface file {
  wordList: [];
  scoresList: [];
}

// getting absolute path for main directory
const dirName = dirname(require?.main?.filename!);

// getting absolute path for [testData.json] file
const dataPath: string = join(dirName, "data", "testData.json");

// initiate array to store scorList from [testData.json] file
let scores: [] = [];

// function controller
const getRank = (req: Request, res: Response): void => {
  // get score from request body
  const score: number = Number(req.body.score);

  // read data from [testData.json] file
  const data: Buffer = readFileSync(dataPath);

  // parsing data from [json] ==> [js object]
  const dataParsing: file = JSON.parse(data.toString());

  // store scorList from [testData.json] file
  scores = [...dataParsing.scoresList];

  /**
   * @params all scores list
   * @return array of scores list less than given score
   */
  const selectedScores: number[] = scores.filter(
    (item: number) => item < score
  );

  /**
   * according to explanation
   * Score: 90 => Rank: 80
   *
   * There are 24 scores out of 30 in the scoresList which are below 90.
   * This is 80% of the scoresList, so the rank will be 80%
  
   */

  const rank: number = parseFloat(
    ((selectedScores.length / scores.length) * 100).toFixed(2)
  );

  // send response with 200 status
  res.status(200).json(rank);
};

export default getRank;
