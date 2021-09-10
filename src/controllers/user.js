const UserModel = require('../db/models/UserModel');


exports.signupUser = async (req, res, next) => {
    try {
        const emailExists = await UserModel.findOne({ email: req.body.email });
        if (emailExists) {
            res.status(400).send({ error: "email already exists" })
        }

    } catch (error) {
        res.status(400).send({ error: "something went wrong" });
    }
    const user = new UserModel(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });

    } catch (e) {
        return res.status(404).send({ message: e.message })
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        const token  =  await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
}


exports.logoutUser = async(req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
}

exports.getUser = async(req,res) => {
    res.send(req.user)
}


exports.deleteUser = async(req,res,next) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
}


exports.updateUser = async(req,res,next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password',]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
}