import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./route/route";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening to the port : ${port}`));
