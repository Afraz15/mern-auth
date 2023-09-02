const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "MyKey";

const createUser = async (req, res) => {
  const { name, email, password } = req.body; // destructuring
  let existUser;
  try {
    existUser = await User.findOne({ email: email }); // as in email is in email mongodb
  } catch (err) {
    console.log(err);
  }

  if (existUser) {
    return res
      .status(400)
      .json({ message: `User already exist with this email:${email}` });
  }
  //   return res.json({ name, email, password });

  const encrypPassword = bcrypt.hashSync(password, 4);
  //   return res.json({ encrypPassword });
  const user = new User({
    name, // es6 property if both are same then instead of name = name
    email,
    password: encrypPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(`user: ${savedUser.name} is saved`);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad request");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // finding if the user exist using email
    const emailExist = await User.findOne({ email: email });
    // if yes then emailExist will have all the details of the user with that email in it
    if (!emailExist) {
      return res
        .status(400)
        .json({ message: `User does not exist with this email: ${email}` });
    }
    // decrypting the password and comparing if they are the same | because it is decrypted | client pass vs db pass
    const validPassword = bcrypt.compareSync(password, emailExist.password);
    // creating a token for the user
    const token = jwt.sign({ id: emailExist._id }, JWT_SECRET_KEY, {
      expiresIn: "30s",
    });
    // creating a cookie
    res.cookie(String(emailExist._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    if (!validPassword) {
      return res.status(400).json({
        message: `Invalid password ${validPassword} ${emailExist.password}`,
      });
    }

    res.json({ message: `Logged in successfully with ${email}`, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  // console.log(cookie);
  const token = cookie.split("=")[1];
  // const tokenHeader = req.headers["authorization"];
  // const token = tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized (no token found)" });
  }

  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user, user.id);
    req.id = user.id;
    next();
  });
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  console.log("getUser", userId);
  let user;
  try {
    // user = await User.findById(userId);
    user = await User.findById(userId, "-password");
  } catch (err) {
    console.log(err);
  }
  if (user) {
    return res.status(200).json({ message: `user found: ${user}` }); // user with full details
  }
};

module.exports = { createUser, login, verifyToken, getUser };
