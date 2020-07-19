const router = require("express").Router();

const Info = require("./user-info-model.js");
const restricted = require("../middleware/restricted-middleware.js");

router.get("/", (req, res) => {
  Info.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", verifyInfoId, (req, res) => {
  const id = req.params.id;

  Info.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id/tasks", restricted, verifyInfoId, (req, res) => {
  const id = req.params.id;

  Info.findById(id)
    .then((user) => {
      Users.getTasksByUserId(id)
        .then((tasks) => {
          res.status(200).json({ ...user, tasks });
          console.log(user, tasks);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


// ---------------------- Custom Middleware ---------------------- //

function verifyInfoId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then((item) => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = router;