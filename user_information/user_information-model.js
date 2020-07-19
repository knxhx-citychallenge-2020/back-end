module.exports = {
  find,
  findBy,
  findByName,
  findByStatus,
  findByNeighborhood,
  add,
  update,
  remove,
};

const db = require("../database/db-config");

function find() {
  return db("user_information").orderBy("id");
}

function findBy(filter) {
  return db("user_information").where(filter);
}

function findById(id) {
  return db("user_information").where({ id }).first();
}

function findByName(name) {
  return db("user_information").where({ last_name: name }).orderBy("id");
}

function findByStatus(newsletter) {
  return db("user_information").where({ newsletter: true }).orderBy("id");
}

function findByNeighborhood(neighborhood) {
  return db("user_information").where({ neighborhood_id: neighborhood }).orderBy("id");
}

function add(user_information) {
  return db("user_information")
    .insert(user_information)
    .returning("id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, changes) {
  return db("user_information").where({ id }).update(changes);
}

function remove(id) {
  return db("user_information").where("id", id).del();
}
