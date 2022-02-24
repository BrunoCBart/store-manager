const camelcaseKeys = require('camelcase-keys');
const salesModel = require('../models/salesModel');

const removeSaleId = ({ date, productId, quantity }) => ({
    date,
    productId,
    quantity,
  });

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.map(camelcaseKeys);
};
const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return null;
  return result.map(camelcaseKeys).map(removeSaleId);
};

module.exports = { getAll, getById };