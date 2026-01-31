/**
 * @swagger
 * components:
 *   schemas:
 *     IOfficeRequest:
 *       type: object
 *       properties:
 *         officeName:
 *           type: string
 *           example: "Toko Baju Kekinian"
 *         officeAddress:
 *           type: string
 *           example: "Jl. Jendral Sudirman No. 123"
 *         officeLongitude:
 *           type: string
 *           example: "106.8167"
 *         officeLatitude:
 *           type: string
 *           example: "-6.2145"
 *         officeMaximumDistanceAttendance:
 *          type: number
 *          example: 10
 *         officeWifiMacAddress:
 *          type: string
 *          example: "00:1A:2B:3C:4D:5E"
 *       required:
 *         - officeName
 *         - officeAddress
 *         - officeLongitude
 *         - officeLatitude
 *         - officeMaximumDistanceAttendance
 *
 *     IOfficeUpdateRequest:
 *       type: object
 *       properties:
 *         officeId:
 *           type: number
 *           example: 1
 *         officeName:
 *           type: string
 *           nullable: true
 *           example: "Toko Baju Kekinian"
 *         officeAddress:
 *           type: string
 *           example: "Jl. Jendral Sudirman No. 123"
 *         officeLongitude:
 *           type: string
 *           nullable: true
 *           example: "106.8167"
 *         officeLatitude:
 *           type: string
 *           nullable: true
 *           example: "-6.2145"
 *         officeMaximumDistanceAttendance:
 *           type: number
 *           example: 10
 *         officeWifiMacAddress:
 *           type: string
 *
 *       required:
 *         - jwtPayload
 *         - officeId
 *         - officeAddress
 *         - officeMaximumDistanceAttendance
 */

/**
 * @swagger
 * /api/v1/offices/:
 *   get:
 *     summary: Get all office
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of office
 */

/**
 * @swagger
 * /api/v1/offices/names:
 *   get:
 *     summary: Get all office names
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *     responses:
 *       200:
 *         description: List of office name
 */

/**
 * @swagger
 * /api/v1/offices/detail/{officeId}:
 *   get:
 *     summary: Get office detail by ID
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: officeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *     responses:
 *       200:
 *         description: office detail
 *       404:
 *         description: Office not found
 */

/**
 * @swagger
 * /api/v1/offices/:
 *   post:
 *     summary: Create a new office
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IOfficeRequest'
 *     responses:
 *       201:
 *         description: Office created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/offices/:
 *   patch:
 *     summary: Update a office
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IOfficeUpdateRequest'
 *     responses:
 *       200:
 *         description: Office updated successfully
 *       404:
 *         description: Office not found
 */

/**
 * @swagger
 * /api/v1/offices/{officeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: officeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *     responses:
 *       200:
 *         description: Office deleted successfully
 */

/**
 * @swagger
 * /api/v1/offices/locations/:
 *   get:
 *     summary: Get all offices
 *     tags: [OFFICES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of office
 */
