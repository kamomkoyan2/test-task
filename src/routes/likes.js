const Router = require('express').Router;
const router = new Router();
const auth = require('../middlewares/auth');

const LikeController = require('../controllers/likes');

router.post('/like/:id', auth, LikeController.setLike)
router.delete('/like/:id/:like_id', auth, LikeController.removeLike)
router.get("/like/:id", auth, LikeController.getLike)

module.exports = router;