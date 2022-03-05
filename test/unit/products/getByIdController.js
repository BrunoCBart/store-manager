const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const sinon = require("sinon");

const { expect } = require("chai");

describe("Lista produto específico no CONTROLLER", () => {
  const request = {};
  const response = {};
  const next = sinon.stub().returns();

  before(() => {
    request.params = { id: 1 };
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Tenta listar um produto que não existe", () => {
    const product = null;
    before(() => {
      sinon.stub(productsService, "getById").resolves(product);
    });

    after(() => {
      productsService.getById.restore();
    });

    it("Retorna zero produtos", async () => {
      await productsController.getById(request, response);
      expect(
        response.json.calledWith({ message: "Product not found" })
      ).to.be.eq(true);
    });

    it("response chamada com status 404", async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.eq(true);
    });
  });

  describe("Lista um produo existente", () => {
    const product = { id: 1, name: "Hamburguer vegano", quantity: 1 };
    before(() => {
      sinon.stub(productsService, "getById").resolves(product);
    });

    after(() => {
      productsService.getById.restore();
    });

    it("Retorna um produto", async () => {
      await productsController.getById(request, response);
      expect(response.json.calledWith(product)).to.be.eq(true);
    });

    it("response chamada com status 200", async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
    });
  });

  describe("Testa caso de erro", () => {
    before(() => {
      sinon
        .stub(productsService, "getById")
        .throws(new Error("Erro de conexao"));
    });

    after(() => {
      productsService.getById.restore();
    });
    it("throw error", async () => {
      await productsController.getById(request, response, next);

      expect(next.firstCall.firstArg.message).to.be.eq("Erro de conexao");
    });
  });
});
