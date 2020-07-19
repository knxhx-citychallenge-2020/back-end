module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

const db = require("../database/db-config");

function find() {
  return db("meetings").orderBy("id");
}

function findBy(filter) {
  return db("meetings").where(filter);
}

function findById(id) {
  return db("meetings").where({ id }).first();
}

function add(meetings) {
  return db("meetings")
    .insert(meetings)
    .returning("id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, changes) {
  return db("meetings").where({ id }).update(changes);
}

function remove(id) {
  return db("meetings").where("id", id).del();
}
