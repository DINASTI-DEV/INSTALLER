/**
 * @swagger
 * tags:
 *   name: FACE
 *   description: Face Recognition & Attendance
 */

/**
 * @swagger
 * /api/v1/face-recognitions/face-id:
 *   get:
 *     summary: Register employee face
 *     tags: [FACE]
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
 *       200:
 *         description: Face registered successfully
 *       400:
 *         description: Image is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/face-recognitions/registers:
 *   post:
 *     summary: Register employee face
 *     tags: [FACE]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - image
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Face registered successfully
 *       400:
 *         description: Image is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/face-recognitions/compares:
 *   post:
 *     summary: Employee compares using face recognition
 *     tags: [FACE]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Face recognized and attendance recorded
 *       404:
 *         description: Face not recognized
 *       400:
 *         description: Image is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
