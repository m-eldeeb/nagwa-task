import { Request, Response } from "express";
import { readFileSync } from "fs";
import { join, dirname } from "path";

// interface for describing data object
interface type {
  id?: number;
  word?: string;
  pos?: string;
}

// interface for describing [testData.json] file
interface file {
  wordList: [];
  scoresList: [];
}

// getting absolute path for main directory
const dirName = dirname(require?.main?.filename!);

// getting absolute path for [testData.json] file
const dataPath: string = join(dirName, "data", "testData.json");

// initiate array to store wordList from [testData.json] file
let words: [] = [];

// The function for selecting random elements from the array.
const getRandomWords = (): type[] => {
  //array for selected words.
  const result: [] = [];

  // we need 10 words
  let limit: number = 10;

  // set array with our 4 pos.
  const pos: string[] = ["adverb", "noun", "adjective", "verb"];

  // After we get 4 words we need to get the reset of 10
  limit = limit - pos.length;

  // loop through "pos" value.
  for (let i: number = 0; i < pos.length; i++) {
    // Get all objects for the current value of "pos".
    /**
     * @params 'adverb
     * @return
     * [
     *  { id: 1, word: 'slowly', pos: 'adverb' },
     *  { id: 15, word: 'heavily', pos: 'adverb' }
     * ]

     */
    const itemsWithPos: any = words.filter((item: type) => item.pos === pos[i]);

    /**
     * @params
     * [
     *  { id: 1, word: 'slowly', pos: 'adverb' },
     *  { id: 15, word: 'heavily', pos: 'adverb' }
     * ]
     * @return random word the current "pos"
     */

    const randomWord = getRandomWord(itemsWithPos);

    //add word to the result array
    result.push(randomWord);
  }

  // Get the rest of the values without caring about the "pos" value.
  for (let i: number = 0; i < limit; i++) {
    // Add a random object from the array to the result array.
    result.push(getRandomWord(words));
  }

  // Return the result array.
  return result;
};

// function Get a random element from the array.
const getRandomWord = (words: []) => {
  const randomImdex = Math.floor(Math.random() * words.length);
  return words[randomImdex];
};

const getWords = (req: Request, res: Response) => {
  // read data from [testData.json] file
  const data: Buffer = readFileSync(dataPath);

  // parsing data from [json] ==> [js object]
  const dataParsing: file = JSON.parse(data.toString());

  // store wordList from [testData.json] file
  words = [...dataParsing.wordList];

  // call function to get random words
  const result = getRandomWords();

  // send response with 200 status
  res.status(200).json(result);
};

export default getWords;
