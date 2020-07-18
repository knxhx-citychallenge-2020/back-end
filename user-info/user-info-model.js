const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
    return db("user_information").select("id",
        "neighborhood_id",
        "first_name",
        "last_name",
        "position",
        "contact",
        "email",
        "phone",
        "address_1",
        "address_2",
        "city",
        "state",
        "zip",
        "newsletter");
}

function findBy(filter) {
  return db("user_information").where(filter);
}

async function add(user) {
  const [id] = await db("user_information").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("user_information").where({ id }).first();
}