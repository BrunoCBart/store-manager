const productsService = require('../services/productsService');

const getAll = (async (req, res, next) => {
  try {
    const result = await productsService.getAll();
    return res.status(200).json(result);
  } catch (error) {
   return next(error); 
  }
});

const getById = (async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await productsService.getById(Number(id));
  
    if (!result) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

const create = (async (req, res, next) => {
  const { name, quantity } = req.body;

  try {
    const result = await productsService.create(name, quantity);
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
});

const update = (async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const result = await productsService.update(Number(id), name, quantity);
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

const exclude = (async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await productsService.exclude(Number(id));
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = { getAll, getById, create, update, exclude };
