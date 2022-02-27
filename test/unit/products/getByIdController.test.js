const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista produto específico no CONTROLLER', () => {
  
  const request = {}
  const response = {}

  before(() => {
    request.params = { id: 1 }
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Produto específico mas sem produtos', () => {
    const product = null
    before(() => {
      sinon.stub(productsService, 'getById').resolves(product)
    })

    after(() => {
      productsService.getById.restore()
    })

   
    it('Retorna zero produtos', async () => {
      await productsController.getById(request, response)
      expect(response.json.calledWith({ "message": "Product not found" })).to.be.eq(true)
    })

    it('response chamada com status 404', async () => {
      await productsController.getById(request, response)
      expect(response.status.calledWith(404)).to.be.eq(true)
    })

  })
})
