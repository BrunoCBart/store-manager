const salesService = require('../../../services/salesService')
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel')
const { expect } = require('chai')

describe('Realiza uma venda no SERVICE', () => {

  before(() => {
    sinon.stub(salesModel, 'getSaleId').resolves(1)
    sinon.stub(salesModel, 'sell').resolves()
    sinon.stub(salesModel, 'updateSoldProduct').resolves()
    sinon.stub(salesModel, 'getById').resolves({id:1, name:'Martelo do Thor', quantity: 4})
  })

  after(() => {
    salesModel.getSaleId.restore()
    salesModel.sell.restore()
    salesModel.updateSoldProduct.restore()
  })

  describe('Reazliza uma venda sem receber o body correto', () => {
    const error = { error: { message: '"productId" is required' }, status: 400 }
    const sales = [
      {quantity: 1}
    ]

    it('Retorna erro productId inválido', async () => {
      const result = await salesService.sell(sales)
      expect(result).to.deep.eq(error)
    })
  })

  describe('Realiza uma venda com o body correto', () => {
    const sales = [
      {productId: 1, quantity: 5}
    ]

    const response = {
      id: 1,
      itemsSold: [
          {
              productId: 1,
              quantity: 5
          }
      ]
  }
   
    it('Retorna uma venda', async () => {
     
      const result = await salesService.sell(sales)
      expect(result).to.deep.eq(response)
    })
  })
})