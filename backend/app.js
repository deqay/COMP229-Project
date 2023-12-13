const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./controllers/config");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: "https://vistara-f.onrender.com",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.use(errorMiddleware);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Visitara Website! Here you can, rate and review businesses! .",
  });
});

//server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
