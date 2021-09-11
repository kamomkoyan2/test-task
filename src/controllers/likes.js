const CommentModel = require('../db/models/CommentModel');
const PostModel = require('../db/models/PostModel')
const LikeModel = require('../db/models/LikeModel');


exports.setLike = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        let like = new LikeModel({
            postId: req.params.id,
            userId: req.user.id
        });

        like = await like.save();
        res.json(like);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error")
    }
}


exports.removeLike = async (req, res, next) => {
    try {
        const like = await LikeModel.findById(req.params.like_id);
        if (!like) {
            return res.status(404).json({ msg: "Post don't have like" });
        }
        if (like.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await like.remove()

        const postLikes = await LikeModel.find({ postId: req.params.id });
        res.json(postLikes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

exports.getLike = async(req,res,next) => {

    try {
        const like = await LikeModel.find({ userId: req.user.id})
        if (!like) {
            return res.status(404).send()
        }
        res.send(like)
    } catch(e) {
        res.status(500).send()
    }
}