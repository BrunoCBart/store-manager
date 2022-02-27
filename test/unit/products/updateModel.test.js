const {expect} = require('chai')

const productsModel = require('../../../models/productsModel')
const sinon = require('sinon');

const connection = require('../../../models/connection')

describe('Atualiza um produto do banco de dados caso exista no MODEL', () => {
  describe('produto não existe', () => {

    const response = [{
      insertId: 0
    }]
    before(() => {
      sinon.stub(connection, 'execute').resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })

    it('produto não atualizado', async () => {
      const result = await productsModel.update()
      expect(result).to.be.eq(0)
    })
  })
  describe('produto existe', () => {
    const response = [{
      insertId: 1,
    }]
    before(() => {
      sinon.stub(connection, 'execute').resolves(response)
    })

    after(() => {
      connection.execute.restore()
    })

    it('Produto atualizado com sucesso', async () => {
      const result = await productsModel.update()
      expect(result).to.be.eq(1)
    })


  })
})