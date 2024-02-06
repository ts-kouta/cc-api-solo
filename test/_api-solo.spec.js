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
      const afterRes = await request.post("/api/memos").send(addMemo);
      afterRes.should.be.json;
      JSON.parse(afterRes.text)
        .find((memo) => memo.memo_id === 999)
        .memo.should.equal("memo999");
    });
  });
});
