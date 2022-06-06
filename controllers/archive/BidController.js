
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Media = require('../models/Media');
const Bid = require('../models/Bid')

router.post('/loadBid', async (req, res) => {
    const bids = await Bid.find({ media_id: req.body._mid }).populate('bidder').sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: bids });
});

router.post('/createbid', async (req, res) => {
    const { bidder, price, _mid, type } = req.body;
    console.log(bidder, price, _mid, type);
    try {
        const bidderInstance = new Bid({
            media_id: _mid,
            bidder,
            price,
        });
        const result = await bidderInstance.save();
        const media = await Media.findOne({ _id: _mid });
        console.log(media);
        media.bidcount += 1;
        await Media.findOneAndUpdate({ _id: _mid }, { bidcount: media.bidcount });
        console.log(result)
        return res.json({ success: true, msg: 'Your Bid Captured', _id: result._id });
    } catch (error) {
        return res.json({ success: false, msg: 'There is problem in your Bid' });
    }
})

router.post('/acceptbid', async (req, res) => {
    try {
        const _bid = await Bid.find({ media_id: req.body._mid });
        for (let i = 0; i < _bid.length; i++) {
            await Bid.findOneAndUpdate({ _id: _bid[i]._id }, { isAccepted: 1 });
        }
        console.log(req.body._bidid);
        await Bid.findOneAndUpdate({ _id: req.body._bidid }, { isAccepted: 2 });

        console.log(req.body._mid, req.body.bidder);
        const media = await Media.findOneAndUpdate({ _id: req.body._mid }, { isApproved: true, owner_address: req.body.bidder });
        let user = await User.findOne({ _id: req.body.bidder });
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        };
        user.ownnfts.push(req.body._mid);
        await User.findOneAndUpdate({ _id: req.body.bidder }, { ownnfts: user.ownnfts });

        let owner = await User.findOne({ _id: media.owner_address });
        if (!owner) {
            return res.json({ success: false, msg: 'Owner not found' });

        };
        console.log(owner);
        const index = owner.ownnfts.indexOf(req.body._mid);
        owner.ownnfts.splice(index, 1);
        owner.totalsell += req.body.price / 1;
        await User.findOneAndUpdate({ _id: media.owner_address }, { ownnfts: owner.ownnfts, totalsell: owner.totalsell });

        return res.json({ success: true, msg: 'Buy Successfully' });
    } catch (error) {
        return res.json({ success: false, msg: 'Error occured' });
    }
})

module.exports = router;