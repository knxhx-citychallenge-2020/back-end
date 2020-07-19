const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("user_credentials").select("id", "username");
}

function findBy(filter) {
  return db("user_credentials").where(filter);
}

async function add(user) {
  const [id] = await db("user_credentials").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("user_credentials")
    .where({ id })
    .first();
}
