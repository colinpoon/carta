const express = require('express');
const router = express.Router();

module.exports = (db, axios, environment) => {

  //when you click on your profile, renders localhost:8080/profile
  router.get("/", (req, res) => {

    const userId = req.cookies["user_id"];

    db.getUserById(userId)
      .then((profile) => {
        const templateVars = profile;
        res.render("profile", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get all maps loaded into profile page
  router.get("/userMaps", (req, res) => {

    let mapIdToSearch = "req.body.mapId";

    db.getMapsOwnedByUser(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get all maps favorited by that user loaded into profile page
  router.get("/favorites", (req, res) => {

    let mapIdToSearch = "req.body.mapId";

    db.getFavMapsByUser(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  //request to get contributed maps by that user loaded into profile page
  router.get("/contributions", (req, res) => {

    let mapIdToSearch = "req.body.mapId";

    db.getMapsUserContributedTo(mapIdToSearch)
      .then((result) => {
        res.json(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};
