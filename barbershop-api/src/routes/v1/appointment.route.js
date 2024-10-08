const express = require('express');
const validate = require('../../middlewares/validate');
const appointmentValidation = require('../../validations/appointment.validation');
const appointmentController = require('../../controllers/appointment.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(appointmentValidation.createAppointment), appointmentController.createAppointment)
  .get(validate(appointmentValidation.getAppointments), appointmentController.getAppointments);

router
  .route('/:appointmentId')
  .get(appointmentController.getAppointment)
  .patch(validate(appointmentValidation.updateAppointment), appointmentController.updateAppointment)
  .delete(validate(appointmentValidation.deleteAppointment), appointmentController.deleteAppointment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management and retrieval
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create an appointment
 *     description: Allows users to create a new appointment.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - contactNumber
 *               - email
 *               - preferredHairdresser
 *               - serviceCategory
 *               - serviceType
 *               - appointmentDateTime
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               preferredHairdresser:
 *                 type: string
 *               serviceCategory:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               appointmentDateTime:
 *                 type: string
 *                 format: date-time
 *               additionalNotes:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Upcoming, Past, Cancelled]
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               contactNumber: "0898888888"
 *               email: john.doe@example.com
 *               preferredHairdresser: "5596"
 *               serviceCategory: "7753"
 *               serviceType: "06e0"
 *               appointmentDateTime: "2024-08-21T12:00:07.199Z"
 *               additionalNotes: "Please be on time."
 *               userId: "8690"
 *               status: "Upcoming"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve all appointments. Available to admins and users.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: preferredHairdresser
 *         schema:
 *           type: string
 *         description: ID of the preferred hairdresser
 *       - in: query
 *         name: serviceCategory
 *         schema:
 *           type: string
 *         description: ID of the service category
 *       - in: query
 *         name: serviceType
 *         schema:
 *           type: string
 *         description: ID of the service type
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Upcoming, Past, Cancelled]
 *         description: Status of the appointment
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (e.g., appointmentDateTime:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of appointments
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   get:
 *     summary: Get an appointment
 *     description: Retrieve a specific appointment by its ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an appointment
 *     description: Allows users to update an existing appointment.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               preferredHairdresser:
 *                 type: string
 *               serviceCategory:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               appointmentDateTime:
 *                 type: string
 *                 format: date-time
 *               additionalNotes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Upcoming, Past, Cancelled]
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               contactNumber: "0898888888"
 *               email: john.doe@example.com
 *               preferredHairdresser: "5596"
 *               serviceCategory: "7753"
 *               serviceType: "06e0"
 *               appointmentDateTime: "2024-08-21T12:00:07.199Z"
 *               additionalNotes: "Please be on time."
 *               status: "Upcoming"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an appointment
 *     description: Allows users to delete an appointment.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
