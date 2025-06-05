import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { z } from "zod";
import {
  CreatePelangganSchema,
  createPelangganSchema,
  UpdatePelangganSchema,
  updatePelangganSchema,
} from "../zod/schema";

export const getAllPelanggan = async (req: Request, res: Response) => {
  try {
    // Fetch all pelanggan with penyewaan and pembayaran details
    const pelanggan = await prisma.pelanggan.findMany({
      orderBy: { nama: "desc" },
      include: {
        penyewaan: {
          include: {
            pembayaran: true,
            kendaraan_dalam_penyewaan: {
              select: {
                kendaraan: {
                  select: {
                    harga_sewa: true,
                    merk: true,
                    model: true,
                    tahun: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (pelanggan.length === 0) {
      res.status(404).send({
        message: "Tidak ada pelanggan ditemukan",
        error: "Tidak ada pelanggan ditemukan",
      });
      return;
    }
    res.status(200).send({
      message: "Berhasil mendapatkan daftar pelanggan",
      data: pelanggan,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const createPelanggan = async (req: Request, res: Response) => {
  try {
    const payload: CreatePelangganSchema = createPelangganSchema.parse(
      req.body
    );

    // Check if the phone number already exists
    const existingPelanggan = await prisma.pelanggan.findFirst({
      where: { no_telp: payload.no_telp },
    });

    if (existingPelanggan) {
      res.status(400).send({
        message: "Nomor telepon sudah terdaftar",
        error: "Nomor telepon sudah terdaftar",
      });
      return;
    }

    // Create new pelanggan
    const newPelanggan = await prisma.pelanggan.create({
      data: {
        id_pelanggan: `C-${crypto
          .randomUUID()
          .slice(0, 3)
          .toLocaleUpperCase()}`,
        nama: payload.nama,
        alamat: payload.alamat,
        no_telp: payload.no_telp,
      },
    });
    res.status(201).send({
      message: "Pelanggan berhasil dibuat",
      data: newPelanggan,
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
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const updatePelanggan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate if the ID exists
    const pelanggan = await prisma.pelanggan.findUnique({
      where: { id_pelanggan: id },
    });

    if (!pelanggan) {
      res.status(404).send({
        message: "Pelanggan tidak ditemukan",
        error: "Pelanggan tidak ditemukan",
      });
      return;
    }

    const payload: UpdatePelangganSchema = updatePelangganSchema.parse(
      req.body
    );

    const updatedPelanggan = await prisma.pelanggan.update({
      where: { id_pelanggan: pelanggan.id_pelanggan },
      data: {
        nama: payload.nama,
        alamat: payload.alamat,
        no_telp: payload.no_telp,
      },
    });
    res.status(200).send({
      message: "Pelanggan berhasil diperbarui",
      data: updatedPelanggan,
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
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const deletePelanggan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pelanggan = await prisma.pelanggan.findUnique({
      where: { id_pelanggan: id },
    });

    if (!pelanggan) {
      res.status(404).send({
        message: "Pelanggan tidak ditemukan",
        error: "Pelanggan tidak ditemukan",
      });
      return;
    }

    await prisma.pelanggan.delete({
      where: { id_pelanggan: pelanggan.id_pelanggan },
    });
    res.status(200).send({
      message: "Pelanggan berhasil dihapus",
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
