const Joi = require('joi');

const assignBarber = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
  }),
};

const updateBarber = {
  body: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string().uri(),
  }),
};

module.exports = {
  assignBarber,
  updateBarber,
};
