const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return null;
  return product;
};

// Create validations bellow

const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { error: { message: '"name" is required' }, status: 400 };
  }
  if (name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, status: 422 };
  }
  return {};
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return { error: { message: '"quantity" is required' }, status: 400 };
  } 
  if (quantity < 1) {
    return { error:
       { message: '"quantity" must be greater than or equal to 1' },
        status: 422, 
      };
  }
  return {};
};

const validateCreateBody = (name, quantity) => {
  const nameVal = validateName(name);
  if (nameVal.error) return nameVal;
  const quantityVal = validateQuantity(quantity);
  if (quantityVal.error) return quantityVal;
  return {};
};

const productNameExists = async (productName) => {
  const products = await productsModel.getByName(productName);
  if (!products) return false;
  return true;
};

const validateCreate = async (name, quantity) => {
  const doesProductExists = await productNameExists(name);
  if (doesProductExists) return { error: { message: 'Product already exists' }, status: 409 };
  const bodyValidations = await validateCreateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  return {};
};

const create = async (name, quantity) => {
  const validation = await validateCreate(name, quantity);
  if (validation.error) return validation;
  const result = await productsModel.create(name, quantity);
  return result;
};

const productIdExists = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return false;
  return true;
};
const validateUpdate = async (id, name, quantity) => {
  const doesProductExists = await productIdExists(id);
  if (!doesProductExists) return { error: { message: 'Product not found' }, status: 404 };
  const bodyValidations = await validateCreateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  return {};
};

const update = async (id, name, quantity) => {
  const validation = await validateUpdate(id, name, quantity);
  if (validation.error) return validation;
  const result = await productsModel.update(id, name, quantity);
  return result;
};

const exclude = async (id) => productsModel.exclude(id);

module.exports = { getAll, getById, create, update, exclude };
