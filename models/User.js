const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const schema = new Schema(
  {
    username: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
      default: ''
    },
    site: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    totalsell: {
      type: Number,
      default: 0,
    },
    ownnfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medias' }],
    createfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medias' }],
  },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", schema);