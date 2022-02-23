const productsService = require('../../services/productsService')
const productsController = require('../../controllers/productsController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista todos os produtos ou um produto específico no CONTROLLER', () => {
  const request = {}
  const response = {}

  beforeEach(() => {
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })
  describe('Todos os produtos, mas sem produtos no BD', () =>{

    beforeEach(() => {
      
      sinon.stub(productsService, 'getAll').resolves([])
    })

    afterEach(() => {
      productsService.getAll.restore()
    })

    it('response chamada com status 200', async () => {
      await productsController.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.eq(true)
    })

    it('retorna um array vazio', async () => {
      await productsController.getAll(request, response)
      expect(response.json.calledWith(sinon.match.array)).to.be.eq(true)
      
    })
  })

  describe('Todos os produtos, mas com produtos no BD', () => {
    const products = [
      {
      name: 'Bolo vegano',
      quantity: 10,
    },
    {
      name: 'Hamburguer de soja',
      quantity: 10,
    }
  ]

  beforeEach(() => {
    sinon.stub(productsService, 'getAll').resolves(products)
  })

  afterEach(() => {
    productsService.getAll.restore()
  })

  it('response chamada com status 200', async () => {
    await productsController.getAll(request, response)
    expect(response.status.calledWith(200)).to.be.eq(true)
  })

    it('retorna um array com items', async () => {
      await productsController.getAll()
      expect(response.json.calledWith(products)).to.be.eq(true)
    })
  })

  describe('Produto específico', () => {

    const product = [
      {
      name: 'Bolo vegano',
      quantity: 10,
    },
  ]
    beforeEach(() => {
      sinon.stub(productsService, 'getById').resolves(product)
    })

    afterEach(() => {
      productsModel.getById.restore()
    })

    it('response chamada com status 200', async () => {
      await productsController.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.eq(true)
    })

    it('Retorna um produto', async () => {
      await productsController.getAll()
      expect(response.json.calledWith(product)).to.be.eq(true)
    })
   
  })
})