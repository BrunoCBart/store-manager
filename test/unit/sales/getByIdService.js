const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Venda específica no SERVICE', () => {
  describe('Venda não existe', () => {
    const product = []
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(product)
    })

    after(() => {
      salesModel.getById.restore()
    })

    it('Caso não tenha vendas retorna null', async () => {
      const result = await salesService.getById(1)
      expect(result).to.deep.have.property('error', { "message": "Sale not found" })
    })
  })
  describe('Venda existente', () => {

    const sale = [
      {
        sale_id: 1,
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        sale_id: 1,
        date: "2021-09-09T04:54:54.000Z",
        product_id: 2,
        quantity: 2
      }
    ]
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(sale)
    })

    after(() => {
      salesModel.getById.restore()
    })

    it('Retorna um produto', async () => {
      const result = await salesService.getById(1)
      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity')
      expect(result[1]).to.include.all.keys('date', 'productId', 'quantity')
    })
   
  })
})