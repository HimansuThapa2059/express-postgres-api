import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req: Request, res: Response) => {
  res.send("This Message Is Comming From NodeJs Sever.");
});

//Errors

//Entry Point
app.listen(port, () => console.log(`Listening to the port : ${port}`));
