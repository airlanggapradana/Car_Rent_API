import { Router } from "express";
import {
  createPelanggan,
  deletePelanggan,
  getAllPelanggan,
  updatePelanggan,
} from "../services/pelanggan.service";

const pelangganRouter = Router();

pelangganRouter.get("/", getAllPelanggan);
pelangganRouter.post("/", createPelanggan);
pelangganRouter.put("/:id", updatePelanggan);
pelangganRouter.delete("/:id", deletePelanggan);

export default pelangganRouter;
