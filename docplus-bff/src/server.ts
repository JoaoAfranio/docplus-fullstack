import express from "express";
import cors from "cors";
import { homeRouter } from "./routers/home-router";
import { scheduleRouter } from "./routers/schedule-router";
import { loadEnv } from "./config/envs";

const port = +process.env.PORT || 4001;

const app = express();

loadEnv();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => {
    res.send("OK!");
  })
  .use("/home", homeRouter)
  .use("/schedule", scheduleRouter);

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening on port ${port}.`);
});
