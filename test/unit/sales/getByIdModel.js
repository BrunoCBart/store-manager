const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')

const salesModel = require('../../../models/salesModel')

describe('Lista todos as vendas ou um uma venda específica MODEL', () => {

  describe('Venda não existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]])
    })

    after(() => {
      connection.execute.restore()
    })

    it('Caso não tenha vendas retorna array vazio', async () => {
      const result = await salesModel.getById()
      expect(result).to.be.an('array').and.to.be.empty
    })
  })
  describe('Venda existente', () => {
    const sale = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]]
    before(() => {
      sinon.stub(connection, 'execute').resolves(sale)
    })

    after(() => {
      connection.execute.restore()
    })

    it('Retorna uma venda', async () => {
      const result = await salesModel.getById()
      expect(result[0]).to.have.property('saleId', 1)
      expect(result[1]).to.have.property('saleId', 1)
    })
   
  })
})
