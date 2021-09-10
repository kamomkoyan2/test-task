const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "PostModel"
    },
    content: {
        type: String,
        required: true
    },
});

const CommentModel = mongoose.model("CommentModel", CommentSchema)

module.exports = CommentModel;