const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista todos as vendas no CONTROLLER', () => {
  
  const request = {}
  const response = {}

  before(() => {
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Todos as vendas, mas sem vendas no BD', () =>{

    before(() => {
      
      sinon.stub(salesService, 'getAll').resolves([])
    })

    after(() => {
      salesService.getAll.restore()
    })

    it('response chamada com status 200', async () => {
      await salesController.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.eq(true)
    })

    it('retorna um array vazio', async () => {
      await salesController.getAll(request, response)
      expect(response.json.calledWith(sinon.match.array)).to.be.eq(true)
      
    })
  })

  describe('Todos as vendas, mas com vendas no BD', () => {
    const sales = [
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
      },
      {
        saleId: 2,
        date: "2021-09-09T20:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 2,
        date: "2021-09-09T20:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]

    before(() => {
      sinon.stub(salesService, 'getAll').resolves(sales)
    })

    after(() => {
      salesService.getAll.restore()
    })
    it('response chamada com status 200', async () => {
      await salesController.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.eq(true)
    })

    it('retorna um array com items', async () => {
      await salesController.getAll(request, response)
      expect(response.json.calledWith(sales)).to.be.eq(true)
    })
  })

})
