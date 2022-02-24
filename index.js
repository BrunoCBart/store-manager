require('dotenv').config();
const express = require('express');

const productsRouter = require('./routes/productsRouter.routes');
const salesRouter = require('./routes/salesRouter.routes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
