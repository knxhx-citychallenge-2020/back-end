module.exports = {
  find,
  findBy,
  findById,
  findByStatus,
  findByDistrictId,
  findByType,
  findbyMeeting,
  add,
  update,
  remove,
};

const db = require("../database/db-config");

function find() {
  return db("neighborhood").orderBy("id");
}

function findBy(filter) {
  return db("neighborhood").where(filter);
}

function findById(id) {
  return db("neighborhood").where({ id }).first();
}

function findByDistrictId(districtId) {
  return db("neighborhood").where({ district_id: districtId }).orderBy("id");
}

function findByStatus(active) {
  return db("neighborhood").where({ active: true }).orderBy("id");
}

function findByType(type) {
    return db("neighborhood").where({ type: type }).orderBy("id");
}

function findbyMeeting(meeting) {
    return db("neighborhood").where
        (db("meeting").where({ day_of_week: meeting })).orderBy("id");
}

function add(neighborhood) {
  return db("neighborhood")
    .insert(neighborhood)
    .returning("id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, changes) {
  return db("neighborhood").where({ id }).update(changes);
}

function remove(id) {
  return db("neighborhood").where("id", id).del();
}
