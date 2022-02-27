const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id;`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.id AS sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id WHERE s.id=?;`,
    [id],
  );
  return result;
};

const getSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );
  return insertId;
};

const sell = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
    [saleId, productId, quantity],

  );
  return insertId;
};

const update = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    `UPDATE StoreManager.sales_products SET product_id=?, quantity=?
     WHERE sale_id=? AND product_id=?`,
    [productId, quantity, saleId, productId],
  );
  return insertId;
};

const exclude = async (id) => {
   await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id=?',
    [id],
  );
};
module.exports = { getAll, getById, sell, getSaleId, update, exclude };