const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "PostModel"
    },
});

const LikeModel = mongoose.model("LikeModel", LikeSchema)

module.exports = LikeModel;