import express, { Application } from "express";
import cors from "cors";
import { PORT } from "./env";
import pelangganRouter from "./controllers/pelanggan.controller";
import kendaraanRouter from "./controllers/kendaraan.controller";
import penyewaanRouter from "./controllers/penyewaan.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/pelanggan", pelangganRouter);
app.use("/api/kendaraan", kendaraanRouter);
app.use("/api/penyewaan", penyewaanRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
