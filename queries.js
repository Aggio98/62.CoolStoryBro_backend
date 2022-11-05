const User = require("./models").user;
const Space = require("./models").space;
const Story = require("./models").story;

async function spacesWithUsers() {
  try {
    const spaces = await Space.findAll({
      raw: true,
      include: [User],
    });
    console.log(spaces);
  } catch (e) {
    console.log("error", e.message);
  }
}
//spacesWithUsers();

async function storyId(id) {
  try {
    const stories = await Story.findByPk(id, {
      raw: true,
      include: [{ model: Space, attributes: ["title"] }],
    });
    console.log(stories);
  } catch (e) {
    console.log("error", e.message);
  }
}

//storyId(4);
