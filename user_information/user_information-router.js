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

router.put("/:id", restricted, verifyPrivateId, (req, res) => {
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

router.delete("/:id", restricted, verifyPrivateId, (req, res) => {
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

// ---------------------- Custom Middleware ---------------------- //

function verifyPrivateId(req, res, next) {
  const id = req.params.id;

  private.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "Contact Not Found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
