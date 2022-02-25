const {expect} = require('chai')

const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController')
const sinon = require('sinon');


describe('Atualiza um produto do banco de dados caso exista', () => {

     
  const request = {}
  const response = {}

  beforeEach(() => {
    request.body = {}
    request.params = {id: 1}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('produto não existe', () => {
    const productNotFound = { error: { message: 'Product not found' }, status: 404 };
    beforeEach(() => {
      sinon.stub(productsService, 'update').resolves(productNotFound)
    })

    afterEach(() => {
      productsService.update.restore()
    })

    it('retorna status 404', async () => {
      await productsController.update(request, response)
      expect(response.status.calledWith(404)).to.eq(true)
    })

    it('retora erro produto não encontrado', async () => {
      await productsController.update(request, response)
      expect(response.json.calledWith(productNotFound.error)).to.deep.eq(true)
    })
  })
  describe('produto existe', () => {
    const updatedProduct = { id: 1, name: "produto", quantity: 15 }
    beforeEach(() => {
      sinon.stub(productsService, 'update').resolves(updatedProduct)
    })

    afterEach(() => {
      productsService.update.restore()
    })

    it('retorna status 201 criado com sucesso', async () => {
      await productsController.update(request, response)
      expect(response.status.calledWith(200)).to.eq(true)
    })

    it('json retorna mensagem de sucesso', async () => {
      await productsController.update(request, response)
      expect(response.json.calledWith(updatedProduct)).to.eq(true)
    })


  })
})