const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const result = await productsService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(Number(id));

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

module.exports = { getAll, getById };
