const { Pool } = require('pg');
// const request = require('request');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserById = function (userId) {

  const sqlString = `SELECT * FROM users WHERE id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.getUserById = getUserById;


//search for all maps using keyword
const getMapsByKeyword = function (keyword) {
  // let newkeyword = "%" + keyword + "%";
  let values = [`%${keyword}%`];

  const sqlString = `SELECT * FROM maps WHERE description LIKE $1`;
  return pool
    .query(sqlString, values)
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsByKeyword = getMapsByKeyword;

//display a single map by looking up /:id
const getMapById = function (mapId) {
  const sqlString = `SELECT title, description FROM maps WHERE id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.getMapById = getMapById;


//shows maps OWNED/created by user
const getMapsOwnedByUser = function (userId) {
  const sqlString = `SELECT * FROM maps WHERE user_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsOwnedByUser = getMapsOwnedByUser;

const mostRecentMapByUser = function (userId) {
  const sqlString = `SELECT * FROM maps where user_id = $1 ORDER BY created_at DESC`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.mostRecentMapByUser = mostRecentMapByUser;


//shows maps user has contributed to
const getMapsUserContributedTo = function (userId) {
  const sqlString = `SELECT title, description FROM maps JOIN contributors ON map_id = maps.id WHERE contributors.user_id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getMapsUserContributedTo = getMapsUserContributedTo;


//shows all the maps favourited by user
const getFavMapsByUser = function (userId) {

  const sqlString = `SELECT maps.title, maps.description FROM maps JOIN favourites ON map_id = maps.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 ORDER BY favourited_at DESC`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getFavMapsByUser = getFavMapsByUser;

// //displayMAP function - shows map & markers
// const displayMap = function (mapId) {

//   // const sqlString = `SELECT maps.title, maps.description, markers.id, markers.latitude, markers.longitude FROM markers JOIN maps ON map_id = maps.id WHERE map_id = $1`;

//   const sqlString = `SELECT markers.id, markers.latitude, markers.longitude FROM markers WHERE map_id = $1`;

//   return pool
//     .query(sqlString, [mapId])
//     .then(res => { //get an array of objects with select fields from table
//       console.log(res.rows);

//       res.rows.forEach((element) => {
//         let latLng = [res.rows.latitude, res.rows.longitude];

//       })

//     })
//     .catch(e => { console.error(e) });

//   // req.body is object
//   // pull data from object & call saveNewMap()
//   // loop through marker values & call saveNewMarker()

// }
// exports.displayMap = displayMap;
// displayMap(3);


//saves a new map
const saveNewMap = function (map) {

  const sqlString = `INSERT INTO maps (user_id, title, description, created_at) VALUES ($1, $2, $3) RETURNING *`;

  return pool
    .query(sqlString, [map.user_id, map.title, map.description])
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.saveNewMap = saveNewMap;

//edit map
const editMap = function (map) {

  const sqlString = `UPDATE maps SET title = $1, description = $2 WHERE id = $3`;

  return pool
    .query(sqlString, [map.title, map.description, map.id])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editMap = editMap;


//delete map
const deleteMap = function (mapId) {

  const sqlString = `DELETE FROM maps WHERE id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteMap = deleteMap;


//get all markers for specific mapId
const getMarkersForMap = function (mapId) {

  const sqlString = `SELECT latitude, longitude, title FROM markers WHERE map_id = $1`;

  return pool
    .query(sqlString, [mapId])
    .then(res => {
      ;
      return res.rows;
    })
    .catch(e => { console.error(e) });

}
exports.getMarkersForMap = getMarkersForMap;


//saves markers on new map
const saveNewMarker = function (marker) {

  // this just saving information per marker, **need another function to pull up markers for a given map_id

  // how to add user_id / map_id to marker? --> server side

  const sqlString = `INSERT INTO markers (user_id, map_id, title, description, image, longitude, latitude, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  return pool
    .query(sqlString, [marker.user_id, marker.map_id, marker.title, marker.description, marker.image, marker.longitude, marker.latitude, marker.created_at])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.saveNewMarker = saveNewMarker;


//saves edited marker
const editMarker = function (markerId) {

  const sqlString = `UPDATE markers SET title = $1, description = $2, image = $3, latitude = $4, longitude = $5`;

  return pool
    .query(sqlString, [markerId.title, markerId.description, markerId.image, markerId.latitude, markerId.longitude])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editMarker = editMarker;


//deletes marker from db
const deleteMarker = function (markerId) {

  const sqlString = `DELETE FROM markers WHERE id = $1`;

  return pool
    .query(sqlString, [markerId])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteMarker = deleteMarker;


//sharing map with other users to collab
const addContributor = function (contributor) {

  const sqlString = `INSERT INTO contributors (user_id, map_id, contribution_date) VALUES ($1, $2, $3) RETURNING *`;

  return pool
    .query(sqlString, [contributor.user_id, contributor.map_id, contributor.contribution_date])
    .then(res => {
      return res.rows;
    })
    .catch(e => { console.error(e) })

};
exports.addContributor = addContributor;

