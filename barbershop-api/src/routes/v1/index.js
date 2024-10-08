const express = require('express');
const appointmentRoute = require('./appointment.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const notificationRoute = require('./notification.route');
const barberRoute = require('./barber.route');
const serviceRoute = require('./service.route'); // Import the service route
const serviceCategoryRoute = require('./serviceCategory.route'); // Import the service category route
const reviewRoute = require('./review.route');
const healthController = require('../../controllers/health.controller');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/barbers',
    route: barberRoute,
  },
  {
    path: '/services',
    route: serviceRoute,
  },
  {
    path: '/service-categories',
    route: serviceCategoryRoute,
  },
  {
    path: '/appointments',
    route: appointmentRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/health',
    route: healthController.healthCheck,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
