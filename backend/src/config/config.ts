import dotenv from "dotenv";

dotenv.config();

const config = {
  mongo: {
    options: {
      //   socketTimeoutMS: 30000, // Timeout after 30 seconds of inactivity
      connectTimeoutMS: 10000, // Timeout after 10 seconds
      maxPoolSize: 50, // Maximum of 50 connections in the connection pool
      autoIndex: false, // Don't automatically build indexes, useful for production
      retryWrites: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      //   authSource
    },
    url: process.env.MONGODB_URL,
  },
  server: {
    host: "localhost",
    port: 3000,
  },
};
export default config;
