const express = require("express");
const db = require("../utils/database");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todo0 = await db.execute("SELECT * FROM todo WHERE status = 0");
    let [rows] = todo0;
    const todo1 = await db.execute("SELECT * FROM todo WHERE status = 1");
    let [rows2] = todo1;
    res.json({
      status: "success",
      todo0: rows,
      todo1: rows2,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const todo = await db.execute(
      "INSERT INTO todo(name,status) VALUES (?,?)",
      [name, 0]
    );
    let [rows] = todo;
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db.execute("SELECT status FROM todo WHERE id = ?", [id]);
    let [rows] = todo;
    if (rows.length > 0) {
      const currentStatus = rows[0].status;
      const newStatus = currentStatus == 0 ? 1 : 0;
      const updateResult = await db.execute(
        "UPDATE todo SET status = ? WHERE id = ?",
        [newStatus, id]
      );

      if (updateResult[0].affectedRows > 0) {
        res.json({
          status: "success",
          newStatus: newStatus,
        });
      } else {
        res.json({
          status: "error",
          message: "Todo not found",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db.execute("DELETE FROM todo WHERE id = ?", [id]);
    let [rows] = todo;
    console.log(rows);
    if (rows.affectedRows > 0) {
      res.json({
        status: "success",
        todos: rows,
      });
    } else {
      res.json({
        status: "error",
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
