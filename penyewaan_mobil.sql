-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 05, 2025 at 04:37 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `penyewaan_mobil`
--

-- --------------------------------------------------------

--
-- Table structure for table `kendaraan`
--

CREATE TABLE `kendaraan` (
  `id_kendaraan` varchar(191) NOT NULL,
  `merk` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `tahun` year NOT NULL,
  `harga_sewa` decimal(10,2) NOT NULL,
  `unit` int NOT NULL,
  `status` enum('TERSEDIA','HABIS') NOT NULL DEFAULT 'TERSEDIA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kendaraan`
--

INSERT INTO `kendaraan` (`id_kendaraan`, `merk`, `model`, `tahun`, `harga_sewa`, `unit`, `status`) VALUES
('V-0D2', 'Toyota', 'Innova Reborn', '2023', 450000.00, 2, 'TERSEDIA'),
('V-3AE', 'Honda', 'HRV', '2022', 300000.00, 5, 'TERSEDIA'),
('V-472', 'Honda', 'CRV', '2023', 475000.00, 3, 'TERSEDIA'),
('V-563', 'Toyota', 'Innova Zenix', '2023', 550000.00, 5, 'TERSEDIA'),
('V-8D9', 'Hyundai', 'Palisade', '2021', 1250000.00, 2, 'TERSEDIA'),
('V-B8F', 'Hyundai', 'Santa Fe', '2022', 300000.00, 5, 'TERSEDIA'),
('V-C89', 'Hyundai', 'Creta', '2021', 250000.00, 7, 'TERSEDIA');

-- --------------------------------------------------------

--
-- Table structure for table `kendaraan_dalam_penyewaan`
--

CREATE TABLE `kendaraan_dalam_penyewaan` (
  `id_penyewaan` varchar(191) NOT NULL,
  `id_kendaraan` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kendaraan_dalam_penyewaan`
--

INSERT INTO `kendaraan_dalam_penyewaan` (`id_penyewaan`, `id_kendaraan`) VALUES
('R-E17', 'V-0D2'),
('R-6C5', 'V-8D9'),
('R-3A2', 'V-B8F'),
('R-073', 'V-C89');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` varchar(191) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama`, `alamat`, `no_telp`) VALUES
('C-072', 'Chandra', 'Sukoharjo, Jawa Tengah', '+628120028321'),
('C-14B', 'Rangga', 'Kerten, Laweyan, Surakarta', '+6281227151326'),
('C-744', 'Johan', 'Manahan, Gremet, Surakarta', '+62812736321'),
('C-AE4', 'Farid Ahmad', 'Kentingan, Surakarta', '+620148989222');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` varchar(191) NOT NULL,
  `id_penyewaan` varchar(191) NOT NULL,
  `jumlah` decimal(10,2) DEFAULT NULL,
  `metode_pembayaran` enum('CASH','TRANSFER','QRIS') DEFAULT NULL,
  `tanggal` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_penyewaan`, `jumlah`, `metode_pembayaran`, `tanggal`) VALUES
('PAY-605', 'R-6C5', 5000000.00, 'TRANSFER', '2025-05-27'),
('PAY-96C', 'R-073', 1250000.00, 'CASH', '2025-05-25'),
('PAY-B33', 'R-E17', 2700000.00, 'CASH', '2025-05-30'),
('PAY-FAD', 'R-3A2', 900000.00, 'QRIS', '2025-05-30');

-- --------------------------------------------------------

--
-- Table structure for table `penyewaan`
--

CREATE TABLE `penyewaan` (
  `id_penyewaan` varchar(191) NOT NULL,
  `id_pelanggan` varchar(191) NOT NULL,
  `tanggal_sewa` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `status` enum('DISEWA','DIKEMBALIKAN') NOT NULL DEFAULT 'DISEWA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `penyewaan`
--

INSERT INTO `penyewaan` (`id_penyewaan`, `id_pelanggan`, `tanggal_sewa`, `tanggal_kembali`, `status`) VALUES
('R-073', 'C-072', '2025-05-25', '2025-05-30', 'DIKEMBALIKAN'),
('R-3A2', 'C-744', '2025-05-30', '2025-06-02', 'DIKEMBALIKAN'),
('R-6C5', 'C-14B', '2025-05-27', '2025-05-31', 'DIKEMBALIKAN'),
('R-E17', 'C-744', '2025-05-30', '2025-06-05', 'DISEWA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD PRIMARY KEY (`id_kendaraan`);

--
-- Indexes for table `kendaraan_dalam_penyewaan`
--
ALTER TABLE `kendaraan_dalam_penyewaan`
  ADD PRIMARY KEY (`id_penyewaan`,`id_kendaraan`),
  ADD KEY `kendaraan_dalam_penyewaan_ibfk_2` (`id_kendaraan`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD UNIQUE KEY `id_penyewaan` (`id_penyewaan`);

--
-- Indexes for table `penyewaan`
--
ALTER TABLE `penyewaan`
  ADD PRIMARY KEY (`id_penyewaan`),
  ADD KEY `penyewaan_ibfk_1` (`id_pelanggan`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kendaraan_dalam_penyewaan`
--
ALTER TABLE `kendaraan_dalam_penyewaan`
  ADD CONSTRAINT `kendaraan_dalam_penyewaan_ibfk_1` FOREIGN KEY (`id_penyewaan`) REFERENCES `penyewaan` (`id_penyewaan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kendaraan_dalam_penyewaan_ibfk_2` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_penyewaan`) REFERENCES `penyewaan` (`id_penyewaan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penyewaan`
--
ALTER TABLE `penyewaan`
  ADD CONSTRAINT `penyewaan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
