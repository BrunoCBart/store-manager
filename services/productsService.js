const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = (id) => productsModel.getById(id);

module.exports = { getAll, getById };