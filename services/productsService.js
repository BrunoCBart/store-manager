const productsModel = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return null;
  return product;
};

const productByName = async (productName) => {
  const products = await productsModel.getByName(productName);
  return products;
};

const validateCreate = async (name, quantity) => {
  const bodyValidations = productsSchema.validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  const doesProductExists = await productByName(name);
  if (doesProductExists) return { error: { message: 'Product already exists' }, status: 409 };
  return {};
};

const create = async (name, quantity) => {
  const validation = await validateCreate(name, quantity);
  if (validation.error) return validation;
  const id = await productsModel.create(name, quantity);
  const result = await productByName(name);
  return { id, ...result };
};

const productIdExists = async (id) => {
  console.log(id, 'a');
  const product = await productsModel.getById(id);
  console.log(product, 'b');
  if (!product) return { error: { message: 'Product not found' }, status: 404 };
  return {};
};
const validateUpdate = async (id, name, quantity) => {
  const bodyValidations = productsSchema.validateBody(name, quantity);
  if (bodyValidations.error) return bodyValidations;
  // const doesProductNameExists = await productNameExists(name);
  // if (doesProductNameExists) return { error: { message: 'Product already exists' }, status: 409 };
  const productExistsValidation = await productIdExists(id);
  if (productExistsValidation.error) return productExistsValidation;  
  return {};
};

  const update = async (id, name, quantity) => {
    const validation = await validateUpdate(id, name, quantity);
    if (validation.error) return validation;
    const insertId = await productsModel.update(id, name, quantity);
    return { id: insertId, name, quantity };
  };

  const exclude = async (id) => {
    const productExistsValidation = await productIdExists(id);
    if (productExistsValidation.error) return productExistsValidation;  
    await productsModel.exclude(id);
    return {};
  };

  module.exports = { getAll, getById, create, update, exclude };
