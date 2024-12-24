import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connectDB from "./database/index.database";
import { errorHandler } from "./utils/errorHandler.utils";
import router from "./router/index.router";
import config from "./config/config";

const app = express();
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(compression()); // compresses all responses
app.use(cookieParser());
app.use(bodyParser.json()); // to parse JSON-formatted request bodies
app.use(bodyParser.urlencoded({ extended: true })); // to parse URL-encoded data (from forms)

// app from const app
// create server
const server = http.createServer(app);

// listen for requests
server.listen(config.server.port, () => {
  console.log(
    `Server is running at ${config.server.host} on port ${config.server.port}`
  );
});

connectDB(); // connect to DB

// all routes
app.use("/", router());

app.use(errorHandler);
