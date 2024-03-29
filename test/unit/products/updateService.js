const {expect} = require('chai')

const productsModel = require('../../../models/productsModel')
const sinon = require('sinon');

const productsService = require('../../../services/productsService')

describe('Atualiza um produto do banco de dados caso exista no SERVICE', () => {
  
  describe('produto não existe', () => {
    const message = {error: { message: "Product not found" }, status: 404}
    const name = "Nao existo"
    const quantity = 1

    before(() => {
      sinon.stub(productsModel, 'update').resolves([])
      sinon.stub(productsModel, 'getById').resolves(false)
      sinon.stub(productsModel, 'getByName').resolves(undefined)
    })
    
    after(() => {
      productsModel.update.restore()
      productsModel.getById.restore()
      productsModel.getByName.restore()
    })

    it('produto não pode ser alterado', async () => {
      const result = await productsService.update(1, name, quantity)
      expect(result).to.deep.eq(message)
    })
  })
 
  describe('produto existe', () => {
    const updatedProduct = { id: 1, name: "produto", quantity: 15 }

    const insertId = 1
    
    const name = "produto"
    const quantity = 15
    const id = 1

    before(() => {
      sinon.stub(productsModel, 'update').resolves(insertId)
      sinon.stub(productsModel, 'getById').resolves(true)
      sinon.stub(productsModel, 'getByName').resolves({id:1, name:'Martelo de Thor', quantity: 10})
    })

    after(() => {
      productsModel.update.restore()
    })

    it('Produto atualizado com sucesso', async () => {
      const result = await productsService.update(id, name, quantity)
      expect(result).to.deep.eq(updatedProduct)
    })


  })
})