const connection = require('./connection');
require('express-async-errors');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result[0];
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES(?,?)',
    [name, quantity],
  );
  return result;
};

const update = async (name, quantity) => {
    const [result] = await connection.execute(
      'UPDATE StoreManager.products SET name=?, quantity =? WHERE name=?',
      [name, quantity, name],
    );
    return result[0];
};
module.exports = { getAll, getById, create, update };