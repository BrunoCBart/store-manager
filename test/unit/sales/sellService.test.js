const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Realiza uma venda no SERVICE', () => {
  before(() => {
    sinon.stub(salesModel, 'sell').resolves({affectedRows: 1})
  })
  
  after(() => {
    salesModel.sell.restore()
  })
  describe('Vendas sem informação correta', () => {
    const error = { error: { message: '"productId" is required' }, status: 400 }
    const sales = [
      {quantity: 1}
    ]
    before(() => {
      sinon.stub(salesModel, 'getSaleId').resolves(1)
    })

    after(() => {
      salesModel.getSaleId.restore()
    })

    it('Retorna erro productId inválido', async () => {
      const result = await salesService.sell(sales)
      expect(result).to.be.deep.eq(error)
    })
  })
})