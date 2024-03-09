var mongoose = require("mongoose");
var postModel=require("../models/post")

exports.createPost = async (req, res) => {
    const newPost = {
      description: req.body.description,
      userId: req.body.userId,
      productId: req.body.productId,
    
    }; 
    console.log(newPost);
  
    try {
      let newPos = await postModel.create(newPost);
      let post = await postModel
        .findById(newPos._id)
        .populate("productId")
        .populate("userId");
  
  
      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ success: true, data: post});
    } catch (error) {
      res
        .status(422)
        .setHeader("Content-Type", "application/json")
        .json(error.message);
    }
  };

  exports.updatePostImages = async (req, res) => {
    let newObj = {
      images: req.body.images,
    };
    try {
      let newPost = await postModel
        .findByIdAndUpdate(
          req.params.postId,
          { $set: newObj },
          { runValidators: true, new: true }
        ) .populate("productId")
        .populate("userId");

      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ success: true, data: newPost });
    } catch (error) {
      res
        .status(422)
        .setHeader("Content-Type", "application/json")
        .json({ success: false, message: error + " " });
    }
  };

exports.getPostByUserId = async (req, res) => {
  try {
    let postresponse = await postModel
      .find({ userId: req.params.userId})
      .populate({
        path: "productId",
      })
      .populate({
        path: "userId",
      })
     
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(postresponse);
  } catch (error) {
    console.log(error);
    res
      .status(422)
      .setHeader("Content-Type", "application/json")
      .json(error.message);
  }
};

exports.getAllPosts= async (req, res) => {
  try {
    let postResponse = await postModel
      .find()
      .populate({
        path: "productId",
      })
      .populate({
        path: "userId",
      })
    
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(postResponse);
  } catch (error) {
    console.log(error);
    res
      .status(422)
      .setHeader("Content-Type", "application/json")
      .json(error.message);
  }
};
exports.deletePostById = async (req, res) => {
  
    try {
      let deleted = await postModel.findByIdAndDelete(req.params.postId);
      console.log(deleted);
      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ success: true, data: deleted });
    } catch (error) {
      console.log(error);
      res
        .status(422)
        .setHeader("Content-Type", "application/json")
        .json(error.message);
    }
  }

exports.addProductToShop = async (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    images: req.body.images,
    shopId: mongoose.mongo.ObjectId(req.params.shopId),
    ownerId: req.body.ownerId,
    description: req.body.description,
    variations: req.body.variations.split(","),
    categories: req.body.categories,
    interest: req.body.interest,
    discountedPrice: req.body.discountedPrice,
  };

  try {
    let newProd = await productModel.create(newProduct);
    let product = await productModel
      .findById(newProd._id)
      .populate({
        path: "ownerId",
        populate: {
          path: "shopId",
        },
      })
      .populate("reviews")
      .populate("interest");

    newProd.shopId = null;
    newProd.ownerId = null;

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, data: product });
  } catch (error) {
    res
      .status(422)
      .setHeader("Content-Type", "application/json")
      .json(error.message);
  }
};



exports.likePost = async (req, res) => {
    try {
      let postId = req.params.postId;
      let userId = req.params.userId;
  
     let myUpdatedPost = await postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: userId },
        },
        { runValidators: true, new: true, upsert: false }
      );
   
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      myUpdatedPost["success"] = true;
      res.json(myUpdatedPost);
    } catch (error) {
      console.log(error + " ");
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false });
    }
  };

  exports.unlikePost = async (req, res) => {
    try {
      let postId = req.params.postId;
      let userId = req.params.userId;


     let myUpdatedPost = await postModel.findByIdAndUpdate(
        postId,
        {
          $pullAll: { likes: [userId] },
        },
        { runValidators: true, new: true, upsert: false }
      );
  
  
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(myUpdatedPost);
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json(error);
    }
  };
