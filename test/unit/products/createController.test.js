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


  describe('Tenta criar um produto inválido', () => {
    request.body = {name: 'Martelo de Thor', quantity: 5}
    const error  =  { error: { message: 'Product already exists' }, status: 409 }
    before(() => {
      sinon.stub(productsService, 'create').resolves(error)
     })
 
     after(() => {
       productsService.create.restore()
     })
     it('resposta 409 produto já existe', async () => {
      await productsController.create(request, response)
      expect(response.status.calledWith(409)).to.eq(true)
    })

    it('retorna mensagem de erro', async () => {
      await productsController.create(request, response)
      expect(response.json.calledWith({ message: 'Product already exists' })).to.deep.eq(true)
    })
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