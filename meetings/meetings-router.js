const express = require("express");

const meetings = require("./meetings-model.js");

const router = express.Router();

const restricted = require("../middleware/restricted-middleware.js");

router.get("/", (req, res) => {
  meetings
    .find()
    .then((meetings) => {
      res.status(200).json(meetings);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to get info from database", error: err })
    );
});

router.get("/:id", restricted, verifyMeetingId, (req, res) => {
  const id = req.params.id;

  meetings
    .findById(id)
    .then((meeting) => {
      res.status(200).json(meeting);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/search/:filter", (req, res) => {
  meetings
    .findBy(filter)
    .then((meetings) => {
      res.status(200).json(meetings);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Failed to get info from database", error: err })
    );
});

router.post("/", restricted, (req, res) => {
  const body = req.body;

  meetings
    .add(body)
    .then((neighborhood) => res.status(201).json(neighborhood))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const body = req.body;

  meetings
    .update(id, body)
    .then(() => {
      meetings.findById(id).then((update) => {
        res.status(200).json(update);
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Failed to update meeting.", error: err })
    );
});

router.delete("/:id", restricted, (req, res) => {
  meetings
    .remove(req.params.id)
    .then((the) => res.status(204).end())
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Failed to delete meeting.", error: err });
    });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyMeetingId(req, res, next) {
  const id = req.params.id;

  meetings.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "Meeting Not Found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
