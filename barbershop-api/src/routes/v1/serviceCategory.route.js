const express = require('express');
const validate = require('../../middlewares/validate');
const serviceCategoryController = require('../../controllers/serviceCategory.controller');
const serviceCategoryValidation = require('../../validations/serviceCategory.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(serviceCategoryValidation.createServiceCategory), serviceCategoryController.createServiceCategory)
  .get(validate(serviceCategoryValidation.getServiceCategories), serviceCategoryController.getServiceCategories);

router
  .route('/:categoryId')
  .get(validate(serviceCategoryValidation.getServiceCategory), serviceCategoryController.getServiceCategory)
  .patch(validate(serviceCategoryValidation.updateServiceCategory), serviceCategoryController.updateServiceCategory)
  .delete(validate(serviceCategoryValidation.deleteServiceCategory), serviceCategoryController.deleteServiceCategory);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Service Categories
 *   description: Service category management and retrieval
 */

/**
 * @swagger
 * /service-categories:
 *   post:
 *     summary: Create a service category
 *     description: Only admins can create service categories.
 *     tags: [Service Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Haircuts
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServiceCategory'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all service categories
 *     description: Retrieve all service categories. Available to everyone.
 *     tags: [Service Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceCategory'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /service-categories/{categoryId}:
 *   get:
 *     summary: Get a service category
 *     description: Retrieve a specific service category by its ID.
 *     tags: [Service Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Service category ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServiceCategory'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a service category
 *     description: Only admins can update service categories.
 *     tags: [Service Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Service category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Grooming
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServiceCategory'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a service category
 *     description: Only admins can delete service categories.
 *     tags: [Service Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Service category ID
*     responses:
*       "204":
*         description: No content
*       "400":
*         description: Bad Request - Cannot delete a service category that has associated services.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Cannot delete service category with associated services. Please delete the services first.
*       "401":
*         $ref: '#/components/responses/Unauthorized'
*       "403":
*         $ref: '#/components/responses/Forbidden'
*       "404":
*         $ref: '#/components/responses/NotFound'

 */
