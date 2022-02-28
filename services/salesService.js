const camelcaseKeys = require('camelcase-keys');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const removeSaleId = ({ date, productId, quantity }) => ({
    date,
    productId,
    quantity,
  });

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.map(camelcaseKeys);
};

const validateId = (id) => {
  if (typeof id !== 'number' || id < 1) {
    return { error: { message: 'Id must be a number higher than 1' }, status: 404 };
  }
  return {};
};

const getById = async (id) => {
  const idValidation = validateId(id);
  if (idValidation.error) return idValidation;
  const result = await salesModel.getById(id);
  if (result.length === 0) return { error: { message: 'Sale not found' }, status: 404 };
  return result.map(camelcaseKeys).map(removeSaleId);
};

const validateProductId = (sales) => {
  const isProductIdValid = sales.every((sale) => typeof sale.productId === 'number');
  if (!isProductIdValid) return { error: { message: '"productId" is required' }, status: 400 };
  return {};
};

const validateQuantity = (sales) => {
  const isProductQuantityValid = sales.every((sale) => Object.keys(sale).includes('quantity'));
  if (!isProductQuantityValid) return { error: { message: '"quantity" is required' }, status: 400 };
  const isQuantityValid = sales.every(({ quantity }) =>
   typeof quantity === 'number' && quantity > 0);
  if (!isQuantityValid) {
    return { error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 };
  }
  return {};
};

const validateSales = (sales) => {
  const productIdValidation = validateProductId(sales);
  if (productIdValidation.error) return productIdValidation;
  const quantityValidation = validateQuantity(sales);
  if (quantityValidation.error) return quantityValidation;
  return {};
};

const getSaleId = async () => {
  const resultId = await salesModel.getSaleId();
  return resultId;
};

const isSaleInStock = async (productId, quantity) => {
  const product = await productsService.getById(productId);
  if (product.quantity < quantity) {
    return { error: { message: 'Such amount is not permitted to sell' }, status: 422 };
  }
  return {};
};

const doesItHasStock = async (sales) => {
  const validation = sales.reduce(async (acc, { productId, quantity }) => {
    const saleStockValidation = await isSaleInStock(productId, quantity);
    if (saleStockValidation.error) {
      acc.error = saleStockValidation.error;
      acc.status = saleStockValidation.status;
    }
    return acc;
  }, {});
  return validation;
};

const sellProducts = async (saleId, sales) => {
  const validation = await doesItHasStock(sales);
  if (validation.error) return validation;
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.sell(saleId, productId, quantity);
    await salesModel.updateSoldProduct(productId, quantity);
   });
   return {};
};

const sell = async (sales) => {
  const validation = validateSales(sales);
  if (validation.error) return validation;
  const saleId = await getSaleId();
  const sellProductsValidation = await sellProducts(saleId, sales);
  if (sellProductsValidation.error) return sellProductsValidation;
  return { id: saleId, itemsSold: sales };
};

const update = async (saleId, sales) => {
  const validation = validateSales(sales);
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