const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;
const router = new Router();
const authMiddleware = require("../auth/middleware");

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

//F4 Delete endpoint
router.delete(
  "/spaces/stories/:storyId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findByPk(storyId);
      if (!story) {
        return res.status(404).send("Story not found");
      }

      await story.destroy();
      res.send({ message: "Story deleted", storyId });
    } catch (e) {
      res.send(e);
      // next(e);
    }
  }
);

//F5 new story with id of space
router.post("/:id/stories", authMiddleware, async (req, res, next) => {
  try {
    const space = await Space.findByPk(req.params.id);
    console.log(space);

    const { name, imageUrl, content } = req.body;

    const story = await Story.create({
      name,
      imageUrl,
      content,
      spaceId: space.id,
    });
    return res.status(201).send({ message: "New story created", story });
  } catch (e) {
    next(e);
  }
});
