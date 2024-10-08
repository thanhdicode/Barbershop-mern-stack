/* eslint-disable no-console */
const dayjs = require('dayjs');
const webpush = require('web-push');

webpush.setVapidDetails('mailto:test@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

const sendPushNotification = async (subscription, payload) => {
  try {
    const stringifiedPayload = JSON.stringify(payload); // Stringify the payload
    await webpush.sendNotification(subscription, stringifiedPayload);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

const prepareNotificationPayload = (type, appointmentDetails) => {
  const formattedDateTime = dayjs(appointmentDetails.appointmentDateTime).format('dddd, MMMM D, YYYY h:mm A');
  const lowerCaseType = type.toLowerCase();

  let title = `Appointment ${lowerCaseType}`;
  let body = `Your appointment on ${formattedDateTime} has been ${lowerCaseType}.`;

  if (type === 'feedback') {
    title = `Appointment Feedback Request`;
    body = `Your appointment on ${formattedDateTime} has passed. We would love to hear your feedback on the service provided. Please consider leaving a review.`;
  } else if (type === 'new') {
    title = `New Appointment Scheduled`;
    body = `A new appointment has been scheduled for ${formattedDateTime}.`;
  } else if (type === 'user_updated' || type === 'barber_updated') {
    title = `Appointment Updated`;
    body = `An appointment on ${formattedDateTime} has been updated.`;
  }

  return {
    title,
    body,
    icon: '/android/android-launchericon-192-192.png',
    data: appointmentDetails,
  };
};

module.exports = {
  sendPushNotification,
  prepareNotificationPayload,
};
