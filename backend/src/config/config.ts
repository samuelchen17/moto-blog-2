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
      //   authSource
    },
    url: process.env.MONGODB_URL,
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  displayPicture: {
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png",
  },
  postImage: {
    default:
      "https://www.shutterstock.com/image-photo/motorcycle-parked-alone-on-asphalt-260nw-2153911847.jpg",
  },
};
export default config;
