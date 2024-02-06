const express = require("express");
const path = require("path");
const knex = require("./knex");

const app = express();
app.use(express.json());

const memo = [
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

setupExpressServer = () => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/api/memos", async (req, res) => {
    const memo = await knex.select("*").from("memo");
    res.send(memo);
  });

  app.post("/api/memos", async (req, res) => {
    const memo = await knex("memo").returning("id").insert(req.body);
    res.send(memo);
  });

  app.patch("/api/memos/:memo_id", (req, res) => {
    const targetIndex = memo.findIndex(
      (memo) => +memo.memo_id === +req.params.memo_id
    );
    memo[targetIndex].memo = req.body.memo;
    res.send(memo);
  });

  app.delete("/api/memos/:memo_id", (req, res) => {
    const targetIndex = memo.findIndex(
      (memo) => +memo.memo_id === +req.params.memo_id
    );
    memo.splice(targetIndex, 1);
    res.send(memo);
  });

  return app;
};

module.exports = { setupExpressServer };
