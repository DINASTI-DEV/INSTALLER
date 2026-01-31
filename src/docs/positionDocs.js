"use strict";
/**
 * @swagger
 * tags:
 *   name: POSITIONS
 *   description: Master data jabatan dan gaji harian
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     IPositionRequest:
 *       type: object
 *       properties:
 *         positionName:
 *           type: string
 *           example: "Software Engineer"
 *         dailySalary:
 *           type: number
 *           format: decimal
 *           example: 250000
 *       required:
 *         - positionName
 *         - dailySalary
 *
 *     IPositionUpdateRequest:
 *       type: object
 *       properties:
 *         positionDailySalary:
 *           type: number
 *           example: 1
 *         positionName:
 *           type: string
 *           example: "Senior Software Engineer"
 *         dailySalary:
 *           type: number
 *           format: decimal
 *           example: 350000
 *       required:
 *         - positionDailySalary
 */
/**
 * @swagger
 * /api/v1/positions/:
 *   post:
 *     summary: Create a new position
 *     tags: [POSITIONS]
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
 *             $ref: '#/components/schemas/IPositionRequest'
 *     responses:
 *       201:
 *         description: Position created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/positions/:
 *   patch:
 *     summary: Update an existing position
 *     tags: [POSITIONS]
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
 *             $ref: '#/components/schemas/IPositionUpdateRequest'
 *     responses:
 *       200:
 *         description: Position updated successfully
 *       404:
 *         description: Position not found
 */
/**
 * @swagger
 * /api/v1/positions/{positionId}:
 *   delete:
 *     summary: Delete a position by ID
 *     tags: [POSITIONS]
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
 *         name: positionDailySalary
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Position deleted successfully
 *       404:
 *         description: Position not found
 */
/**
 * @swagger
 * /api/v1/positions/detail/{positionDailySalary}:
 *   get:
 *     summary: Get position detail by ID
 *     tags: [POSITIONS]
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
 *         name: positionDailySalary
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Position detail
 *       404:
 *         description: Position not found
 */
/**
 * @swagger
 * /api/v1/positions/:
 *   get:
 *     summary: Get all positions
 *     tags: [POSITIONS]
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
 *           example: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Engineer"
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: List of positions
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     IAssignUserPositionRequest:
 *       type: object
 *       properties:
 *         positionId:
 *           type: number
 *           example: 2
 *         userIds:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 3, 5, 7]
 *       required:
 *         - positionId
 *         - userIds
 */
/**
 * @swagger
 * /api/v1/positions/assigns:
 *   post:
 *     summary: Assign position to multiple users
 *     tags: [POSITIONS]
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
 *             $ref: '#/components/schemas/IAssignUserPositionRequest'
 *     responses:
 *       200:
 *         description: User position assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Success
 *               data:
 *                 positionId: 2
 *                 totalUserUpdated: 4
 *       400:
 *         description: Validation error
 *       404:
 *         description: Position not found
 *       500:
 *         description: Internal server error
 */
