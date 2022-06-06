
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const address = req.body.address.toLowerCase();
    console.log(address);
    try {
        const _user = await User.findOne({ address: address });
        if (_user.username === req.body.username && _user.password === req.body.password) {
            return res.json({ success: true, msg: 'Logged in successfully', data: _user });
        }
        console.log('error');
        return res.json({ success: false, msg: 'Information incorrect' });
    }
    catch (error) {
        console.log('error');
        return res.json({ success: false, msg: 'Not found User' });
    }
});

router.post('/register', async (req, res) => {
    const address = req.body.address.toLowerCase();
    const _user = await User.findOne({ address: address });
    if (_user) {
        return res.json({ success: false, msg: 'User already registered' })
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: address
    });
    user.save(function (err) {
        if (err) return res.json({ success: false, msg: err })
        return res.json({ success: true, msg: 'Registered successfully' });
    });
});

module.exports = router;