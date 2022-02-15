const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const createUser = async (body) => {
  const newUser = await User.create(body);
  const { id, email, verificationToken} = newUser;

  const token = jwt.sign({ id: newUser.id }, TOKEN_SECRET_KEY, {
    expiresIn: "20h",
  });

  const index = email.indexOf("@");
  const name = email.slice(0, index);
 
  newUser.token = token;
  newUser.name = name;

  await newUser.save();

  return { id, name, email, token, verificationToken};
};

module.exports = createUser;
