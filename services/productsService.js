const productsModel = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return null;
  return product;
};

const productNameExists = async (productName) => {
  const products = await productsModel.getByName(productName);
  if (!products) return false;
  return true;
};

const validateCreate = async (name, quantity) => {
  const bodyValidations = productsSchema.validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  const doesProductExists = await productNameExists(name);
  if (doesProductExists) return { error: { message: 'Product already exists' }, status: 409 };
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
  const bodyValidations = productsSchema.validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  // const doesProductNameExists = await productNameExists(name);
  // if (doesProductNameExists) return { error: { message: 'Product already exists' }, status: 409 };
  const doesProductExists = await productIdExists(id);
  if (!doesProductExists) return { error: { message: 'Product not found' }, status: 404 };
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
