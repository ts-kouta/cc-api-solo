const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
chai.should();
const knex = require("../src/knex");

const server = setupExpressServer();

describe("Memo API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET api/memos", () => {
    it("should return all memo", async () => {
      const res = await request.get("/api/memos");
      res.should.be.json;

      const parsedRes = JSON.parse(res.text);

      parsedRes[0].should.have.property("id");
      parsedRes[0].should.have.property("create_date");
      parsedRes[0].should.have.property("update_date");

      parsedRes[0].memo.should.equal("memo1");
      parsedRes[1].memo.should.equal("memo2");
      parsedRes[2].memo.should.equal("memo3");
    });
  });

  describe("POST api/memos", () => {
    it("should add memo", async () => {
      const addMemo = {
        memo: "memo999",
        create_date: "2024-02-06",
        update_date: "2024-02-06",
      };
      const res = await request.post("/api/memos").send(addMemo);
      console.log(res.body[0].id);
      const result = await knex
        .select()
        .where("id", res.body[0].id)
        .from("memo");
      console.log(result);
      result[0].memo.should.equal("memo999");
    });

    describe("PATCH api/memos/:memo_id", () => {
      it("should update memo", async () => {
        const fixMemo = { memo: "memo998" };
        const res = await request.patch("/api/memos/1").send(fixMemo);
        res.should.be.json;
        const result = JSON.parse(res.text).find((memo) => memo.memo_id === 1);
        result.memo.should.equal("memo998");
      });
    });

    describe("DELETE api/memos/:memo_id", () => {
      it("should delete memo", async () => {
        const res = await request.delete("/api/memos/1");
        res.should.be.json;
        const result = JSON.parse(res.text).find((memo) => memo.memo_id === 1);
        result?.should.be.false;
      });
    });
  });
});
