const Router = require('express').Router;
const router = new Router();
const auth = require('../middlewares/auth');

const CommentController = require('../controllers/comment');

router.post('/comment/:id', auth, CommentController.createComment)
router.delete('/comment/:id/:comment_id', auth, CommentController.deleteComment);


module.exports = router;