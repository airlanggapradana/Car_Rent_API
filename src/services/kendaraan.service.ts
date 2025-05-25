import prisma from "../../prisma/prisma";
import { Request, Response } from "express";
import { z } from "zod";
import {
  CreateKendaraanSchema,
  createKendaraanSchema,
  UpdateKendaraanSchema,
  updateKendaraanSchema,
} from "../zod/schema";

export const createKendaraan = async (req: Request, res: Response) => {
  try {
    const payload: CreateKendaraanSchema = createKendaraanSchema.parse(
      req.body
    );
    const kendaraan = await prisma.kendaraan.create({
      data: {
        id_kendaraan: `V-${crypto
          .randomUUID()
          .slice(0, 3)
          .toLocaleUpperCase()}`,
        merk: payload.merk,
        model: payload.model,
        tahun: payload.tahun,
        harga_sewa: payload.harga_sewa,
        unit: payload.unit,
        status: payload.status,
      },
    });
    res.status(201).send({
      message: "Kendaraan berhasil dibuat",
      data: kendaraan,
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({
        errors: error.errors,
        message: error.errors.map((err) => err.message),
      });
      return;
    }
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const updateKendaraan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload: UpdateKendaraanSchema = updateKendaraanSchema.parse(
      req.body
    );

    const kendaraan = await prisma.kendaraan.findUnique({
      where: { id_kendaraan: id },
    });

    if (!kendaraan) {
      res.status(404).send({
        message: "Kendaraan tidak ditemukan",
      });
      return;
    }

    const updatedKendaraan = await prisma.kendaraan.update({
      where: { id_kendaraan: kendaraan.id_kendaraan },
      data: {
        merk: payload.merk,
        model: payload.model,
        tahun: payload.tahun,
        harga_sewa: payload.harga_sewa,
        unit: payload.unit,
        status: payload.status,
      },
    });
    res.status(200).send({
      message: "Kendaraan berhasil diperbarui",
      data: updatedKendaraan,
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({
        errors: error.errors,
        message: error.errors.map((err) => err.message),
      });
      return;
    }
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const deleteKendaraan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kendaraan = await prisma.kendaraan.findUnique({
      where: { id_kendaraan: id },
    });
    if (!kendaraan) {
      res.status(404).send({
        message: "Kendaraan tidak ditemukan",
      });
      return;
    }
    await prisma.kendaraan.delete({
      where: { id_kendaraan: kendaraan.id_kendaraan },
    });
    res.status(200).send({
      message: "Kendaraan berhasil dihapus",
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const getAllKendaraan = async (req: Request, res: Response) => {
  try {
    const kendaraan = await prisma.kendaraan.findMany({
      include: {
        kendaraan_dalam_penyewaan: {
          select: {
            penyewaan: {
              include: {
                pelanggan: true,
                pembayaran: true,
              },
            },
          },
        },
      },
    });
    res.status(200).send({
      message: "Berhasil mendapatkan semua kendaraan",
      data: kendaraan,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const getKendaraanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kendaraan = await prisma.kendaraan.findUnique({
      where: { id_kendaraan: id },
      include: {
        kendaraan_dalam_penyewaan: {
          select: {
            penyewaan: {
              include: {
                pelanggan: true,
                pembayaran: true,
              },
            },
          },
        },
      },
    });
    if (!kendaraan) {
      res.status(404).send({
        message: "Kendaraan tidak ditemukan",
      });
      return;
    }
    res.status(200).send({
      message: "Berhasil mendapatkan kendaraan",
      data: kendaraan,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
