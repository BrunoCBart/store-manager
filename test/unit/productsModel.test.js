const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection')

const productsModel = require('../../models/productsModel')

describe('Lista todos os produtos ou um produto específico', () => {
  describe('Todos os produtos, mas sem produtos no BD', () =>{
    const response = [[]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(response)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('retorna um array', async () => {
      const result = await productsModel.getAll()
      expect(result).to.be.an('array')
    })

    it('retorna um array vazio', async () => {
      const result = await productsModel.getAll()
      expect(result).to.be.empty
    })
  })

  describe('Todos os produtos, mas com produtos no BD', () => {
    const products = [[
      {
      name: 'Bolo vegano',
      quantity: 10,
    },
    {
      name: 'Hamburguer de soja',
      quantity: 10,
    }
  ]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(products)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('retorna um array com items', async () => {
      const result = await productsModel.getAll()
      expect(result).not.to.be.empty
    })

    it('retorna um array com dois items', async () => {
      const result = await productsModel.getAll()
      expect(result).to.have.lengthOf(2)
    })
  })

  describe('Produto específico', () => {

    const product = [[
      {
      name: 'Bolo vegano',
      quantity: 10,
    },
  ]]
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(product)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('Retorna um produto', async () => {
      const result = await productsModel.getById()
      expect(result).to.have.lengthOf(1)
    })
   
  })
})