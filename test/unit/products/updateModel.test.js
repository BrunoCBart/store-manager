const {expect} = require('chai')

const productsModel = require('../../../models/productsModel')
const sinon = require('sinon');

const connection = require('../../../models/connection')



describe('Atualiza um produto do banco de dados caso exista', () => {
  describe('produto não existe', () => {
    const productNotFound = [[]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(productNotFound)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('produto não atualizado', async () => {
      const result = await productsModel.update()
      expect(result).to.be.eq(undefined)
    })
  })
  describe('produto existe', () => {
    const updatedProduct = [[
      { id: 1, name: "produto", quantity: 15 }
    ]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(updatedProduct)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('Produto atualizado com sucesso', async () => {
      const result = await productsModel.update()
      expect(result).to.include.all.keys('id', 'name', 'quantity')
    })


  })
})