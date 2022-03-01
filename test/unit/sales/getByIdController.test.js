const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista todos as vendas ou uma venda específica no CONTROLLER', () => {
  
  const request = {}
  const response = {}

  before(() => {
    request.params = {id: 1}
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Venda inexistente', () => {
    const sale = { error: { message: 'Sale not found' }, status: 404 }
    before(() => {
      sinon.stub(salesService, 'getById').resolves(sale)
    })

    after(() => {
      salesService.getById.restore()
    })

   
    it('Retorna as vendas', async () => {
      await salesController.getById(request, response)
      expect(response.json.calledWith( { "message": "Sale not found" })).to.be.eq(true)
    })

    it('response chamada com status 404', async () => {
      await salesController.getById(request, response)
      expect(response.status.calledWith(404)).to.be.eq(true)
    })

  })

  describe('Venda existente', () => {

    const sale = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]
  
    before(() => {
      request.params = { id: 1 }
      
      sinon.stub(salesService, 'getById').resolves(sale)
    })

    after(() => {
      salesService.getById.restore()
    })

    it('response chamada com status 200', async () => {
      await salesController.getById(request, response)
      expect(response.status.calledWith(200)).to.be.eq(true)
    })

    it('Retorna um produto', async () => {
     await salesController.getById(request, response)
      expect(response.json.calledWith(sale))
    })
   
  })
})
