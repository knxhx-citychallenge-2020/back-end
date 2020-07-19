const express = require("express");

const private = require("./private-model.js");

const router = express.Router();

const restricted = require("../middleware/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  private
    .find()
    .then((private) => {
      res.status(200).json(private);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to get info from database.", error: err })
    );
});

router.get("/search/:filter", restricted, (req, res) => {
  private
    .findBy(filter)
    .then((private) => {
      res.status(200).json(private);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to get info from database.", error: err })
    );
});

router.post("/", restricted, (req, res) => {
  const body = req.body;

  private
    .add(body)
    .then((private) => res.status(201).json(private))
    .catch((err) => res.status(500).json({ message: "Failed to add contact.", error: err }));
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const body = req.body;

  private
    .update(id, body)
    .then(() => {
      private.findById(id).then((update) => {
        res.status(200).json(update);
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Failed to update contact.", error: err })
    );
});

router.delete("/:id", restricted, (req, res) => {
  private
    .remove(req.params.id)
    .then((the) => res.status(204).end())
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Failed to delete contact.", error: err });
    });
});

module.exports = router;
