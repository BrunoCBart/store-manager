const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Lista todos as vendas ou uma venda específico no SERVICE', () => {
  describe('Venda específica mas sem vendas', () => {
    const product = []
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves(product)
    })

    afterEach(() => {
      salesModel.getById.restore()
    })

    it('Caso não tenha vendas retorna null', async () => {
      const result = await salesService.getById()
      expect(result).to.be.eq(null)
    })
  })
})