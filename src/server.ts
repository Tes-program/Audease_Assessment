import express from "express";
import { Logger } from "./shared/logger";
import { env } from "./config/env";
import helmet from "helmet";
import morgan from "morgan";


const app = express();
const logger = new Logger();

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (_req, res) => {
    res.send("Welcome to Simple Blog API, you should not be here")
});

app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT} 🚀`);
});