const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Post = require('./PostModel')

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)){
                    throw new Error('Email is Invalid')
                }
            }
        },

        password: {
            type:String,
            required:true,
            trim: true,
            minLength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error ('Password cannot contain "password"')
                }
            }
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },

        ],

    },
    {
        timestamps: true
    },
);

UserSchema.virtual("posts", {
    ref: "PostModel",
    localField: "_id",
    foreignField: "owner"
});


UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens
    return userObject
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "mysecretkey", {expiresIn: 60});

    
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}




UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


// delete user posts when user is removed
UserSchema.pre('remove', async function (next){
    const user = this;
    await Post.deleteMany({owner: user._id})
    next()
})


const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;