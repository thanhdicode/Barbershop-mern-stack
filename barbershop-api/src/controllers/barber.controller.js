const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const assignBarber = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const barberData = req.body;

  const updatedUser = await userService.updateUserById(userId, {
    ...barberData,
    role: 'barber',
    selectedUserId: userId,
  });

  res.status(httpStatus.OK).send(updatedUser);
});

const updateBarber = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const barberData = req.body;

  const updatedUser = await userService.updateUserById(userId, barberData);

  res.status(httpStatus.OK).send(updatedUser);
});

const unassignBarber = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await userService.updateUserById(userId, {
    role: 'user',
    title: '',
    image: '',
    selectedUserId: null,
  });

  res.status(httpStatus.OK).send(updatedUser);
});

module.exports = {
  assignBarber,
  updateBarber,
  unassignBarber,
};
