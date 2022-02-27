const {expect} = require('chai')

const sinon = require('sinon');

const productsController = require('../../../controllers/productsController')
const productsService = require('../../../services/productsService')

describe('Cria produtos do no CONTROLLER', () => {
   
  const request = {}
  const response = {}

  before(() => {
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Cria um novo produto', () => {
    request.body = {name: 'Hamburguer vegano', quantity: 1}
    const newProduct = {id: 1, name: 'Hamburguer vegano', quantity: 1}
    before(() => {
     sinon.stub(productsService, 'create').resolves(newProduct)
    })

    after(() => {
      productsService.create.restore()
    })

    it('resposta 201 novo produto criado', async () => {
      await productsController.create(request, response)
      expect(response.status.calledWith(201)).to.eq(true)
    })

    it('cria um produto válido', async () => {
      await productsController.create(request, response)
      expect(response.json.calledWith(newProduct)).to.be.deep.eq(true)
    })
  })


})