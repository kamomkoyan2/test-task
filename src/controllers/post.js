const PostModel = require('../db/models/PostModel');


exports.createPost = async(req, res, next) => {
    const post = new PostModel({
        ...req.body,
        owner: req.user._id
    })

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getPost = async(req,res,next) => {
    const _id = req.params.id

    try {
        const post = await PostModel.findOne({_id, owner: req.user._id})
        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch(e) {
        res.status(500).send()
    }
}

exports.updatePost = async (req,res,next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Invalid Updates!')
    }

    try {
        const post = await PostModel.findOne({_id: req.params.id, owner: req.user._id})
        if (!post) {
            res.status(400).send()
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(500).send(e)
    }
}


exports.deletePost = async(req,res,next) => {
    try {
        const post = await PostModel.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch(e){
        res.status(500).send(e)
    }
}