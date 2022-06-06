const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
    {
        metadata: {
            title: {
                type: String,
                required: [true, 'Media title is required'],
                maxlength: [40, 'Title cannot be more than 40 characters'],
            },
            description: {
                type: String,
                required: [true, 'Media description is required'],
            },
            price: {
                type: Number,
                required: [true, 'Price description is required'],
                default: 0
            },
            mime_type: {
                type: String,
                required: [true, 'Media type is required'],
            },
        },
        media_id: {
            type: String,
            required: [true, 'Media media id is required'],
        },
        media_url: {
            type: String,
            required: [true, 'Media URI is required'],
        },
        metadata_url: {
            type: String,
        },
        creator_address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        owner_address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        content_hash: {
            type: String,
        },
        metadata_hash: {
            type: String,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        bidcount: {
            type: Number,
            default: 0
        },
        chain_id: {
            type: Number,
            default: 97
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("medias", MediaSchema);
