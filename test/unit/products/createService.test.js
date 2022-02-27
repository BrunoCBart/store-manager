const {expect} = require('chai')

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const productsService = require('../../../services/productsService')

describe('Cria produtos no SERVICE', () => {
   
  describe('Cria um novo produto', () => {
    const name = 'Hamburguer vegano'
    const quantity = 1
    
    const product = {name, quantity}

    const insertId = 1
    before(() => {
      sinon.stub(productsService, 'create').resolves({id:insertId, ...product})
      // sinon.stub(productsModel, 'create').resolves(insertId)
      // sinon.stub(productsModel, 'getByName').resolves(product)
    })

    after(() => {
      // productsModel.create.restore()
      // productsModel.getByName.restore()
    })


    it('cria um produto válido', async () => {
      const result = await productsService.create(name, quantity)
      expect(result).to.have.property('id', 1)
      expect(result).to.have.property('name', 'Hamburguer vegano')
      expect(result).to.have.property('quantity', 1)
    })
  })

})