/**
 * @swagger
 * tags:
 *   name: REPORTS
 *   description: Report
 */

/**
 * @swagger
 * /api/v1/reports/recap-daily-attendances:
 *   get:
 *     summary: Get all daily attendance
 *     tags: [REPORTS]
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
 * /api/v1/reports/recap-daily-attendances:
 *   post:
 *     summary: Create a new position
 *     tags: [REPORTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID for tenant context (multi-tenant)
 *     responses:
 *       201:
 *         description: Position created successfully
 *       400:
 *         description: Invalid input
 */
