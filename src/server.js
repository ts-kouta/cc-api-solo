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
    const memoId = await knex("memo").returning("id").insert(req.body);
    res.send(memoId[0]);
  });

  app.patch("/api/memos/:memo_id", async (req, res) => {
    const updatedMemoId = await knex("memo")
      .returning("id")
      .update(req.body)
      .where("id", +req.params.memo_id);
    res.send(updatedMemoId[0]);
  });

  app.delete("/api/memos/:memo_id", async (req, res) => {
    const deletedMemoId = await knex("memo")
      .del()
      .returning("id")
      .where("id", +req.params.memo_id);
    res.send(deletedMemoId[0]);
  });

  return app;
};

module.exports = { setupExpressServer };
