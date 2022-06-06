const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
    {
        media_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'medias'
        },
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        price: {
            type: String,
        },
        isAccepted: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("bids", BidSchema);
