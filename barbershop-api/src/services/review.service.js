const { Review } = require('../models');

const createReview = async (reviewBody) => {
  return Review.create(reviewBody);
};

const getReviews = async (filter, options) => {
  return Review.paginate(filter, options);
};

const getReviewById = async (id) => {
  return Review.findById(id).populate('userId barberId serviceType appointmentId');
};

const updateReviewById = async (reviewId, updateBody) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }
  Object.assign(review, updateBody);
  await review.save();
  return review;
};

const deleteReviewById = async (reviewId) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }
  await review.remove();
  return review;
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
