import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { z } from "zod";
import {
  CreatePenyewaanSchema,
  createPenyewaanSchema,
  UpdatePenyewaanSchema,
  updatePenyewaanSchema,
} from "../zod/schema";

export const createPenyewaan = async (req: Request, res: Response) => {
  try {
    const payload: CreatePenyewaanSchema = createPenyewaanSchema.parse(
      req.body
    );

    // cari harga sewa berdasarkan id_kendaraan
    const kendaraan = await prisma.kendaraan.findUnique({
      where: {
        id_kendaraan: payload.id_kendaraan,
      },
    });

    if (!kendaraan) {
      res.status(404).send({
        message: "Kendaraan tidak ditemukan",
      });
      return;
    }

    const result = await prisma.$transaction(async (tx) => {
      const penyewaan = await tx.penyewaan.create({
        data: {
          id_pelanggan: payload.id_pelanggan,
          tanggal_sewa: new Date(payload.tanggal_sewa),
          tanggal_kembali: new Date(payload.tanggal_kembali),
          status: "DISEWA",
          kendaraan_dalam_penyewaan: {
            create: {
              id_kendaraan: payload.id_kendaraan,
            },
          },
          pembayaran: {
            create: {
              jumlah: kendaraan.harga_sewa,
              metode_pembayaran: payload.metode_pembayaran,
              tanggal: new Date(payload.tanggal_pembayaran),
            },
          },
        },
        include: {
          kendaraan_dalam_penyewaan: true,
          pembayaran: true,
        },
      });

      await tx.kendaraan.update({
        where: {
          id_kendaraan: payload.id_kendaraan,
        },
        data: {
          unit: kendaraan.unit - 1,
          status: kendaraan.unit - 1 > 0 ? "TERSEDIA" : "HABIS",
        },
      });

      return penyewaan;
    });

    res.status(201).send({
      message: "Penyewaan berhasil dibuat",
      data: result,
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({
        erros: error.errors,
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

export const updatePenyewaan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload: UpdatePenyewaanSchema = updatePenyewaanSchema.parse(
      req.body
    );

    const existingPenyewaan = await prisma.penyewaan.findUnique({
      where: { id_penyewaan: id },
      include: {
        kendaraan_dalam_penyewaan: {
          include: {
            kendaraan: true,
          },
        },
      },
    });

    if (!existingPenyewaan) {
      res.status(404).send({ message: "Penyewaan tidak ditemukan" });
      return;
    }

    const updatedPenyewaan = await prisma.$transaction(async (tx) => {
      await tx.penyewaan.update({
        where: { id_penyewaan: existingPenyewaan.id_penyewaan },
        data: {
          id_pelanggan: payload.id_pelanggan,
          tanggal_sewa: payload.tanggal_sewa,
          tanggal_kembali: new Date(),
          status: payload.status,
        },
      });

      await tx.pembayaran.update({
        where: { id_penyewaan: existingPenyewaan.id_penyewaan },
        data: {
          metode_pembayaran: payload.metode_pembayaran,
          tanggal: payload.tanggal_pembayaran,
        },
      });

      await tx.kendaraan.update({
        where: {
          id_kendaraan:
            existingPenyewaan.kendaraan_dalam_penyewaan[0].id_kendaraan,
        },
        data: {
          unit:
            payload.status === "DIKEMBALIKAN"
              ? existingPenyewaan.kendaraan_dalam_penyewaan[0].kendaraan.unit +
                1
              : existingPenyewaan.kendaraan_dalam_penyewaan[0].kendaraan.unit,
          status:
            payload.status === "DIKEMBALIKAN" &&
            existingPenyewaan.kendaraan_dalam_penyewaan[0].kendaraan.unit + 1 >
              0
              ? "TERSEDIA"
              : existingPenyewaan.kendaraan_dalam_penyewaan[0].kendaraan.status,
        },
      });
    });
    res.status(200).send({
      message: "Penyewaan berhasil diperbarui",
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

export const deletePenyewaan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Temukan data penyewaan berdasarkan id
    const existingPenyewaan = await prisma.penyewaan.findUnique({
      where: { id_penyewaan: id },
    });
    if (!existingPenyewaan) {
      res.status(404).send({ message: "Penyewaan tidak ditemukan" });
      return;
    }
    // Hapus data penyewaan
    await prisma.penyewaan.delete({
      where: { id_penyewaan: id },
    });
    res.status(200).send({
      message: "Penyewaan berhasil dihapus",
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllPenyewaan = async (req: Request, res: Response) => {
  try {
    const penyewaan = await prisma.penyewaan.findMany({
      include: {
        pelanggan: true,
        kendaraan_dalam_penyewaan: {
          include: {
            kendaraan: true,
          },
        },
        pembayaran: true,
      },
    });
    if (penyewaan.length === 0) {
      res.status(404).send({ message: "Tidak ada data penyewaan" });
      return;
    }
    res.status(200).send({
      message: "Data penyewaan berhasil diambil",
      data: penyewaan,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
