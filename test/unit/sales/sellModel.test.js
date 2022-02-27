const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const salesModel = require('../../../models/salesModel')

describe('Realiza uma venda no MODEL', () => {

  describe('Realiza uma venda com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
    })

    after(() => {
      connection.execute.restore()
    })

    it('Rows afetadas uma', async () => {
      const result = await salesModel.sell()
      expect(result).to.have.property('affectedRows', 1)
    })
  })
})
