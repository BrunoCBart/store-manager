const { expect } = require("chai");

const sinon = require("sinon");

const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");

describe("Deleta vendas no CONTROLLER", () => {
  const request = {};
  const response = {};
  const next = sinon.stub().returns();

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.end = sinon.stub().returns();
    response.json = sinon.stub().returns();
  });

  describe("Deleta uma venda", () => {
    request.params = { id: 1 };
    before(() => {
      sinon.stub(salesService, "exclude").resolves({});
    });

    after(() => {
      salesService.exclude.restore();
    });
    it("Deleta", async () => {
      await salesController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    });
  });

  describe("Deleta um produto que não existe", () => {
    const error = { error: { message: 'Sale not found' }, status: 404 };

    before(() => {
      sinon.stub(salesService, "exclude").resolves(error);
    });

    after(() => {
      salesService.exclude.restore();
    });
    it("Rertorna erro 404", async () => {
      await salesController.exclude(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('Retorna erro', async () => {
      await salesController.exclude(request, response);
      expect(response.json.calledWith(error.error)).to.be.eq(true);
    })
  });

  describe("Testa caso de erro", () => {
    before(() => {
      sinon
        .stub(salesService, "exclude")
        .throws(new Error("Erro de conexao"));
    });

    after(() => {
      salesService.exclude.restore();
    });
    it("throw error", async () => {
      await salesController.exclude(request, response, next);

      expect(next.firstCall.firstArg.message).to.be.eq("Erro de conexao");
    });
  });
});
