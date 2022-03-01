module.exports = (err, _req, res, _next) => {
  console.log(err);
  return res.status(500).json({ error: `Error ${err.message}` });
};