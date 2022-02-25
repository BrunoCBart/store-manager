const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista todos as vendas ou uma venda específica no CONTROLLER', () => {
  
  const request = {}
  const response = {}

  beforeEach(() => {
    request.params = 1
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Venda específica mas sem vendas', () => {
    const sale = null
    beforeEach(() => {
      sinon.stub(salesService, 'getById').resolves(sale)
    })

    afterEach(() => {
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
})
