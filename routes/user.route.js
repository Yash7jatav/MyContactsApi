const express = require("express");
const { validateUserData, validateLoginData } = require("../validations/index");
const {
  registerUser,
  loginUserWithToken,
  fetchCurrentUser,
} = require("../controllers/index");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

//Register user.
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const error = await validateUserData(username, email, password);
    if (error) return res.status(400).json({ error });
    const newUser = await registerUser(username, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Login user.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const error = await validateLoginData(email, password);
    if (error) return res.status(400).json({ error });
    const loginUser = await loginUserWithToken(email);
    return res.status(200).json(loginUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Current user.
router.get("/current", validateToken, async (req, res) => {
  try {
    const currentUser = await fetchCurrentUser(req.user);
    if (!currentUser) {
      return res.status(404).json({ error: "No current user found." });
    }
    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
