
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/getUserData', async (req, res) => {
    console.log(req.body.address);
    try {
        const _user = await User.findOne({ address: req.body.address });
        return res.json(_user);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/updateUser', async (req, res) => {
    console.log(req.body.address);
    const { _id, username, bio, email, site, twitter, instagram, avatar } = req.body;
    try {
        const _user = await User.findOneAndUpdate({ _id }, {
            username, bio, email, site, twitter, instagram, avatar
        });
        return res.json({ success: true, msg: 'Updated Account successfully' });
    }
    catch (error) {
        return res.json({ success: false, msg: 'Error occured' });
    }
});

module.exports = router;