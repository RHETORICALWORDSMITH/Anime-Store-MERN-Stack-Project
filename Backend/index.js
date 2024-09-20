import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import animeRoute from "./routes/anime.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import searchRoute from "./routes/search.route.js";
import purchaseHistoryRoute from "./routes/purchaseHistory.route.js";
import multerRoute from "./routes/multer.route.js";
import deleteRoute from "./routes/delete.route.js"
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

//connect to mongodb
const mongooseConnect = async () => {
  try {
    await mongoose.connect(`${URI}AnimeStore`);
    console.log("Connected: " + mongoose.connection.host);
  } catch (e) {
    console.log("Error connecting to MongoDB");
    console.error(e);
  }
};
mongooseConnect();
//defining routes
app.use("/anime", animeRoute);
app.use("/user", userRoute);
app.use("/", searchRoute);
app.use("/history", purchaseHistoryRoute);
app.use("/upload", multerRoute);
app.use("/delete", deleteRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
