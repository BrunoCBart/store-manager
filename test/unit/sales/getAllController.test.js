const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController')
const sinon = require('sinon');

const { expect } = require('chai')

describe('Lista todos as vendas ou uma venda específica no CONTROLLER', () => {
  
  const request = {}
  const response = {}

  beforeEach(() => {
    request.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  })

  describe('Todos as vendas, mas sem vendas no BD', () =>{

    beforeEach(() => {
      
      sinon.stub(salesService, 'getAll').resolves([])
    })

    afterEach(() => {
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

  describe('Todos as vendas, mas cas vendas no BD', () => {
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

    beforeEach(() => {
      sinon.stub(salesService, 'getAll').resolves(sales)
    })

    afterEach(() => {
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

  describe('Venda específica', () => {

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
  
    beforeEach(() => {
      request.params = { id: 1 }
      
      sinon.stub(salesService, 'getById').resolves(sale)
    })

    afterEach(() => {
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
