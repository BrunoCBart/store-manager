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

const getByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT name, quantity FROM StoreManager.products WHERE name=?;',
    [name],
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

const update = async (id, name, quantity) => {
    const [result] = await connection.execute(
      'UPDATE StoreManager.products SET name=?, quantity =? WHERE id=?',
      [name, quantity, id],
    );
    return result;
};
module.exports = { getAll, getById, create, update, getByName };