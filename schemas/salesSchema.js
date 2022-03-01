const productsService = require('../services/productsService');

const errors = {
  idNotNumOrLowerThanOne: { error: { message: 'Id must be a number higher than 1' }, status: 404 },
  invalidProductId: { error: { message: '"productId" is required' }, status: 400 },
  quantityIsUndefined: { error: { message: '"quantity" is required' }, status: 400 },
  invalidProductQuantity: 
  { error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 },
  saleAmountTooBig: { error: { message: 'Such amount is not permitted to sell' }, status: 422 },
};

const isIdNumLowerThan = (id, value) => {
  if (typeof id !== 'number' || id < value) {
    return true;
  }
  return false;
};

const validateGetById = (id) => {
  switch (true) {
    case isIdNumLowerThan(id, 1): return errors.idNotNumOrLowerThanOne;
    default: return {};
  }
};

const isProductIdValid = (sales) => {
  const isProductIdANumber = sales.every((sale) => typeof sale.productId === 'number');
  return !isProductIdANumber;
};

const isQuantityUndefined = (sales) => {
  const isProductQuantityValid = sales.every((sale) => Object.keys(sale).includes('quantity'));
  return !isProductQuantityValid;
};
const isQuantityNumHigherThan = (sales, value) => {
  const isQuantityValid = sales.every(({ quantity }) =>
  typeof quantity === 'number' && quantity > value);
  return !isQuantityValid;
};

const validateSales = (sales) => {
  switch (true) {
    case isProductIdValid(sales): return errors.invalidProductId;
    case isQuantityUndefined(sales): return errors.quantityIsUndefi;
    case isQuantityNumHigherThan(sales, 0): return errors.invalidProductQuantity;
    default: return {};
  }
};

const doesItHasStock = async ({ productId, quantity }) => {
  const product = await productsService.getById(productId);
  if (product.quantity < quantity) return true;
  return false;
};

const checkStock = async (sales) => {
  const stocksAvailability = sales.map(doesItHasStock);
  const stock = await Promise.all(stocksAvailability);
  return stock; 
};

const isSaleInStock = async (sales) => {
  const isStockAvailable = await checkStock(sales);
  if (isStockAvailable.some((stock) => stock)) return errors.saleAmountTooBig;
  return {};
};

module.exports = { validateGetById, validateSales, isSaleInStock };