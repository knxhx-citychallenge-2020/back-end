const express = require("express");

const public = require("./public-model.js");

const router = express.Router();

const restricted = require("../middleware/restricted-middleware.js");

router.get("/", (req, res) => {
  public
    .find()
    .then((public) => {
      res.status(200).json(public);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to get info from database", error: err })
    );
});

router.get("/:id", restricted, verifyNeighborhoodId, (req, res) => {
  const id = req.params.id;

  public.findById(id)
    .then((neighborhood) => {
      res.status(200).json(neighborhood);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/search/:filter", (req, res) => {
    public.findBy(filter)
        .then((public) => {
            res.status(200).json(public);
        })
        .catch((err) =>
            res
                .status(500)
                .json({ message: "Failed to get info from database", error: err })
        );
});

router.post("/", restricted, (req, res) => {

    const body = req.body;

  public
    .add(body)
    .then((neighborhood) => res.status(201).json(neighborhood))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", restricted, verifyNeighborhoodId, (req, res) => {
  const { id } = req.params;
  const body = req.body;

  public
    .update(id, body)
    .then(() => {
      public.findById(id).then((update) => {
        res.status(200).json(update);
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Failed to update organization.", error: err })
    );
});

router.delete(
  "/:id",
  restricted, verifyNeighborhoodId,
  (req, res) => {
    public
      .remove(req.params.id)
      .then((the) => res.status(204).end())
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "Failed to delete organization", error: err });
      });
  }
);

// ---------------------- Custom Middleware ---------------------- //

function verifyNeighborhoodId(req, res, next) {
  const id = req.params.id;

  public.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "Neighborhood Not Found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
