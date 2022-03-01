const productsModel = require('../models/productsModel');

const errors = {
  nameNotValid: { error: { message: '"name" is required' }, status: 400 },
  nameLength: 
  { error: { message: '"name" length must be at least 5 characters long' }, status: 422 },
  quantityNotValid: { error: { message: '"quantity" is required' }, status: 400 },
  quantitySmallerThanOne: 
  { error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 },
  productExists: { error: { message: 'Product already exists' }, status: 409 },
  productNotFound: { error: { message: 'Product not found' }, status: 404 },
};

const isNameValid = (name) => !name || typeof name !== 'string';

const isNameLengthValid = (name, length) => name.length < length;

const isQuantityValid = (quantity) => typeof quantity !== 'number';

const isQuantityHigherThanZero = (quantity, length) => quantity < length;

const validateBody = (name, quantity) => {
  switch (true) {
    case isNameValid(name): return errors.nameNotValid;
    case isNameLengthValid(name, 5): return errors.nameLength;
    case isQuantityValid(quantity): return errors.quantityNotValid;
    case isQuantityHigherThanZero(quantity, 1): return errors.quantitySmallerThanOne;
    default: return {};
  }
};

// Can't get getByName from service for some reason "circular error"
const doesProductNameExists = async (name) => productsModel.getByName(name);

const validateCreate = async (name, quantity) => {
  const bodyValidations = validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  console.log(await doesProductNameExists(name));
  if (await doesProductNameExists(name)) return errors.productExists;
  return {};
};

const productNameExists = async (id, name) => {
  const product = await doesProductNameExists(name);
  if (!product) return false;
  if (id !== product.id && name === product.name) {
    return true;
  }
  return false;
};

const productIdExists = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return true;
  return {};
};

const validateProductUpdate = async (id, name) => {
  switch (true) {
    case await productNameExists(id, name): return errors.productExists;
    case await productIdExists(id): return errors.productNotFound;
    default: return {};
  }
};
const validateUpdate = async (id, name, quantity) => {
  const bodyValidations = validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  const productUpdateValidations = await validateProductUpdate(id, name);
  if (productUpdateValidations.error) return productUpdateValidations;
  return {};
};

module.exports = { validateBody, validateCreate, validateUpdate };