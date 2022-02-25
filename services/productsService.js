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
  if (!quantity) return { error: { message: '"quantity" is required' }, status: 400 };
  if (typeof quantity !== 'number' || quantity <= 1) {
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

const productExists = async (productName) => {
  const products = await getAll();
  const doesProductExists = products.find(({ name }) => name === productName);
  return !!doesProductExists;
};

const validateCreate = async (name, quantity) => {
  const doesProductExists = await productExists(name);
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

const validateUpdate = async (name, quantity) => {
  const doesProductExists = await productExists(name);
  if (!doesProductExists) return { error: { message: 'Product not found' }, status: 404 };
  const bodyValidations = await validateCreateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  return {};
};

const update = async (name, quantity) => {
  const validation = await validateUpdate(name, quantity);
  if (validation.error) return validation;
  const result = await productsModel.update(name, quantity);
  return result;
};

module.exports = { getAll, getById, create, update };
