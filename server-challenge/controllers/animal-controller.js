const { query } = require("express");
var express = require("express");
var router = express.Router();
let validateSession = require("../middleware/validate-session");
var sequelize = require("../db");
var Animal = sequelize.import("../models/animal");

router.post("/create", validateSession, function (req, res) {
  const animalCreate = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
    userId: req.user.id,
  };

  Animal.create(animalCreate)
    .then((animal) =>
      res
        .status(200)
        .json({ message: "Your animal has been created", data: animal })
    )
    .catch((err) =>
      res.status(500).json({ error: err, message: "You cannot create this" })
    );
});

router.get("/", validateSession, (req, res) => {
  Animal.findAll()
    .then((animal) => res.status(200).json(animal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, (req, res) => {
  let userId = req.user.id;
  Animal.findAll({
    where: { owner: userId },
  })
    .then((animal) => res.status(200).json(animal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };

  Animal.destroy(query)
    .then(() => res.status(200).json({ message: "Animal has been deleted" }))
    .catch((err) =>
      res.status(500).json({
        error: err,
        message: "There was a problem deleting the animal",
      })
    );
});

router.put("/update/:id", validateSession, (req, res) => {
  Animal.update(req.body, {
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })
    .then((animal) => res.status(200).json(animal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
  Animal.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  }).then(
    (deleteSuccess = (recordsChanged) => {
      res
        .status(200)
        .json({ message: `${recordsChanged} record has been deleted.` });
    }),
    (deleteFail = (err) => {
      res.status(500).json({ message: "Failed to delete", error: err });
    })
  );
});

module.exports = router;
