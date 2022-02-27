const salesService = require('../services/salesService');

const getAll = (async (req, res, next) => {
  try {
    const result = await salesService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

const getById = (async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await salesService.getById(Number(id));
    
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

const sell = (async (req, res, next) => {
  const sales = req.body;
  try {
    const result = await salesService.sell(sales);
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
});
// teste
const update = (async (req, res, next) => {
  const sales = req.body;
  const { id } = req.params;
  try {
    const result = await salesService.update(Number(id), sales);
    if (result.error) return res.status(result.status).json(result.error);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = { getAll, getById, sell, update };
