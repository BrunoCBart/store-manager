const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Lista todos as vendas ou uma venda específico no SERVICE', () => {
  describe('Todos as vendas, mas sem vendas no BD', () =>{
    const response = []
    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(response)
    })

    afterEach(() => {
      salesModel.getAll.restore()
    })

    it('retorna array vazio', async () => {
      const result = await salesService.getAll()
      expect(result).to.be.an('array').and.to.be.empty
    })

  })

  describe('Todos as vendas, mas com vendas no BD', () => {
    const sales = [
      {
        sale_id: 1,
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        sale_id: 1,
        date: "2021-09-09T04:54:54.000Z",
        product_id: 2,
        quantity: 2
      },
      {
        sale_id: 2,
        date: "2021-09-09T20:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        sale_id: 2,
        date: "2021-09-09T20:54:54.000Z",
        product_id: 2,
        quantity: 2
      }
    ]

    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(sales)
    })

    afterEach(() => {
      salesModel.getAll.restore()
    })

    it('retorna um array com items', async () => {
      const result = await salesService.getAll()
      expect(result).to.not.be.empty
    })

    it('retorna um array com dois items', async () => {
      const result = await salesService.getAll()
      expect(result).to.have.lengthOf(4)
    })
  })

  describe('Venda específico', () => {

    const sale = [
      {
        sale_id: 1,
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        sale_id: 1,
        date: "2021-09-09T04:54:54.000Z",
        product_id: 2,
        quantity: 2
      }
    ]
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves(sale)
    })

    afterEach(() => {
      salesModel.getById.restore()
    })

    it('Retorna um produto', async () => {
      const result = await salesService.getById()
      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity')
      expect(result[1]).to.include.all.keys('date', 'productId', 'quantity')
    })
   
  })
  describe('Venda específica mas sem vendas', () => {
    const product = []
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves(product)
    })

    afterEach(() => {
      salesModel.getById.restore()
    })

    it('Caso não tenha vendas retorna null', async () => {
      const result = await salesService.getById()
      expect(result).to.be.eq(null)
    })
  })
})