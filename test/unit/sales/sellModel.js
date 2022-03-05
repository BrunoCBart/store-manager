const { expect } = require('chai');
const res = require('express/lib/response');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const salesModel = require('../../../models/salesModel')

describe('Realiza uma venda no MODEL', () => {

  describe('Realiza uma venda com sucesso', () => {
    const response = [{insertId: 1}]
    before(() => {
      sinon.stub(connection, 'execute').resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })

    it('Rows afetadas uma', async () => {
      const result = await salesModel.sell()
      expect(result).to.be.eq(1)
    })
  })
})
