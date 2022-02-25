const productsService = require('../../../services/productsService')
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const { expect } = require('chai')

describe('Lista todos os produtos ou um produto específico no SERVICE', () => {
  
  describe('Produto específico mas sem produtos', () => {
    const product = undefined
    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(product)
    })

    afterEach(() => {
      productsModel.getById.restore()
    })

    it('Retorna zero produtos', async () => {
      const result = await productsService.getById()
      expect(result).to.be.eq(null)
    })
  })
})