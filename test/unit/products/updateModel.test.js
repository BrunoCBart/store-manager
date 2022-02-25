const {expect} = require('chai')

const productsModel = require('../../../models/productsModel')
const sinon = require('sinon');

const connection = require('../../../models/connection')

describe('Atualiza um produto do banco de dados caso exista no MODEL', () => {
  describe('produto não existe', () => {

    const rows = [{
      affectedRows: 0
    }]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(rows)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('produto não atualizado', async () => {
      const result = await productsModel.update()
      expect(result).to.have.property('affectedRows', 0)
    })
  })
  describe('produto existe', () => {
    const rows = [{
      affectedRows: 1
    }]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(rows)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('Produto atualizado com sucesso', async () => {
      const result = await productsModel.update()
      expect(result).to.have.property('affectedRows', 1)
    })


  })
})