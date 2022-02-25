const {expect} = require('chai')

const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const productsService = require('../../../services/productsService')

describe('Cria produtos no SERVICE', () => {
   
  describe('Cria um novo produto', () => {

    const name = 'Hamburguer vegano'
    const quantity = 1

    const rows = {
      affectedRows: 1
    }
    beforeEach(() => {
      sinon.stub(productsModel, 'create').resolves(rows)
      sinon.stub(productsModel, 'getAll').resolves([])
    })

    afterEach(() => {
      productsModel.create.restore()
      productsModel.getAll.restore()
    })


    it('cria um produto válido', async () => {
      const result = await productsService.create(name, quantity)
      expect(result.affectedRows).to.be.eq(1)
    })
  })

})