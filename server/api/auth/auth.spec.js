const superagent = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("./models/user");
const app = require("../../server"); // Link to your server file
const mongoose = require("mongoose");
const winston = require('winston');

const request = superagent(app);

// Connect to a test database
mongoose
  .connect(`${process.env.DB_URL}/nawvel_test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => winston.info("Connected to Test Mongodb"))
  .catch((err) =>
    winston.error("Could not connect to Mongodb database: ", err)
  );

describe("/auth", () => {
  beforeAll(async () => {
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("login", () => {
    it("should return an auth token", async () => {
      const hashedPassword = await bcrypt.hash("supersecretpassword", 10);
      const user = new User({
        firstName: "Test",
        lastName: "User",
        userName: "testuser123123",
        email: "testuser@email.com",
        password: hashedPassword,
      });

      await user.save();

      const res = await request.post("/auth/login").send({
        email: "testuser@email.com",
        password: "supersecretpassword",
      });
      expect(res.status).toBe(200);
    });
  });
});
