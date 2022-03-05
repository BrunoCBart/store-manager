const { expect } = require("chai");

const sinon = require("sinon");

const productsController = require("../../../controllers/productsController");
const productsService = require("../../../services/productsService");

describe("Deleta produtos no CONTROLLER", () => {
  const request = {};
  const response = {};
  const next = sinon.stub().returns();

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.end = sinon.stub().returns();
    response.json = sinon.stub().returns();
  });

  describe("Deleta um produto", () => {
    request.params = { id: 1 };
    before(() => {
      sinon.stub(productsService, "exclude").resolves({});
    });

    after(() => {
      productsService.exclude.restore();
    });
    it("Deleta", async () => {
      await productsController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    });

    
  });

  describe("Deleta um produto que não existe", () => {
    const error = { error: { message: "Product not found" }, status: 404 };

    before(() => {
      sinon.stub(productsService, "exclude").resolves(error);
    });

    after(() => {
      productsService.exclude.restore();
    });
    it("Rertorna erro 404", async () => {
      await productsController.exclude(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('Retorna erro', async () => {
      await productsController.exclude(request, response);
      expect(response.json.calledWith(error.error)).to.be.eq(true);
    })
  });

  describe("Testa caso de erro", () => {
    before(() => {
      sinon
        .stub(productsService, "exclude")
        .throws(new Error("Erro de conexao"));
    });

    after(() => {
      productsService.exclude.restore();
    });
    it("throw error", async () => {
      await productsController.exclude(request, response, next);

      expect(next.firstCall.firstArg.message).to.be.eq("Erro de conexao");
    });
  });
});
