const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught Exception(i.e Something is not defined)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the Server due to Uncaught Exception`);
  process.exit(1);
});

//config deotenv help to Loads .env file contents into process.env.
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//listening to a new server using PORT no. present at config.ENV
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection (i.e Mongo Parse Error,Connection Error)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the Server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
