const { getAllUsers } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get("/", auth, getAllUsers);





module.exports = router;