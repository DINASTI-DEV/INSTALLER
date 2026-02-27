"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IFindAllEmployeeRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 0
 *         size:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *           example: 10
 *         userRole:
 *           type: string
 *           nullable: true
 *           example: "employee"
 *         search:
 *           type: string
 *           nullable: true
 *           example: "John"
 *         pagination:
 *           type: boolean
 *           default: true
 *           example: true
 *         employeeId:
 *           type: string
 *           nullable: true
 *           example: "EMP-001"
 *
 *     IFindDetailEmployeeRequest:
 *       type: object
 *       properties:
 *         employeeId:
 *           type: string
 *           example: "EMP-001"
 *       required:
 *         - employeeId
 *
 *     IEmployeeUpdateRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           example: 1
 *         userWhatsappNumber:
 *           type: string
 *           example: "6284455334434"
 *         userDeviceId:
 *           type: string
 *           example: "2131231233112"
 *       required:
 *         - userId
 *
 *     IEmployeeFindByOfficeRequest:
 *       type: object
 *       properties:
 *         officeId:
 *           type: integer
 *           example: 1
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
 *       required:
 *         - officeId
 *
 *     IUserFingerprintUpdateRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           example: 1
 *         userFingerprintId:
 *           type: string
 *           nullable: true
 *           example: "fp-abc123"
 *       required:
 *         - userId
 */
/**
 * @swagger
 * /api/v1/employees/:
 *   get:
 *     summary: Get list of employees with filters
 *     tags: [EMPLOYEES]
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
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: userRole
 *         schema:
 *           type: string
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
 *         name: employeeId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 */
/**
 * @swagger
 * /api/v1/employees/office/{officeId}:
 *   get:
 *     summary: Get list of employees by office ID
 *     tags: [EMPLOYEES]
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
 *         name: officeId
 *         required: true
 *         schema:
 *           type: integer
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
 *     responses:
 *       200:
 *         description: List of employees in the office
 */
/**
 * @swagger
 * /api/v1/employees/detail/{employeeId}:
 *   get:
 *     summary: Get employee detail by ID
 *     tags: [EMPLOYEES]
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
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee detail
 *       404:
 *         description: Employee not found
 */
/**
 * @swagger
 * /api/v1/employees:
 *   patch:
 *     summary: Update employee
 *     tags: [EMPLOYEES]
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
 *             $ref: '#/components/schemas/IEmployeeUpdateRequest'
 *     responses:
 *       201:
 *         description: employee updated successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/employees/fingerprint:
 *   patch:
 *     summary: Update user fingerprint ID
 *     tags: [EMPLOYEES]
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
 *             $ref: '#/components/schemas/IUserFingerprintUpdateRequest'
 *     responses:
 *       200:
 *         description: User fingerprint updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create employee
 *     tags: [EMPLOYEES]
 *     parameters:
 *       - in: header
 *         name: x-company-id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createEmployeeSchema'
 *     responses:
 *       201:
 *         description: employee created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     createEmployeeSchema:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           example: "John Doe"
 *         userWhatsappNumber:
 *           type: string
 *           example: "6284455334434"
 *       required:
 *         - userName
 *         - userWhatsappNumber
 */
