const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const salesModel = require('../../../models/salesModel')

describe('Lista todos as vendas ou um uma venda específica MODEL', () => {
  describe('Todos as vendas, getAll, mas sem vendas no BD', () =>{
    const response = [[]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(response)
    })
    afterEach(() => {
      connection.execute.restore()
    })
    it('retorna um array', async () => {
      const result = await salesModel.getAll()
      expect(result).to.be.an('array')
    })

    it('retorna um array vazio', async () => {
      const result = await salesModel.getAll()
      expect(result).to.be.empty
    })
  })

  describe('Todos as vendas, getAll, mas com vendas no BD', () => {
    const sales = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      },
      {
        saleId: 2,
        date: "2021-09-09T20:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 2,
        date: "2021-09-09T20:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(sales)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('retorna um array com items', async () => {
      const result = await salesModel.getAll()
      expect(result).not.to.be.empty
    })

    it('retorna um array com dois items', async () => {
      const result = await salesModel.getAll()
      expect(result).to.have.lengthOf(4)
    })
  })

  describe('Venda específica getById', () => {
    const sale = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(sale)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('Retorna uma venda', async () => {
      const result = await salesModel.getById()
      expect(result[0]).to.have.property('saleId', 1)
      expect(result[1]).to.have.property('saleId', 1)
    })
   
  })

})
