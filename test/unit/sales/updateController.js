const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const sinon = require("sinon");

const { expect } = require("chai");

describe("Atualiza uma venda no CONTROLER", () => {
  const request = {};
  const response = {};
  const next = sinon.stub().returns();

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Atualiza uma venda de maneira errada", () => {
    const error = {
      error: { message: '"quantity" must be greater than or equal to 1' },
      status: 422,
    };
    request.params = { id: 1 };
    const sales = [{ productId: 1, quantity: 0 }];
    request.body = sales;

    before(() => {
      sinon.stub(salesService, "update").resolves(error);
    });

    after(() => {
      salesService.update.restore();
    });

    it("Resposta status 422", async () => {
      await salesController.update(request, response);
      expect(response.status.calledWith(422)).to.be.eq(true);
    });

    it("Retorna erro", async () => {
      await salesController.update(request, response);
      expect(
        response.json.calledWith({
          message: '"quantity" must be greater than or equal to 1',
        })
      ).to.be.eq(true);
    });
  });

  describe("Atualiza uma venda corretamente", () => {
    request.params = { id: 1 };
    const sales = [{ productId: 1, quantity: 10 }];

    request.body = sales;

    const updatedSales = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 10,
        },
      ],
    };

    before(() => {
      sinon.stub(salesService, "update").resolves(updatedSales);
    });

    after(() => {
      salesService.update.restore();
    });

    it("Resposta status 200", async () => {
      await salesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
    });

    it("Retorna venda atualizada", async () => {
      await salesController.update(request, response);
      expect(response.json.calledWith(updatedSales)).to.be.eq(true);
    });
  });

  describe("Testa caso de erro", () => {
    before(() => {
      sinon.stub(salesService, "update").throws(new Error("Erro de conexao"));
    });

    after(() => {
      salesService.update.restore();
    });
    it("throw error", async () => {
      await salesController.update(request, response, next);

      expect(next.firstCall.firstArg.message).to.be.eq("Erro de conexao");
    });
  });
});
