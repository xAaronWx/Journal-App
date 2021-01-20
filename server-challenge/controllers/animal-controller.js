var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Animal = sequelize.import("../models/animal");

router.post("/create", function (req, res) {
  const animalCreate = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
  };

  Animal.create(animalCreate)
    .then((animal) =>
      res
        .status(200)
        .json({ message: "Your animal has been created", data: animal })
    )
    .then((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Animal.findAll()
    .then((animal) => res.status(200).json(animal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", function (req, res) {
  const query = { where: { id: req.params.id } };

  Animal.destroy(query)
    .then(() => res.status(200).json({ message: "Animal has been deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
