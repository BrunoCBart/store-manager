const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return null;
  return product;
};

const validateName = (name) => {
  if (!name) return { error: { message: '"name" is required' }, status: 400 };
  if (name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, status: 422 };
  }
  return {};
};

const validateQuantity = (quantity) => {
  if (!quantity) return { error: { message: '"quantity" is required' }, status: 400 };
  if (typeof quantity !== 'number' || quantity <= 0) {
    return { error:
       { message: `"quantity" must be greater than or equal to ${quantity}` },
        status: 422, 
      };
  }
  return {};
};

const validateCreate = (name, quantity) => {
  const nameVal = validateName(name);
  if (nameVal.error) return nameVal;
  const quantityVal = validateQuantity(quantity);
  if (quantityVal.error) return quantityVal;
  return {};
};

const create = async (name, quantity) => {
  const validation = validateCreate(name, quantity);
  if (validation.error) return validation;
  const result = await productsModel.create(name, quantity);
  return result;
};

module.exports = { getAll, getById, create };
