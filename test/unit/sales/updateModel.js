const salesModel = require('../../../models/salesModel')
const sinon = require('sinon');

const connection = require('../../../models/connection')

const { expect } = require('chai');

describe('Atualiza uma venda no SERVICE', () => {
  describe('Atualiza uma venda corretamente', () => {
    const id = 1;
    const productId = 1
    const quantity = 10
  
    before(() => {
      sinon.stub(connection, 'execute').resolves([{insertId: 1}])
    })
  
    after(() => {
      connection.execute.restore()
    })

    it('Atualiza uma venda', async () => {
      const result = await salesModel.update(id, productId, quantity)
      expect(result).to.be.eq(1)
    })
  })
  
})
