import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./route/route";
import errorHandler from "./middleware/errohandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", router);

//Errors
app.use(errorHandler);

//Entry Point
app.listen(port, () => console.log(`Listening to the port : ${port}`));
