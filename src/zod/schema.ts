import { z } from "zod";

export const createPelangganSchema = z.object({
  nama: z.string().min(1, { message: "Nama harus diisi" }),
  alamat: z.string().min(1, { message: "Alamat harus diisi" }),
  no_telp: z
    .string()
    .min(1, { message: "Nomor telepon harus diisi" })
    .max(15, { message: "Nomor telepon tidak boleh lebih dari 15 karakter" })
    .regex(/^\+62/, { message: "Nomor telepon harus dimulai dengan +62" }),
});

export const updatePelangganSchema = z.object({
  nama: z.string().min(1, { message: "Nama harus diisi" }).optional(),
  alamat: z.string().min(1, { message: "Alamat harus diisi" }).optional(),
  no_telp: z
    .string()
    .min(1, { message: "Nomor telepon harus diisi" })
    .max(15, { message: "Nomor telepon tidak boleh lebih dari 15 karakter" })
    .regex(/^\+62/, { message: "Nomor telepon harus dimulai dengan +62" })
    .optional(),
});

export const createKendaraanSchema = z.object({
  merk: z.string().min(1, { message: "Merk harus diisi" }),
  model: z.string().min(1, { message: "Model harus diisi" }),
  tahun: z.number().min(4, { message: "Tahun harus diisi" }),
  harga_sewa: z
    .number()
    .min(100000, { message: "Harga sewa harus minimal 100000" }),
  unit: z.number().min(1, { message: "Unit harus minimal 1" }),
});

export const updateKendaraanSchema = z.object({
  merk: z.string().min(1, { message: "Merk harus diisi" }).optional(),
  model: z.string().min(1, { message: "Model harus diisi" }).optional(),
  tahun: z.number().min(4, { message: "Tahun harus diisi" }).optional(),
  harga_sewa: z
    .number()
    .min(100000, { message: "Harga sewa harus minimal 100000" })
    .optional(),
  unit: z.number().min(1, { message: "Unit harus minimal 1" }).optional(),
  status: z.enum(["TERSEDIA", "HABIS"]).optional(),
});

export const createPenyewaanSchema = z.object({
  id_pelanggan: z.string().min(1, { message: "ID Pelanggan harus diisi" }),
  id_kendaraan: z.string().min(1, { message: "ID Kendaraan harus diisi" }),
  tanggal_kembali: z
    .string()
    .min(1, { message: "Tanggal kembali harus diisi" }),
  metode_pembayaran: z.enum(["CASH", "TRANSFER", "QRIS"]),
  tanggal_pembayaran: z
    .string()
    .min(1, { message: "Tanggal pembayaran harus diisi" }),
});

export const updatePenyewaanSchema = z.object({
  id_pelanggan: z
    .string()
    .min(1, { message: "ID Pelanggan harus diisi" })
    .optional(),
  id_kendaraan: z
    .string()
    .min(1, { message: "ID Kendaraan harus diisi" })
    .optional(),
  tanggal_sewa: z
    .string()
    .min(1, { message: "Tanggal sewa harus diisi" })
    .optional(),
  status: z.enum(["DISEWA", "DIKEMBALIKAN"]).optional(),
  tanggal_kembali: z
    .string()
    .min(1, { message: "Tanggal kembali harus diisi" })
    .optional(),
  metode_pembayaran: z.enum(["CASH", "TRANSFER", "QRIS"]).optional(),
  tanggal_pembayaran: z
    .string()
    .min(1, { message: "Tanggal pembayaran harus diisi" })
    .optional(),
});

export type CreatePelangganSchema = z.infer<typeof createPelangganSchema>;
export type UpdatePelangganSchema = z.infer<typeof updatePelangganSchema>;
export type CreateKendaraanSchema = z.infer<typeof createKendaraanSchema>;
export type UpdateKendaraanSchema = z.infer<typeof updateKendaraanSchema>;
export type CreatePenyewaanSchema = z.infer<typeof createPenyewaanSchema>;
export type UpdatePenyewaanSchema = z.infer<typeof updatePenyewaanSchema>;
