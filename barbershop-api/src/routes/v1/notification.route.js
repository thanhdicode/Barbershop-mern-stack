const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sendAppointmentNotificationToUser } = require('../../controllers/notification.controller');

const router = express.Router();

router.post(
  '/send-appointment-notification',
  auth('sendAppointmentNotification'),
  validate(sendAppointmentNotificationToUser)
);

module.exports = router;
