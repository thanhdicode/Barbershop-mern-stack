const { ServiceCategory } = require('../models');
const { Service } = require('../models');

const createServiceCategory = async (serviceCategoryBody) => {
  return ServiceCategory.create(serviceCategoryBody);
};

const getServiceCategories = async (filter, options) => {
  return ServiceCategory.paginate(filter, options);
};

const getServiceCategoryById = async (id) => {
  return ServiceCategory.findById(id);
};

const updateServiceCategoryById = async (categoryId, updateBody) => {
  const serviceCategory = await getServiceCategoryById(categoryId);
  if (!serviceCategory) {
    throw new Error('Service Category not found');
  }
  Object.assign(serviceCategory, updateBody);
  await serviceCategory.save();
  return serviceCategory;
};

const deleteServiceCategoryById = async (categoryId) => {
  const serviceCategory = await getServiceCategoryById(categoryId);
  if (!serviceCategory) {
    throw new Error('Service Category not found');
  }

  // Check if there are any services associated with this category
  const associatedServices = await Service.find({ category: categoryId });
  if (associatedServices.length > 0) {
    throw new Error('Cannot delete service category with associated services. Please delete the services first.');
  }

  await serviceCategory.remove();
  return serviceCategory;
};

module.exports = {
  createServiceCategory,
  getServiceCategories,
  getServiceCategoryById,
  updateServiceCategoryById,
  deleteServiceCategoryById,
};
