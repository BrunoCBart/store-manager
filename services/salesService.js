const camelcaseKeys = require('camelcase-keys');
const salesModel = require('../models/salesModel');
const salesSchema = require('../schemas/salesSchema');

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
  const validation = salesSchema.validateGetById(id);
  if (validation.error) return validation;
  const result = await salesModel.getById(id);
  if (result.length === 0) return { error: { message: 'Sale not found' }, status: 404 };
  return result.map(camelcaseKeys).map(removeSaleId);
};

const getSaleId = async () => {
  const resultId = await salesModel.getSaleId();
  return resultId;
};

const sellProducts = async (saleId, sales) => {
  const validation = await salesSchema.isSaleInStock(sales);
  if (validation.error) return validation;
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.sell(saleId, productId, quantity);
    await salesModel.updateSoldProduct(productId, quantity);
   });
   return {};
};

const sell = async (sales) => {
  const validation = salesSchema.validateSales(sales);
  if (validation.error) return validation;
  const saleId = await getSaleId();
  const sellProductsValidation = await sellProducts(saleId, sales);
  if (sellProductsValidation.error) return sellProductsValidation;
  return { id: saleId, itemsSold: sales };
};

const update = async (saleId, sales) => {
  const validation = salesSchema.validateSales(sales);
  if (validation.error) return validation;
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.update(saleId, productId, quantity);
  });
  return { saleId, itemUpdated: sales };
};

const excludeSoldProducts = async (id) => {
  const sales = await getById(id);
  await salesModel.exclude(id);
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.updateExcludedProducts(productId, quantity);
  });
};

const exclude = async (id) => {
  const validation = await getById(id);
  if (validation.error) return validation;
  await excludeSoldProducts(id);
  return {};
};

module.exports = { getAll, getById, sell, update, exclude };