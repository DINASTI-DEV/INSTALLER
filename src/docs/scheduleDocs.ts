/**
 * @swagger
 * components:
 *   schemas:
 *     IScheduleRequest:
 *       type: object
 *       properties:
 *         scheduleName:
 *           type: string
 *           example: "Meeting with client"
 *         scheduleOfficeId:
 *           type: number
 *           example: 1
 *         scheduleStart:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T09:00:00Z"
 *         scheduleEnd:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T10:00:00Z"
 *       required:
 *         - jwtPayload
 *         - scheduleName
 *         - scheduleOfficeId
 *         - scheduleStartDate
 *         - scheduleEndDate
 *
 *     IScheduleUpdateRequest:
 *       type: object
 *       properties:
 *         scheduleId:
 *           type: number
 *           example: 1
 *         scheduleStart:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "09:00"
 *         scheduleEnd:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "17:00"
 *         scheduleCategory:
 *           type: string
 *           enum: [regular, libur]
 *           default: regular
 *       required:
 *         - scheduleId
 */

/**
 * @swagger
 * /api/v1/schedules/:
 *   post:
 *     summary: Create a new schedule
 *     tags: [SCHEDULES]
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
 *             $ref: '#/components/schemas/IScheduleRequest'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/schedules/:
 *   patch:
 *     summary: Update an existing schedule
 *     tags: [SCHEDULES]
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
 *             $ref: '#/components/schemas/IScheduleUpdateRequest'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /api/v1/schedules/{scheduleId}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags: [SCHEDULES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /api/v1/schedules/detail/{scheduleId}:
 *   get:
 *     summary: Get schedule detail by ID
 *     tags: [SCHEDULES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule detail
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /api/v1/schedules/:
 *   get:
 *     summary: Get all schedules
 *     tags: [SCHEDULES]
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
 *         name: scheduleStatus
 *         schema:
 *           type: string
 *           enum: [waiting, progress, swap, done]
 *           nullable: true
 *       - in: query
 *         name: scheduleStatusNot
 *         schema:
 *           type: string
 *           enum: [waiting, progress, swap, done]
 *           nullable: true
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: List of schedules
 */

/**
 * @swagger
 * /api/v1/schedules/offices/{officeId}:
 *   get:
 *     summary: find all schedules by office
 *     tags: [SCHEDULES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID fortenant contex (multi-tenant)
 *       - in: path
 *         name: officeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Office created successfully
 *       400:
 *         description: Invalid input
 */
