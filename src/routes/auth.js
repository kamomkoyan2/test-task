const Router = require('express').Router;
const router = new Router();
const auth = require('../middlewares/auth');



const UserController = require('../controllers/user')

router.post("/signup",  UserController.signupUser);
router.post("/signin", UserController.loginUser);
router.post('/logout', auth, UserController.logoutUser)

router.get("/me", auth, UserController.getUser)

router.delete("/me", auth, UserController.deleteUser)
router.patch('/me', auth, UserController.updateUser)

module.exports = router;