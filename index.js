require('dotenv').config();
const express = require('express');

const midd = require('./middlewares');
const productsRouter = require('./routes/productsRouter.routes');
const salesRouter = require('./routes/salesRouter.routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(midd.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
