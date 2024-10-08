const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  // Fetch the user by ID
  const user = await userService.getUserById(req.params.userId);

  // Check if user is not found
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // If the user is a barber, allow public access
  if (user.role === 'barber') {
    return res.send(user);
  }

  // Ensure that either req.user or user object itself can be used to authorize
  const requester = req.user || user;

  if (!requester) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  // Check if the requesting user has the necessary permissions
  if (requester.role !== 'admin' && requester.id !== req.params.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  // If the user has the required permissions or is accessing their own profile, return the user data
  res.send(user);
});

const getBarbers = catchAsync(async (req, res) => {
  // Ensure you query the barbers with the correct filter and return the result in the expected format
  const result = await userService.queryUsers({ role: 'barber' }, {});
  res.send(result); // Directly sending the query result which includes pagination info
});

const changePassword = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isMatch = await user.isPasswordMatch(currentPassword);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect current password');
  }

  user.password = newPassword;
  await user.save();

  res.status(httpStatus.OK).send({ message: 'Password changed successfully' });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getBarbers,
  changePassword,
  updateUser,
  deleteUser,
};
