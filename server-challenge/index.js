require("dotenv").config(); // Password config
var express = require("express");
var app = express();
var sequelize = require("./db");
app.use(express.json());

var user = require("./controllers/user-controller");
var animal = require("./controllers/animal-controller");

sequelize.sync();

app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/user", user);
app.use("/animal", animal);

app.listen(3000, function () {
  console.log("App is listening on port 2999+1");
});
