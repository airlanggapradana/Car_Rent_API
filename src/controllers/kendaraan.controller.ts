import { Router } from "express";
import {
  createKendaraan,
  deleteKendaraan,
  getAllKendaraan,
  getKendaraanById,
  updateKendaraan,
} from "../services/kendaraan.service";

const kendaraanRouter = Router();

kendaraanRouter.post("/", createKendaraan);
kendaraanRouter.put("/:id", updateKendaraan);
kendaraanRouter.delete("/:id", deleteKendaraan);
kendaraanRouter.get("/", getAllKendaraan);
kendaraanRouter.get("/:id", getKendaraanById);

export default kendaraanRouter;
