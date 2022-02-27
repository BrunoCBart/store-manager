const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const productsModel = require('../../../models/productsModel')

describe('Lista um produto específico no MODEL', () => {
 
  describe('Produto específico mas sem produtos', () => {
    const product = [[]]
    before(() => {
      sinon.stub(connection, 'execute').resolves(product)
    })

    after(() => {
      connection.execute.restore()
    })

    it('Retorna zero produtos', async () => {
      const result = await productsModel.getById()
      expect(result).to.be.eq(undefined)
    })
  })
})