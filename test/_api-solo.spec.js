const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
chai.should();

const server = setupExpressServer();

describe("Memo API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET api/memos", () => {
    it("should return all memo", async () => {
      const res = await request.get("/api/memos");
      const expected = [
        {
          memo_id: 1,
          memo: "memo1",
          create_date: "2024-02-05",
          update_date: "2024-02-06",
        },
        {
          memo_id: 2,
          memo: "memo2",
          create_date: "2024-02-06",
          update_date: "2024-02-06",
        },
      ];
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("POST api/memos", () => {
    it("should add memo", async () => {
      const addMemo = {
        memo_id: 999,
        memo: "memo999",
        create_date: "2024-02-06",
        update_date: "2024-02-06",
      };
      const res = await request.post("/api/memos").send(addMemo);
      res.should.be.json;
      JSON.parse(res.text)
        .find((memo) => memo.memo_id === 999)
        .memo.should.equal("memo999");
    });

    describe("PATCH api/memos", () => {
      it("should update memo", async () => {
        const fixMemo = { memo: "memo998" };
        const res = await request.patch("/api/memos/1").send(fixMemo);
        res.should.be.json;
        const result = JSON.parse(res.text).find((memo) => memo.memo_id === 1);
        console.log(result);
        result.memo.should.equal("memo998");
      });
    });
  });
});
