const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("meetings").select("id", "day_of_week", "week_of_month", "frequency", "meeting_time");
}

function findBy(filter) {
  return db("meetings").where(filter);
}

async function add(meeting) {
  const [id] = await db("meetings").insert(meeting, "id");

  return findById(id);
}

function findById(id) {
  return db("meetings").where({ id }).first();
}
