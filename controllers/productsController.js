const productsService = require('../services/productsService');

const getAll = (async (req, res) => {
  const result = await productsService.getAll();

  return res.status(200).json(result);
});

const getById = (async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(Number(id));

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
});

const create = (async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.create(name, Number(quantity));
  if (result.error) return res.status(result.status).json(result.error);
  return res.status(201).json({ message: 'Product created successfully' });
});

const update = (async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productsService.update(Number(id), name, Number(quantity));
  if (result.error) return res.status(result.status).json(result.error);
  return res.status(200).json(result);
});

const exclude = (async (req, res) => {
  const { id } = req.params;
  const result = await productsService.exclude(Number(id));
  return res.status(204).json(result);
});

module.exports = { getAll, getById, create, update, exclude };
