const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    barberId: Joi.string().custom(objectId).required(),
    serviceType: Joi.string().custom(objectId).required(),
    appointmentId: Joi.string().custom(objectId).required(),
    name: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    appointmentDateTime: Joi.date().required(),
    date: Joi.date(),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    barberId: Joi.string().custom(objectId),
    serviceType: Joi.string().custom(objectId),
    appointmentId: Joi.string().custom(objectId),
    name: Joi.string(),
    rating: Joi.number().min(1).max(5),
    title: Joi.string(),
    text: Joi.string(),
    appointmentDateTime: Joi.date(),
    date: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      rating: Joi.number().min(1).max(5),
      title: Joi.string(),
      text: Joi.string(),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
