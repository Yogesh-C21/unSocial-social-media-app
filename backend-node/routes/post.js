const router = require('express').Router();
const Post = require('../model/Post');
const User = require('../model/User');

// get a post

router.get('/:id', async (req, res) => {

    try {
        const userPost = await Post.findById(req.params.id);
        res.status(200).json(userPost);
    } catch (e) {
        return res.status(500).json(e);
    }

});


//get all posts

router.get('/get/all', async (req, res) => {

    try {
        const userPost = await Post.find();
        res.status(200).json(userPost);
    } catch (e) {
        return res.status(500).json(e);
    }

});

// Creating a Post
router.post('/', async (req, res) => {
    try {
        const userPost = new Post(req.body);
        userPost.save().then(() => {
            res.status(200).json("Post Saved Successfully");
        });
    } catch (e) {
        return res.status(500).json("Post Cannot Be Created");
    }
});

//updating a post
router.put('/', async (req, res) => {
    try {
        const user = await Post.findByIdAndUpdate(req.body.userId, {
            $set: req.body,
        });
        res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// like/dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // like
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json({
                "status": "200",
                "message": "post liked successfully"
            });
        } else {

            // dislike
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json({
                "status": "200",
                "message": "post disliked successfully"
            });
        }
    } catch (e) {
        return res.status(500).json("Post Cannot Be liked")
    }
});

// timeline
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);

        //own posts
        const userPosts = await Post.find({ userId: currentUser._id });

        // friend's post
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

// timeline
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
