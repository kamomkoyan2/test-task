const CommentModel = require('../db/models/CommentModel');
const PostModel = require('../db/models/PostModel')


exports.createComment = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        let comment = new CommentModel({
            content: req.body.content,
            postId: req.params.id,
            userId: req.user.id
        });

        comment = await comment.save();
        res.json(comment);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error")
    }
}


exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: "Post do not have comment" });

        }
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await comment.remove()

        // resend the comments that belongs to that post
        const postComments = await CommentModel.find({ postId: req.params.id });
        res.json(postComments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}