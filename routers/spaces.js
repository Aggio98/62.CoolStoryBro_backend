const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;
const router = new Router();

//F1 create an endpoint that responds with a list of spaces
router.get("/spaces", async (req, res, next) => {
  const response = await Space.findAll();
  res.send(response);
});

//F2 create an endpoint that responds with one space and its stories
router.get("/spaces/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const getSpace = await Space.findByPk(
      spaceId,
      { include: [Story] },
      { order: [[{ model: Story }, "createdAt", "DESC"]] }
    );
    if (getSpace) {
      res.send(getSpace);
    } else {
      req.status(404).send("Space not found");
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
