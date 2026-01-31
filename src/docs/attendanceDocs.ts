/**
 * @swagger
 * components:
 *   schemas:
 *     IAttendanceRequest:
 *       type: object
 *       properties:
 *         attendanceScheduleId:
 *           type: number
 *           example: 1
 *         attendanceOfficeId:
 *           type: number
 *           example: 1
 *         attendancePhoto:
 *           type: string
 *           example: "https://example.com/photo.jpg"
 *         attendanceCategory:
 *           type: string
 *           enum: [checkin, checkout]
 *           example: checkin
 *         attendanceLatitude:
 *           type: string
 *           example: 37.7749
 *         attendanceLongitude:
 *          type: string
 *          example: -122.4194
 *         attendanceDistanceFromOffice:
 *          type: number
 *          example: 100
 *       required:
 *         - attendanceScheduleId
 *         - attendanceOfficeId
 *         - attendancePhoto
 *         - attendanceCategory
 *         - attendanceLatitude
 *         - attendanceLongitude
 *         - attendanceDistanceFromOffice
 */

/**
 * @swagger
 * /api/v1/attendances/:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [ATTENDANCES]
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
 *             $ref: '#/components/schemas/IAttendanceRequest'
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/attendances/last-status/detail/{scheduleId}:
 *   get:
 *     summary: Get last attendance status
 *     tags: [ATTENDANCES]
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
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */

/**
 * @swagger
 * /api/v1/attendances/last-status:
 *   get:
 *     summary: Get last attendance status
 *     tags: [ATTENDANCES]
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
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */

/**
 * @swagger
 * /api/v1/attendances/detail/{attendanceId}:
 *   get:
 *     summary: Get attendance detail by ID
 *     tags: [ATTENDANCES]
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
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */

/**
 * @swagger
 * /api/v1/attendances/:
 *   get:
 *     summary: Get all attendances
 *     tags: [ATTENDANCES]
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
 *         name: attendanceCategory
 *         schema:
 *           type: string
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
 *         description: List of attendances
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     jwtPayloadSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: "john_doe"
 *         iat:
 *           type: integer
 *           example: 1717029203
 *         exp:
 *           type: integer
 *           example: 1717032803
 *
 *     IFindOneAttendanceHistoryRequest:
 *       type: object
 *       properties:
 *         jwtPayload:
 *           $ref: '#/components/schemas/jwtPayloadSchema'
 *         attendanceHistoryId:
 *           type: number
 *           example: 1001
 *       required:
 *         - jwtPayload
 *         - attendanceHistoryId
 *
 *     IFindAllAttendanceHistoriesRequest:
 *       type: object
 *       properties:
 *         jwtPayload:
 *           $ref: '#/components/schemas/jwtPayloadSchema'
 *         page:
 *           type: integer
 *           example: 1
 *         size:
 *           type: integer
 *           example: 10
 *         search:
 *           type: string
 *           example: "checkin"
 *         pagination:
 *           type: boolean
 *           example: true
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-30T23:59:59Z"
 *         attendanceHistoryUserId:
 *           type: number
 *           nullable: true
 *           example: 101
 *         attendanceHistoryScheduleId:
 *           type: number
 *           nullable: true
 *           example: 501
 */

/**
 * @swagger
 * /api/v1/attendances/histories/detail/{attendanceHistoryId}:
 *   get:
 *     summary: Get attendance history detail by ID
 *     tags: [ATTENDANCES]
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
 *         name: attendanceHistoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance history detail
 *       404:
 *         description: Attendance history not found
 */

/**
 * @swagger
 * /api/v1/attendances/histories/:
 *   get:
 *     summary: Get all attendance histories with filters
 *     tags: [ATTENDANCES]
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
 *       - in: query
 *         name: attendanceHistoryUserId
 *         schema:
 *           type: number
 *       - in: query
 *         name: attendanceHistoryScheduleId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of attendance histories
 */
