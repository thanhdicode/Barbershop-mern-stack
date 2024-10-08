const healthCheck = (req, res) => {
  res.status(200).send({ status: 'OK' });
};

module.exports = {
  healthCheck,
};
