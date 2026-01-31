"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IUpdateCompanyRequest:
 *       type: object
 *       properties:
 *         companyId:
 *           type: number
 *           example: 1
 *         companyName:
 *           type: string
 *           nullable: true
 *           example: "PT Satu Flow Digital"
 *         companyIndustry:
 *           type: string
 *           nullable: true
 *           example: "Technology"
 *       required:
 *         - companyId
 *     ICompanyFindAllRequest:
 *       type: object
 *       properties:
 *         jwtPayload:
 *           $ref: '#/components/schemas/IJwtPayload'
 *         page:
 *           type: number
 *           example: 1
 *         size:
 *           type: number
 *           example: 10
 *         search:
 *           type: string
 *           example: "satuflow"
 *         pagination:
 *           type: boolean
 *           example: true
 *       required:
 *         - jwtPayload
 */
/**
 * @swagger
 * /api/v1/companies/:
 *   patch:
 *     summary: Update a company
 *     tags: [COMPANIES]
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
 *             $ref: '#/components/schemas/IUpdateCompanyRequest'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *   get:
 *     summary: Get all companies
 *     tags: [COMPANIES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
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
 *         description: List of companies

 * /api/v1/companies/detail/:
 *   get:
 *     summary: Get company detail by ID
 *     tags: [COMPANIES]
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
 *         description: Company detail
 *       404:
 *         description: Company not found
 */
