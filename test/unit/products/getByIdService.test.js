const productsService = require('../../../services/productsService')
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const { expect } = require('chai')

describe('Lista um produto específico no SERVICE', () => {
  
  describe('Produto não existe', () => {
    const product = undefined
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(product)
    })

    after(() => {
      productsModel.getById.restore()
    })

    it('Retorna zero produtos', async () => {
      const result = await productsService.getById()
      expect(result).to.be.eq(undefined)
    })
  })

  describe('Produto existente', () => {
    const product = {id: 1, name: 'Hamburguer vegano', quantity: 1}
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(product)
    })

    after(() => {
      productsModel.getById.restore()
    })
    it('Retorna um produto', async () => {
      const result = await productsService.getById()
      expect(result).to.be.deep.eq(product)
    })
  })
})