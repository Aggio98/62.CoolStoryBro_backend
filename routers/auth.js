const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");
const Space = require("../models").space;
const Story = require("../models").story;

const router = new Router();

//login - // F4 http POST :4000/auth/login email=nigel@gmail.com password=1234
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    // F4 Loggin in finds the mySpace..
    const mySpace = await Space.findOne({
      where: { userId: user.id },
      include: [Story],
    });
    console.log(mySpace, "myspaces");

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res
      .status(200)
      .send({ token, user: user.dataValues, mySpace: mySpace }); // F4 ..send mySpace in the response
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });
    // F3 Signing up creates a new space..
    const newSpace = await Space.create({
      title: `${name}'s space`,
      description: null,
      backgroundColor: "#ffffff",
      color: "#000000",
      userId: newUser.id, // EXTRA: Creates the userId in space table!
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });
    // F3 Add newSpace in response!
    res.status(201).json({ token, user: newUser.dataValues, spaces: newSpace });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid

router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];

  //F4 /me finds the mySpace
  const mySpace = await Space.findOne({
    where: { userId: req.user.id },
    include: [Story],
  });

  res.status(200).send({ user: req.user.dataValues, mySpace: mySpace }); // F4 .. send mySpace in response which is connected to the slice
});

module.exports = router;
