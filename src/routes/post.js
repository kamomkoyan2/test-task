const Router = require('express').Router;
const router = new Router();
const auth = require('../middlewares/auth');

const PostController = require('../controllers/post');

router.post('/post', auth, PostController.createPost)
router.get("/post/:id", auth, PostController.getPost)
router.patch("/post/:id", auth, PostController.updatePost)
router.delete("/post/:id", auth, PostController.deletePost)

module.exports = router;