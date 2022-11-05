const { Router } = require("express");
const Space = require("../models").space;
const router = new Router();

//F1 create a endpoint that responds with a list of spaces
router.get("/spaces", async (req, res, next) => {
  const response = await Space.findAll();
  res.send(response);
});

module.exports = router;
