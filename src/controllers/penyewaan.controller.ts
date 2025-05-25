import { Router } from "express";
import {
  createPenyewaan,
  deletePenyewaan,
  getAllPenyewaan,
  updatePenyewaan,
} from "../services/penyewaan.service";

const penyewaanRouter = Router();

penyewaanRouter.post("/", createPenyewaan);
penyewaanRouter.put("/:id", updatePenyewaan);
penyewaanRouter.delete("/:id", deletePenyewaan);
penyewaanRouter.get("/", getAllPenyewaan);

export default penyewaanRouter;
