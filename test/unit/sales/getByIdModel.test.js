const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const salesModel = require('../../../models/salesModel')

describe('Lista todos as vendas ou um uma venda específica MODEL', () => {

  describe('Venda específica mas sem vendas', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([[]])
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('Caso não tenha vendas retorna array vazio', async () => {
      const result = await salesModel.getById()
      expect(result).to.be.an('array').and.to.be.empty
    })
  })
})
