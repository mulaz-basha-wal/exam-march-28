var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE cars (id int,name VARCHAR(200),price int, color ENUM('Black','Blue','Gray'), in_stock BOOLEAN)",
    function (err, results) {
      res.json({ err, results });
    }
  );
});

router.post("/", (req, res) => {
  const { id, name, price, color, in_stock } = req.body;
  const sql = `INSERT INTO cars VALUES(?,?,?,?,?)`;
  connector.query(sql, [id, name, price, color, in_stock], (error, result) => {
    res.json({ error, result });
  });
});
router.get("/", (req, res) => {
  const sql = "select * from cars";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});
router.put("/:id", (req, res) => {
  const { name, price, color, in_stock } = req.body;
  const sql = `UPDATE cars set name=?, price=?, color=?, in_stock=?  where id="${req.params.id}";`;
  connector.query(sql, [name, price, color, in_stock], (error, result) => {
    res.json({ error, result });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `delete from cars where id="${req.params.id}";`;
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.delete("/delete/all", (req, res) => {
  const sql = "truncate table cars";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});
module.exports = router;
