import express, { Application } from "express";
import wordRouter from "./routes/word";
import rankRouter from "./routes/rank";

require("dotenv").config();
const cors = require("cors");

const app: Application = express();


// middleware to parse incoming request bodies before available under the req.body property
app.use(express.json());


//middleware that can be used to enable CORS

app.use(cors());


// adding app routes with initial path
app.use("/api/words", wordRouter);
app.use("/api/score", rankRouter);


// app is listening on port [3030] from env file
const port = process.env.PORT ;

app.listen(port, (): void => {
  console.log("app is running.... ");
});
