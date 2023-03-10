const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');


router.get('/', (req, res) => {
    res.send("Hello This is Auth Page");
});


/**********************************REGISTER ROUTE ***********************************/
router.post('/register', async (req, res) => {
    try {

        // salt creation for password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // creating new user
        const newUser = new User({ ...req.body, password: hashedPassword });

        //saving the user on db atlas
        const user = await newUser.save();

        // generating response
        res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e);
    }
})


/* LOGIN ROUTE */

/* router.get('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong Password");
        }
        res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e);
    }

}); */

// post loginRoute

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong Password");
        }
        res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e);
    }

});


module.exports = router;