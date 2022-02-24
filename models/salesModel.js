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

module.exports = { getAll, getById };