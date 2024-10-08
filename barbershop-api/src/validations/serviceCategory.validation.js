const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createServiceCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getServiceCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getServiceCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateServiceCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteServiceCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createServiceCategory,
  getServiceCategories,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
