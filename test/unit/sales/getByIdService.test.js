const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Venda específica no SERVICE', () => {
  describe('Venda específica mas sem vendas', () => {
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
})