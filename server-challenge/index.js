require("dotenv").config(); // Password config
var express = require("express");
var app = express();
var sequelize = require("./db");
app.use(express.json());

var user = require("./controllers/user-controller");

sequelize.sync();

app.use(require("./middleware/headers"));

app.use("/user", user);

app.listen(3000, function () {
  console.log("App is listening on port 2999+1");
});
