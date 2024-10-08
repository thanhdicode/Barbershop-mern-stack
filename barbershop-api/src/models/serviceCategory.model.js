const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const serviceCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceCategorySchema.plugin(toJSON);
serviceCategorySchema.plugin(paginate);

/**
 * @typedef ServiceCategory
 */
const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;
