const { Service } = require('../models');

const createService = async (serviceBody) => {
  return Service.create(serviceBody);
};

const getServices = async (filter, options) => {
  return Service.paginate(filter, options);
};

const getServiceById = async (id) => {
  return Service.findById(id).populate('category');
};

const updateServiceById = async (serviceId, updateBody) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new Error('Service not found');
  }
  Object.assign(service, updateBody);
  await service.save();
  return service;
};

const deleteServiceById = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new Error('Service not found');
  }
  await service.remove();
  return service;
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
