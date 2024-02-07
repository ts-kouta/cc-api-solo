const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
chai.should();
const knex = require("../src/knex");

const server = setupExpressServer();
let testMemoId;

describe("Memo API Server", () => {
  let request;
  before(async () => {
    // テストケース作成　（作成したデータはテストケース内でデリート）
    request = chai.request(server);
    const testMemo = {
      memo: "memoTest",
      create_date: "2024-02-06",
      update_date: "2024-02-06",
    };
    const res = await request.post("/api/memos").send(testMemo);
    testMemoId = res.body.id;
    console.log("testMemoId:" + testMemoId);
  });

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
      const result = await knex.select().where("id", res.body.id).from("memo");
      result[0].memo.should.equal("memo999");
    });

    describe("PATCH api/memos/:memo_id", () => {
      it("should update memo", async () => {
        const fixMemo = { memo: "memo998" };
        const res = await request
          .patch(`/api/memos/${testMemoId}`)
          .send(fixMemo);
        const result = await knex
          .select()
          .where("id", res.body.id)
          .from("memo");
        result[0].memo.should.equal("memo998");
      });
    });

    describe("DELETE api/memos/:memo_id", () => {
      it("should delete memo", async () => {
        const res = await request.delete(`/api/memos/${testMemoId}`);
        const result = await knex
          .select()
          .where("id", res.body.id)
          .from("memo");
        result[0]?.should.be.false;
      });
    });
  });
});
