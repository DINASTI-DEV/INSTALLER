-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 27, 2026 at 08:07 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fresh-absensi-v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `attendance_id` int UNSIGNED NOT NULL,
  `attendance_company_id` int UNSIGNED NOT NULL,
  `attendance_schedule_id` int NOT NULL,
  `attendance_user_id` int NOT NULL,
  `attendance_office_id` int NOT NULL,
  `attendance_time` datetime NOT NULL,
  `attendance_category` enum('checkin','checkout','breakin','breakout') NOT NULL,
  `attendance_photo` text,
  `attendance_latitude` varchar(255) DEFAULT NULL,
  `attendance_longitude` varchar(255) DEFAULT NULL,
  `attendance_distance_from_office` int DEFAULT NULL,
  `attendance_face_id` text,
  `attendance_fingerprint_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `break_times`
--

CREATE TABLE `break_times` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `break_time_id` int UNSIGNED NOT NULL,
  `break_time_company_id` int UNSIGNED NOT NULL,
  `break_time_office_id` int UNSIGNED NOT NULL,
  `break_time_schedule_id` int UNSIGNED NOT NULL,
  `break_time_category` enum('start','end') NOT NULL DEFAULT 'start',
  `break_time_start` varchar(255) NOT NULL,
  `break_time_end` varchar(255) NOT NULL,
  `break_time_duration` int NOT NULL,
  `break_time_date` date NOT NULL COMMENT 'Tanggal berlaku break time (hanya hari ini)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `company_id` int UNSIGNED NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_industry` varchar(100) DEFAULT NULL,
  `company_invite_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `company_id`, `company_name`, `company_industry`, `company_invite_code`) VALUES
('2026-02-19 21:34:22', NULL, NULL, 0, 1, 'Fresh Absensi', 'SaaS', 'ZT68U8');

-- --------------------------------------------------------

--
-- Table structure for table `daily_attendance_summaries`
--

CREATE TABLE `daily_attendance_summaries` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `summary_id` int UNSIGNED NOT NULL,
  `summary_company_id` int UNSIGNED NOT NULL,
  `summary_user_id` int UNSIGNED NOT NULL,
  `summary_schedule_id` int UNSIGNED NOT NULL,
  `summary_date` date NOT NULL,
  `checkin_time` datetime DEFAULT NULL,
  `break_time` datetime DEFAULT NULL,
  `checkout_time` datetime DEFAULT NULL,
  `is_valid_attendance` tinyint(1) NOT NULL DEFAULT '0',
  `daily_salary` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total_work_hours` decimal(5,2) DEFAULT '0.00',
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `daily_attendance_summaries`
--

INSERT INTO `daily_attendance_summaries` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `summary_id`, `summary_company_id`, `summary_user_id`, `summary_schedule_id`, `summary_date`, `checkin_time`, `break_time`, `checkout_time`, `is_valid_attendance`, `daily_salary`, `total_work_hours`, `description`) VALUES
('2026-02-25 08:50:00', NULL, '2026-02-25 08:50:00', 0, 1, 1, 14, 1, '2026-02-24', '2026-02-24 06:49:52', NULL, NULL, 0, 0.00, 0.00, 'Tidak melakukan break-in; Tidak melakukan break-out; Tidak melakukan checkout'),
('2026-02-25 08:50:00', NULL, '2026-02-25 08:50:00', 0, 2, 1, 14, 3, '2026-02-24', '2026-02-24 07:14:06', '2026-02-24 07:20:04', '2026-02-24 07:29:57', 0, 10000.00, 0.26, 'Break-in di luar jam istirahat; Break-out di luar jam istirahat; Checkout lebih awal dari jam pulang'),
('2026-02-25 08:50:00', NULL, '2026-02-25 08:50:00', 0, 3, 1, 13, 3, '2026-02-24', '2026-02-24 07:42:33', '2026-02-24 07:51:23', NULL, 0, 0.00, 0.00, 'Tidak melakukan break-out; Tidak melakukan checkout'),
('2026-02-25 08:51:00', NULL, '2026-02-25 08:51:00', 0, 4, 1, 14, 1, '2026-02-24', '2026-02-24 06:49:52', NULL, NULL, 0, 0.00, 0.00, 'Tidak melakukan break-in; Tidak melakukan break-out; Tidak melakukan checkout'),
('2026-02-25 08:51:00', NULL, '2026-02-25 08:51:00', 0, 5, 1, 14, 3, '2026-02-24', '2026-02-24 07:14:06', '2026-02-24 07:20:04', '2026-02-24 07:29:57', 0, 0.00, 0.26, 'Break-in di luar jam istirahat; Break-out di luar jam istirahat; Checkout lebih awal dari jam pulang'),
('2026-02-25 08:51:00', NULL, '2026-02-25 08:51:00', 0, 6, 1, 13, 3, '2026-02-24', '2026-02-24 07:42:33', '2026-02-24 07:51:23', NULL, 0, 0.00, 0.00, 'Tidak melakukan break-out; Tidak melakukan checkout');

-- --------------------------------------------------------

--
-- Table structure for table `memberships`
--

CREATE TABLE `memberships` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `membership_id` int UNSIGNED NOT NULL,
  `membership_user_id` int UNSIGNED NOT NULL,
  `membership_company_id` int UNSIGNED NOT NULL,
  `membership_role` enum('company','employee') DEFAULT NULL,
  `membership_status` enum('active','deactivate','pending','rejected') DEFAULT 'active',
  `membership_office_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `memberships`
--

INSERT INTO `memberships` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `membership_id`, `membership_user_id`, `membership_company_id`, `membership_role`, `membership_status`, `membership_office_id`) VALUES
('2026-02-19 21:34:22', NULL, NULL, 0, 1, 1, 1, 'company', 'active', NULL),
('2026-02-19 21:55:47', NULL, NULL, 0, 2, 2, 1, 'employee', 'active', NULL),
('2026-02-27 06:41:01', NULL, NULL, 0, 18, 22, 1, 'company', 'active', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `office_id` int UNSIGNED NOT NULL,
  `office_company_id` int UNSIGNED NOT NULL,
  `office_name` varchar(100) NOT NULL,
  `office_address` varchar(100) NOT NULL,
  `office_longitude` varchar(100) NOT NULL,
  `office_latitude` varchar(100) NOT NULL,
  `office_maximum_distance_attendance` int UNSIGNED NOT NULL DEFAULT '1000',
  `office_wifi_mac_address` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `office_id`, `office_company_id`, `office_name`, `office_address`, `office_longitude`, `office_latitude`, `office_maximum_distance_attendance`, `office_wifi_mac_address`) VALUES
('2026-02-19 21:35:12', NULL, NULL, 0, 1, 1, 'Toko Baju Kekinian', 'Jl. Jendral Sudirman No. 123', '105.34932219987422', '-5.313826776525405', 10, '00:1A:2B:3C:4D:5E'),
('2026-02-24 08:36:59', NULL, NULL, 0, 2, 1, 'Fresh Abseni', 'Jl', '105.2580', '-5.4287', 50, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `position_id` int UNSIGNED NOT NULL,
  `position_company_id` int UNSIGNED NOT NULL,
  `position_name` varchar(100) NOT NULL,
  `position_hourly_salary` decimal(12,2) NOT NULL COMMENT 'Gaji per jam'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scheduler_run_logs`
--

CREATE TABLE `scheduler_run_logs` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `id` int UNSIGNED NOT NULL,
  `job_name` varchar(100) NOT NULL COMMENT 'Nama job scheduler, e.g. RecapDailyAttendance',
  `run_date` date NOT NULL COMMENT 'Tanggal yang diproses (YYYY-MM-DD). Satu job hanya boleh jalan sekali per run_date.',
  `status` enum('pending','success','failed') DEFAULT 'pending' COMMENT 'Status eksekusi: pending, success, atau failed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `scheduler_run_logs`
--

INSERT INTO `scheduler_run_logs` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `id`, `job_name`, `run_date`, `status`) VALUES
('2026-02-27 14:07:06', NULL, '2026-02-27 14:07:06', 0, 1, 'RecapDailyAttendance', '2026-02-26', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `schedule_id` int UNSIGNED NOT NULL,
  `schedule_company_id` int UNSIGNED NOT NULL,
  `schedule_name` varchar(100) NOT NULL,
  `schedule_office_id` int UNSIGNED NOT NULL,
  `schedule_start` varchar(255) DEFAULT NULL,
  `schedule_end` varchar(255) DEFAULT NULL,
  `schedule_break_start` varchar(255) DEFAULT NULL,
  `schedule_break_end` varchar(255) DEFAULT NULL,
  `schedule_category` enum('regular','libur') DEFAULT 'regular',
  `schedule_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `schedule_id`, `schedule_company_id`, `schedule_name`, `schedule_office_id`, `schedule_start`, `schedule_end`, `schedule_break_start`, `schedule_break_end`, `schedule_category`, `schedule_order`) VALUES
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 1, 1, 'Minggu', 1, '09:00', '17:00', '12:00', '13:00', 'libur', 0),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 2, 1, 'Senin', 1, '09:00', '17:00', '12:00', '13:00', 'regular', 1),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 3, 1, 'Selasa', 1, '09:00', '17:00', '12:00', '13:00', 'regular', 2),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 4, 1, 'Rabu', 1, '09:00', '17:00', '12:00', '13:00', 'regular', 3),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 5, 1, 'Kamis', 1, '09:00', '17:00', '12:00', '13:00', 'regular', 4),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 6, 1, 'Jumat', 1, '09:00', '17:00', '12:00', '13:00', 'regular', 5),
('2026-02-19 21:35:12', NULL, '2026-02-19 21:35:12', 0, 7, 1, 'Sabtu', 1, '09:00', '17:00', '12:00', '13:00', 'libur', 6),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 8, 1, 'Minggu', 2, '09:00', '17:00', '12:00', '13:00', 'libur', 0),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 9, 1, 'Senin', 2, '09:00', '17:00', '12:00', '13:00', 'regular', 1),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 10, 1, 'Selasa', 2, '09:00', '17:00', '12:00', '13:00', 'regular', 2),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 11, 1, 'Rabu', 2, '09:00', '17:00', '12:00', '13:00', 'regular', 3),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 12, 1, 'Kamis', 2, '09:00', '17:00', '12:00', '13:00', 'regular', 4),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 13, 1, 'Jumat', 2, '09:00', '17:00', '12:00', '13:00', 'regular', 5),
('2026-02-24 08:36:59', NULL, '2026-02-24 08:36:59', 0, 14, 1, 'Sabtu', 2, '09:00', '17:00', '12:00', '13:00', 'libur', 6);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('0_positionMigration.js'),
('1_usersMigration.js'),
('2_companyMigration.js'),
('3_officeMigration.js'),
('4_membershipMigration.js'),
('5_scheduleMigration.js'),
('6_attendanceMigration.js'),
('7_dailyAttendanceSummaries.js'),
('8_breakTimeMigration.js'),
('9_schedulerRunLogMigration.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `user_id` int UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_whatsapp_number` varchar(255) NOT NULL,
  `user_role` enum('admin','superAdmin','user') NOT NULL DEFAULT 'user',
  `user_device_id` varchar(255) DEFAULT '_',
  `user_onboarding_status` enum('waiting','completed') DEFAULT 'waiting',
  `user_position_id` int UNSIGNED DEFAULT NULL,
  `user_face_id` text,
  `user_fingerprint_id` varchar(255) DEFAULT NULL,
  `user_fingerprint_device_id` text,
  `user_fingerprint_device_name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`created_at`, `deleted_at`, `updated_at`, `deleted`, `user_id`, `user_name`, `user_password`, `user_whatsapp_number`, `user_role`, `user_device_id`, `user_onboarding_status`, `user_position_id`, `user_face_id`, `user_fingerprint_id`, `user_fingerprint_device_id`, `user_fingerprint_device_name`) VALUES
('2026-02-19 21:34:22', NULL, '2026-02-24 08:36:59', 0, 1, 'John Doe', '6c18398bb71db30c63a90b5b3ff1aba06e3477f2', '6281234567890', 'admin', '_', 'completed', NULL, NULL, NULL, NULL, NULL),
('2026-02-19 21:55:47', NULL, '2026-02-20 15:47:20', 0, 2, 'Dearmant', 'b0e2cb911385fddddaa90f4733dafd347b86d9d5', '6283168421426', 'user', '_', 'waiting', 1, NULL, NULL, NULL, NULL),
('2026-02-27 06:41:01', NULL, '2026-02-27 14:04:46', 0, 22, 'admin22', '6c18398bb71db30c63a90b5b3ff1aba06e3477f2', '62812345678922', 'admin', '_', 'waiting', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `break_times`
--
ALTER TABLE `break_times`
  ADD PRIMARY KEY (`break_time_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `company_invite_code` (`company_invite_code`);

--
-- Indexes for table `daily_attendance_summaries`
--
ALTER TABLE `daily_attendance_summaries`
  ADD PRIMARY KEY (`summary_id`);

--
-- Indexes for table `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`membership_id`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`office_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `scheduler_run_logs`
--
ALTER TABLE `scheduler_run_logs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `scheduler_run_logs_job_run_date_unique` (`job_name`,`run_date`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_office_id` (`schedule_office_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_whatsapp_number` (`user_whatsapp_number`),
  ADD UNIQUE KEY `user_fingerprint_id` (`user_fingerprint_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `break_times`
--
ALTER TABLE `break_times`
  MODIFY `break_time_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `daily_attendance_summaries`
--
ALTER TABLE `daily_attendance_summaries`
  MODIFY `summary_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `memberships`
--
ALTER TABLE `memberships`
  MODIFY `membership_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `office_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scheduler_run_logs`
--
ALTER TABLE `scheduler_run_logs`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`schedule_office_id`) REFERENCES `offices` (`office_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
