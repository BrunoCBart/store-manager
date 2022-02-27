const {expect} = require('chai')

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const connection = require('../../../models/connection')

describe('Cria produtos no SERVICE', () => {
   
  describe('Cria um novo produto', () => {
    const name = 'Hamburguer vegano'
    const quantity = 1

    const result = [{insertId: 1}]
    
    before(() => {
     sinon.stub(connection, 'execute').resolves(result)
    })

    after(() => {
      connection.execute.restore()
    })


    it('cria um produto válido', async () => {
      const result = await productsModel.create(name, quantity)
      expect(result).to.be.eq(1)
    })
  })

})