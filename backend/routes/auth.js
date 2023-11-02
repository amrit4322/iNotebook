const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "AmritsecretKey";

//Route 1 :  end point for create : Post "/api/auth/createUser" . No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name please").isLength({ min: 3 }),
    body("email", "Enter a valid email please").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //validating the fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      //checking is user with same email exit or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success: false,
            errors: "User with this email already exist",
          });
      }

      //hashing and encrypting the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //providing jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Internal server Error" });
    }
  }
);

//Route 2 : Authentication a User using : Post /api/auth/login . No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email please").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //validating the fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(500)
          .json({
            success: false,
            error: "Please try to login with correct Credentials",
          });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(500)
          .json({
            success: false,
            error: "Please try to login with correct Credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "Internal server Error" });
    }
  }
);

//Route 3 : Get loggedin User details : Post /api/auth/getuser . Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server Error" });
  }
});

module.exports = router;
