const express = require("express");
const bcrypt = require("bcrypt");
const asyncMiddleware = require("../../middleware/async");
const { User, validate } = require("./models/user");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    // Find user with email
    const foundUser = await User.findOne({
      email: req.body.email,
    }).select({ email: 1, firstName: 1, lastName: 1, password: 1 });

    // User doesn't exist
    if (!foundUser) {
      res.status(400).send("User does not exist!");
      return;
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!passwordMatch)
      res.status(400).send("Incorrect password! Please try again");

    // Update login count
    await User.findOneAndUpdate(
      { _id: foundUser._id },
      { $inc: { signInCount: 1 } },
    );

    const token = foundUser.generateAuthToken();
    res.header("bearer-token", token).json({ message: "Login Successful" });
  })
);

router.get(
  "/status",
  auth,
  asyncMiddleware(async (req, res) => {
    res.status(200).send("OK");
  })
);

router.post(
  "/register",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const foundUser = await User.findOne({
      email: req.body.email,
    });
    
    if (foundUser) {
      res.status(400).send("A user is already registered with this email!");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Generate unique username
    var userName;
    while (true) {
      userName = req.body.firstName
        .concat(req.body.lastName)
        .concat(Math.floor(Math.random() * 10000).toString());

      const foundUser = await User.findOne({
        userName: userName,
      });

      if (!foundUser) {
        break;
      }
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: userName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = newUser.generateAuthToken();
    res
      .header("bearer-token", token)
      .json({ message: "Registration Successful!" });
  })
);

module.exports = router;
