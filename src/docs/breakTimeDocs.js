"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IBreakTimeCreateRequest:
 *       type: object
 *       properties:
 *         breakTimeOfficeId:
 *           type: integer
 *           example: 1
 *         breakTimeDate:
 *           type: string
 *           format: date
 *           example: "2025-02-24"
 *           description: Tanggal berlaku (YYYY-MM-DD). Opsional; default hari ini. Boleh untuk tanggal mendatang.
 *         breakTimeName:
 *           type: string
 *           maxLength: 100
 *           example: "Lunch Break"
 *         breakTimeStart:
 *           type: string
 *           example: "12:00"
 *         breakTimeEnd:
 *           type: string
 *           example: "13:00"
 *         breakTimeDuration:
 *           type: integer
 *           minimum: 0
 *           example: 60
 *       required:
 *         - breakTimeOfficeId
 *         - breakTimeName
 *         - breakTimeStart
 *         - breakTimeEnd
 *         - breakTimeDuration
 *
 *     IBreakTimeFindAllRequest:
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
 *           nullable: true
 *         pagination:
 *           type: boolean
 *           default: true
 *         officeId:
 *           type: integer
 *           nullable: true
 *
 *     IBreakTimeFindDetailRequest:
 *       type: object
 *       properties:
 *         breakTimeId:
 *           type: integer
 *           example: 1
 *       required:
 *         - breakTimeId
 *
 *     IBreakTimeRemoveRequest:
 *       type: object
 *       properties:
 *         breakTimeId:
 *           type: integer
 *           example: 1
 *       required:
 *         - breakTimeId
 */
/**
 * @swagger
 * /api/v1/break-times:
 *   post:
 *     summary: Create break time
 *     tags: [BREAK_TIMES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID for tenant context (multi-tenant)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBreakTimeCreateRequest'
 *     responses:
 *       201:
 *         description: Break time created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Office not found
 */
/**
 * @swagger
 * /api/v1/break-times:
 *   get:
 *     summary: Get list of break times
 *     tags: [BREAK_TIMES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID for tenant context (multi-tenant)
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
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           default: true
 *       - in: query
 *         name: officeId
 *         schema:
 *           type: integer
 *         description: Filter by office ID
 *     responses:
 *       200:
 *         description: List of break times
 */
/**
 * @swagger
 * /api/v1/break-times/detail/{breakTimeId}:
 *   get:
 *     summary: Get break time detail by ID
 *     tags: [BREAK_TIMES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID for tenant context (multi-tenant)
 *       - in: path
 *         name: breakTimeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Break time detail
 *       404:
 *         description: Break time not found
 */
/**
 * @swagger
 * /api/v1/break-times/{breakTimeId}:
 *   delete:
 *     summary: Delete break time by ID
 *     tags: [BREAK_TIMES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID for tenant context (multi-tenant)
 *       - in: path
 *         name: breakTimeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Break time deleted successfully
 *       404:
 *         description: Break time not found
 */
