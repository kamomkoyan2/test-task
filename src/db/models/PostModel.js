const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    title:{
        type: String,
        required:true,
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'UserModal'
    }
});

PostSchema.virtual("comments", {
    ref: "CommentModel",
    localField: "_id",
    foreignField: "PostModel"
});

PostSchema.virtual('likes', {
    ref: 'LikeModel',
    localField: '_id',
    foreignField: 'postModel',
});

const PostModel = mongoose.model("PostModel", PostSchema)

module.exports = PostModel;