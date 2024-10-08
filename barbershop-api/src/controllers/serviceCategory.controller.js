const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { serviceCategoryService } = require('../services');

const createServiceCategory = catchAsync(async (req, res) => {
  const serviceCategory = await serviceCategoryService.createServiceCategory(req.body);
  res.status(httpStatus.CREATED).send(serviceCategory);
});

const getServiceCategories = catchAsync(async (req, res) => {
  const serviceCategories = await serviceCategoryService.getServiceCategories(req.query);
  res.status(httpStatus.OK).send(serviceCategories);
});

const getServiceCategory = catchAsync(async (req, res) => {
  const serviceCategory = await serviceCategoryService.getServiceCategoryById(req.params.categoryId);
  if (!serviceCategory) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Service Category not found' });
  } else {
    res.status(httpStatus.OK).send(serviceCategory);
  }
});

const updateServiceCategory = catchAsync(async (req, res) => {
  const serviceCategory = await serviceCategoryService.updateServiceCategoryById(req.params.categoryId, req.body);
  res.status(httpStatus.OK).send(serviceCategory);
});

const deleteServiceCategory = catchAsync(async (req, res) => {
  try {
    await serviceCategoryService.deleteServiceCategoryById(req.params.categoryId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
});
module.exports = {
  createServiceCategory,
  getServiceCategories,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
