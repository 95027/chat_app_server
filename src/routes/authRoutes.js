const { register, login, logout, getUserByToken } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.get("/token", auth, getUserByToken);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);


module.exports = router;