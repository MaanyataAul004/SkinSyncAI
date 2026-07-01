import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
app.use(
  cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
  })
  );
  

//middelwares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/ai", aiRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SkinSync app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
