const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getServices = catchAsync(async (req, res) => {
  const services = await serviceService.getServices(req.query);
  res.status(httpStatus.OK).send(services);
});

const getService = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.serviceId);
  if (!service) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Service not found' });
  } else {
    res.status(httpStatus.OK).send(service);
  }
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.serviceId, req.body);
  res.status(httpStatus.OK).send(service);
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
