const express = require("express");
const path = require("path");

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

  app.get("/api/memos", (req, res) => {
    res.send(memo);
  });

  app.post("/api/memos", (req, res) => {
    memo.push(req.body);
    res.send(memo);
  });

  return app;
};

module.exports = { setupExpressServer };
