const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    images: {
      type: Array,
      default:[]
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      default:""
    },
     description:{
       type:String
     },
     likes:{
        type: Array,
     },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  {
    timestamps: true,
    autoCreate: true, // auto create collection
    autoIndex: true, // auto create indexes
  }
);

const post = model("post", postSchema);
module.exports = post;
