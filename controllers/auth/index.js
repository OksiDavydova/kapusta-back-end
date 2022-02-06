const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const { googleAuth, googleRedirect } = require("./googleLogin");

module.exports = { signup, login, logout, googleAuth, googleRedirect };
