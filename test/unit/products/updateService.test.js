const {expect} = require('chai')

const productsModel = require('../../../models/productsModel')
const sinon = require('sinon');

const productsService = require('../../../services/productsService')

describe('Atualiza um produto do banco de dados caso exista', () => {
  
  describe('produto não existe', () => {
    const message = {error: { message: "Product not found" }, status: 404}
    const name = "Nao existo"
    const quantity = 1

    beforeEach(() => {
      sinon.stub(productsModel, 'update').resolves([])
      sinon.stub(productsModel, 'getAll').resolves([])
    })
    
    afterEach(() => {
      productsModel.update.restore()
      productsModel.getAll.restore()
    })

    it('produto não pode ser alterado', async () => {
      const result = await productsService.update(name, quantity)
      expect(result).to.deep.eq(message)
    })
  })
 
  describe('produto existe', () => {
    const updatedProduct = { id: 1, name: "produto", quantity: 15 }
    
    const name = "produto"
    const quantity = 1

    beforeEach(() => {
      sinon.stub(productsModel, 'update').resolves(updatedProduct)
      sinon.stub(productsModel, 'getAll').resolves([updatedProduct])
    })

    afterEach(() => {
      productsModel.update.restore()
    })

    it('Produto atualizado com sucesso', async () => {
      const result = await productsService.update(name, quantity)
      expect(result).to.deep.eq(updatedProduct)
    })


  })
})