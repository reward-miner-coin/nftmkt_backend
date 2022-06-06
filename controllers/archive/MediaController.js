
const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const User = require('../models/User')

router.post('/create', async (req, res) => {
    const {
        title,
        description,
        price,
        media_url,
        metadata_url,
        mimeType,
        contentHash,
        metadataHash,
        tokenId,
        creator,
        chainId
    } = req.body;
    console.log(price);
    try {

        const media = new Media({
            metadata: {
                title,
                description,
                price: price,
                mime_type: mimeType,
            },
            media_id: tokenId,
            media_url,
            metadata_url,
            content_hash: contentHash,
            metadata_hash: metadataHash,
            creator_address: creator,
            owner_address: creator,
            chain_id : chainId
        });
        const result = await media.save();
        console.log(result);
        let user = await User.findOne({ _id: creator });
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        };
        user.ownnfts.push(result._id);
        await User.findOneAndUpdate({ _id: creator }, { ownnfts: user.ownnfts });

        user.createfts.push(result._id);
        await User.findOneAndUpdate({ _id: creator }, { createfts: user.createfts });

        return res.json({ success: true, msg: 'NFT Created Successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: 'Creation Failed' });
    }

})

router.post('/loadAllMedia', async (req, res) => {
    console.log(req.body.chainId);
    const media = await Media.find({ 'metadata.title': new RegExp(req.body.criteria), chain_id: req.body.chainId }).populate('owner_address').populate('creator_address');
    res.status(200).json({ success: true, data: media });
})

router.post('/loadMedia', async (req, res) => {
    const media = await Media.findOne({ _id: req.body._id }).populate('owner_address').populate('creator_address');
    res.status(200).json({ success: true, data: media });
})

router.post('/setAsk', async (req, res) => {
    const { _mid, price } = req.body;
    try {
        const media = await Media.findOneAndUpdate({ _id: _mid }, { isApproved: false, 'metadata.price': price });
        res.json({ success: true, msg: 'Ask Set' })
    }
    catch (error) {
        res.json({ success: false, msg: 'Set Ask Failed' })
    }
})

module.exports = router;