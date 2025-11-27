import express from "express";
import uploadRoutes from "./routes/upload.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", uploadRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`API running on port ${process.env.PORT}`)
);
