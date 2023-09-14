const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoute = require("./routes/todo.routes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/todo", todoRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
