const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("neighborhood").select(
    "id",
    "district_id",
    "name",
    "type",
    "active",
    "email",
    "address",
    "phone",
    "sector",
    "website",
    "facebook_page",
    "last_updated"
  );
}

function findBy(filter) {
  return db("neighborhood").where(filter);
}

async function add(meeting) {
  const [id] = await db("neighborhood").insert(meeting, "id");

  return findById(id);
}

function findById(id) {
  return db("neighborhood").where({ id }).first();
}
