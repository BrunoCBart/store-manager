const productsService = require('../../../services/productsService')
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const { expect } = require('chai')

describe('Lista todos os produtos ou um produto específico no SERVICE', () => {
  describe('Todos os produtos, mas sem produtos no BD', () =>{
    const response = []
    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').resolves(response)
    })

    afterEach(() => {
      productsModel.getAll.restore()
    })

    it('retorna array vazio', async () => {
      const result = await productsService.getAll()
      expect(result).to.be.an('array').and.to.be.empty
    })


  })

  describe('Todos os produtos, mas com produtos no BD', () => {
    const products = [
      {
      id: 1,
      name: 'Bolo vegano',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Hamburguer de soja',
      quantity: 10,
    }
  ]

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').resolves(products)
    })

    afterEach(() => {
      productsModel.getAll.restore()
    })

    it('retorna um array com items', async () => {
      const result = await productsService.getAll()
      expect(result).to.not.be.empty
    })

    it('retorna um array com dois items', async () => {
      const result = await productsService.getAll()
      expect(result).to.have.lengthOf(2)
    })
  })

  describe('Produto específico', () => {

    const product = {
      id: 1,
      name: 'Bolo Vegano',
      quantity: 10,
    }
    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(product)
    })

    afterEach(() => {
      productsModel.getById.restore()
    })

    it('Retorna um produto', async () => {
      const result = await productsService.getById()
      expect(result).to.include.all.keys('name', 'quantity')
    })
   
  })

})