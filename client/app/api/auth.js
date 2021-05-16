import client from "./client";

const login = (email, password) =>
  client.post("/auth/login", { email, password });

const register = (
  first_name,
  last_name,
  email,
  password,
  reader_type = null,
  reader_goals = [],
  reader_genres = []
) =>
  client.post("/auth/register", {
    first_name,
    last_name,
    email,
    password,
    reader_type,
    reader_goals,
    reader_genres,
  });

const checkUserStatus = () => client.get("/auth/status");

export default {
  login,
  register,
  checkUserStatus,
};
