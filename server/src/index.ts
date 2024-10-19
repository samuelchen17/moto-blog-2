import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connectDB from "./database/index.database";
import { errorHandler } from "./utils/errorHandler.utils";
import router from "./router/index.router";

const app = express();
const PORT = process.env.PORT || 6060; // if env PORT undefined, default to 6060

app.use(
  cors({
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
server.listen(PORT, () => {
  console.log(`Server is running on localhost on port ${PORT}`);
});

connectDB(); // connect to DB

app.use("/", router());

app.use(errorHandler);
