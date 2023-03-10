const router = require('express').Router();
const User = require('../model/User');


router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(err);
    }
});

router.delete('/deleteall', async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json("All users deleted Successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
});


// get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get a via query
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json(error);
    }
});


//update user

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            /* try {
                const salt = bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            } */

            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json(user);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

    } else {
        return res.status(403).json("You cannot update this account either its not yours or you are not admin");
    }
});

// delete user

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been Deleted Successfully");
            } catch (err) {
                return res.status(500).json(err);
            }
        }

    } else {
        return res.status(403).json("You cannot update this account either its not yours or you are not admin");
    }
});


// follow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const followedUser = await User.findById(req.params.id);
        const followingUser = await User.findById(req.body.userId);
        if (!followedUser.followers.includes(req.body.userId)) {
            await followedUser.updateOne({ $push: { followers: req.body.userId } });
            await followingUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("User has been followed Successfully");
        } else {
            return res.status(403).json("You Already Follow this User");
        }
    } else {
        return res.status(403).json("You cannot follow yourself");
    }
});

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const followedUser = await User.findById(req.params.id);
        const followingUser = await User.findById(req.body.userId);
        if (followedUser.followers.includes(req.body.userId)) {
            await followedUser.updateOne({ $pull: { followers: req.body.userId } });
            await followingUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("User has been unfollowed Successfully");
        } else {
            return res.status(403).json("You Do Not Follow this user");
        }
    } else {
        return res.status(403).json("You cannot unfollow yourself");
    }
});
//get all users

module.exports = router;
