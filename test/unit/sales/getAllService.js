const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Lista todos as vendas no SERVICE', () => {
  describe('Todos as vendas, mas sem vendas no BD', () =>{
    const response = []
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(response)
    })

    after(() => {
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

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(sales)
    })

    after(() => {
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

})