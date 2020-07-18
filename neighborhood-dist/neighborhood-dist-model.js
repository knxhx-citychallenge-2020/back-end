const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("neighborhood_district").select("id", "name");
}

function findBy(filter) {
  return db("neighborhood_district").where(filter);
}

async function add(user) {
  const [id] = await db("neighborhood_district").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("neighborhood_district").where({ id }).first();
}

