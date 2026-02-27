"use strict";
/**
 * @swagger
 * tags:
 *   name: ADMIN
 *   description: Kelola user dengan role admin dan superAdmin
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     IAdminUserCreateRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Admin Baru"
 *         userWhatsappNumber:
 *           type: string
 *           example: "6281234567890"
 *         userPassword:
 *           type: string
 *           minLength: 6
 *           example: "password123"
 *       required:
 *         - userName
 *         - userWhatsappNumber
 *         - userPassword
 *
 *     IAdminUserUpdateRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         userName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Admin Updated"
 *         userWhatsappNumber:
 *           type: string
 *           example: "6289876543210"
 *         userPassword:
 *           type: string
 *           minLength: 6
 *           description: Kosongkan jika tidak ingin mengubah password
 *       required:
 *         - userId
 *
 *     IAdminUserFindAllQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         size:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         search:
 *           type: string
 *           description: Cari berdasarkan nama atau nomor WhatsApp
 *         pagination:
 *           type: boolean
 *           default: true
 */
/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Ambil semua user dengan role admin dan superAdmin
 *     tags: [ADMIN]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Cari berdasarkan userName atau userWhatsappNumber
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           default: true
 *     responses:
 *       200:
 *         description: Daftar admin/superAdmin user (tanpa userPassword)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: integer
 *                           userName:
 *                             type: string
 *                           userWhatsappNumber:
 *                             type: string
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       401:
 *         description: Unauthorized - token tidak valid atau role bukan admin/superAdmin
 */
/**
 * @swagger
 * /api/v1/admin/users:
 *   post:
 *     summary: Buat user admin atau superAdmin baru
 *     tags: [ADMIN]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAdminUserCreateRequest'
 *     responses:
 *       201:
 *         description: Admin user berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Admin user created successfully"
 *       400:
 *         description: Nomor WhatsApp sudah terdaftar atau validasi gagal
 *       401:
 *         description: Unauthorized - hanya admin/superAdmin
 */
/**
 * @swagger
 * /api/v1/admin/users/:
 *   patch:
 *     summary: Update data admin/superAdmin user
 *     tags: [ADMIN]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang akan di-update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAdminUserUpdateRequest'
 *       description: Semua field opsional; hanya field yang dikirim yang di-update
 *     responses:
 *       200:
 *         description: Admin user berhasil di-update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Admin user updated successfully"
 *       400:
 *         description: Nomor WhatsApp sudah dipakai user lain
 *       404:
 *         description: Admin user tidak ditemukan (bukan role admin/superAdmin atau sudah dihapus)
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/admin/users/{userId}:
 *   delete:
 *     summary: Hapus admin/superAdmin user (soft delete)
 *     tags: [ADMIN]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang akan dihapus
 *     responses:
 *       200:
 *         description: Admin user berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Admin user deleted successfully"
 *       400:
 *         description: Tidak dapat menghapus akun sendiri
 *       404:
 *         description: Admin user tidak ditemukan
 *       401:
 *         description: Unauthorized
 */
