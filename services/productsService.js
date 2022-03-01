const productsModel = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const productByName = async (productName) => {
  const products = await productsModel.getByName(productName);
  return products;
};

const create = async (name, quantity) => {
  const validation = await productsSchema.validateCreate(name, quantity);
  if (validation.error) return validation;
  const insertId = await productsModel.create(name, quantity);
  const result = await getById(insertId);
  return result;
};

const productIdExists = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { error: { message: 'Product not found' }, status: 404 };
  return {};
};

  const update = async (id, name, quantity) => {
    const validation = await productsSchema.validateUpdate(id, name, quantity);
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

  module.exports = { getAll, getById, create, update, exclude, productByName };
