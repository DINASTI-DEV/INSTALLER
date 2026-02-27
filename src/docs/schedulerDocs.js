"use strict";
/**
 * @swagger
 * tags:
 *   name: SCHEDULER
 *   description: Log eksekusi scheduler dan trigger manual (Recap Daily Attendance)
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SchedulerRunLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         jobName:
 *           type: string
 *           example: "RecapDailyAttendance"
 *           description: Nama job scheduler
 *         runDate:
 *           type: string
 *           format: date
 *           example: "2025-02-25"
 *           description: Tanggal yang diproses (YYYY-MM-DD)
 *         status:
 *           type: string
 *           enum: [pending, success, failed]
 *           example: "success"
 *           description: Status eksekusi
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     SchedulerRunLogListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             totalItems:
 *               type: integer
 *               example: 15
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchedulerRunLog'
 *             totalPages:
 *               type: integer
 *               example: 2
 *             currentPage:
 *               type: integer
 *               example: 0
 *
 *     TriggerRecapResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Recap daily attendance berhasil dijalankan."
 *         data:
 *           type: object
 *           properties:
 *             recapDate:
 *               type: string
 *               format: date
 *               example: "2025-02-25"
 */
/**
 * @swagger
 * /api/v1/scheduler-runs:
 *   get:
 *     summary: Daftar semua log eksekusi scheduler
 *     description: Menampilkan history run scheduler dengan filter jobName dan status. Pagination opsional.
 *     tags: [SCHEDULER]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Halaman (zero-based)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Jumlah item per halaman
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Aktifkan limit/offset
 *       - in: query
 *         name: jobName
 *         schema:
 *           type: string
 *         description: Filter by job name (e.g. RecapDailyAttendance)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, success, failed]
 *         description: Filter by status eksekusi
 *     responses:
 *       200:
 *         description: Daftar scheduler run logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulerRunLogListResponse'
 *       401:
 *         description: Unauthorized - token tidak valid atau role bukan admin/superAdmin
 */
/**
 * @swagger
 * /api/v1/scheduler-runs/run-daily-recap:
 *   post:
 *     summary: Jalankan Recap Daily Attendance secara manual
 *     description: |
 *       Trigger manual untuk job Recap Daily Attendance (tanggal recap = kemarin).
 *       - Diizinkan jika **belum ada run** untuk hari itu, atau status **failed** / **pending** (retry).
 *       - Ditolak (400) jika untuk tanggal tersebut sudah **success**.
 *     tags: [SCHEDULER]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Recap daily attendance berhasil dijalankan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TriggerRecapResponse'
 *       400:
 *         description: Recap untuk tanggal tersebut sudah berhasil dijalankan (tidak perlu dijalankan lagi)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Recap daily attendance untuk tanggal 2025-02-25 sudah berhasil dijalankan. Tidak perlu dijalankan lagi."
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error saat menjalankan recap (server error)
 */
