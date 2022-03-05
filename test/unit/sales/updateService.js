const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')
const sinon = require('sinon');

const { expect } = require('chai');

describe('Atualiza uma venda no SERVICE', () => {
  describe('Atualiza uma venda de maneira errada', () => {
  const error = { error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 }

  const sales = [
    {productId: 1, quantity: 0}
  ]

    it('Retorna erro', async () => {
      const result = await salesService.update(1, sales)
      expect(result).to.be.deep.eq(error)
    })
  })


  describe('Atualiza uma venda corretamente', () => {
    const sales = [
      {productId: 1, quantity: 10}
    ]

    const updatedSales = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 10
        }
      ]
    }
  
    before(() => {
      sinon.stub(salesModel, 'update').resolves()
    })
  
    after(() => {
      salesModel.update.restore()
    })

    it('Atualiza uma venda', async () => {
      const result = await salesService.update(1, sales)
      expect(result).to.be.deep.eq(updatedSales)
    })
  })
  
})
