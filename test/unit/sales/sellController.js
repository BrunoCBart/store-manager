const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const sinon = require("sinon");

const { expect } = require("chai");

describe("Realiza vendas no CONTROLLER", () => {
  const request = {};
  const response = {};
  const next = sinon.stub().returns();

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Reazliza uma venda sem passar o body correto", () => {
    const error = {
      error: { message: '"productId" is required' },
      status: 400,
    };
    request.body = { quantity: 1 };
    before(() => {
      sinon.stub(salesService, "sell").resolves(error);
    });

    after(() => {
      salesService.sell.restore();
    });

    it("Retorna erro", async () => {
      await salesController.sell(request, response);
      expect(
        response.json.calledWith({ message: '"productId" is required' })
      ).to.be.eq(true);
    });

    it("response chamada com status 404", async () => {
      await salesController.sell(request, response);
      expect(response.status.calledWith(400)).to.be.eq(true);
    });
  });

  describe("Realiza uma venda correta", () => {
    const sale = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
    request.body = { productId: 1, quantity: 5 };
    before(() => {
      sinon.stub(salesService, "sell").resolves(sale);
    });

    after(() => {
      salesService.sell.restore();
    });

    it("Retorna erro", async () => {
      await salesController.sell(request, response);
      expect(response.json.calledWith(sale)).to.be.eq(true);
    });

    it("response chamada com status 404", async () => {
      await salesController.sell(request, response);
      expect(response.status.calledWith(201)).to.be.eq(true);
    });
  });

  describe("Testa caso de erro", () => {
    before(() => {
      sinon.stub(salesService, "sell").throws(new Error("Erro de conexao"));
    });

    after(() => {
      salesService.sell.restore();
    });
    it("throw error", async () => {
      await salesController.sell(request, response, next);

      expect(next.firstCall.firstArg.message).to.be.eq("Erro de conexao");
    });
  });
});
