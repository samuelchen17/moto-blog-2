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

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    // origin: config.frontendUrl,
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.FRONTEND_URL];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  })
);

// enable pre-flight across-the-board
app.options("*", cors());

// app.use((req, res, next) => {
//   console.log("Request Origin:", req.headers.origin);
//   console.log("Request Headers:", req.headers);
//   next();
// });

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
