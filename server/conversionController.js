const mongoose = require('mongoose');
const Conversion = require('./conversionModel.js');

module.exports = conversionController =  {
  add: async (req, res) => {
    const {content, userId, postId, postImageFileId } = req.body
    console.log(req.body)
    try {
      const post = await Post.create({ _id: new mongoose.Types.ObjectId(), content});
      await User.findByIdAndUpdate(
        userId,
        { $push: { posts: post._id } }
      );
      if(postId){
        post.parentPost = postId
        await Post.findByIdAndUpdate(
          postId,
          { $push: { comments: post._id }, $inc: { commentsCount: 1 } },
        );
      }
      post.user = userId;
      post.postImageFileId = postImageFileId || null;
      await post.save();
      if(post){
        res.status(200).json({_id: post._id})
      }else {
        console.log(`Post create operation failed`)
        res.status(404).json({ error: "Post create operation failed" })
      }
    } catch (error) {
      console.log(`Error: ${error}`)
      res.status(400).json({
        error: 'Bad Request',
      })
    }
  },
  delete: async (req, res) => {
    const {content, userId, postId, postImageFileId } = req.body
    console.log(req.body)
    try {
      const post = await Post.create({ _id: new mongoose.Types.ObjectId(), content});
      await User.findByIdAndUpdate(
        userId,
        { $push: { posts: post._id } }
      );
      if(postId){
        post.parentPost = postId
        await Post.findByIdAndUpdate(
          postId,
          { $push: { comments: post._id }, $inc: { commentsCount: 1 } },
        );
      }
      post.user = userId;
      post.postImageFileId = postImageFileId || null;
      await post.save();
      if(post){
        res.status(200).json({_id: post._id})
      }else {
        console.log(`Post create operation failed`)
        res.status(404).json({ error: "Post create operation failed" })
      }
    } catch (error) {
      console.log(`Error: ${error}`)
      res.status(400).json({
        error: 'Bad Request',
      })
    }
  },
  conversions: async (req, res) => {
    const {content, userId, postId, postImageFileId } = req.body
    console.log(req.body)
    try {
      const post = await Post.create({ _id: new mongoose.Types.ObjectId(), content});
      await User.findByIdAndUpdate(
        userId,
        { $push: { posts: post._id } }
      );
      if(postId){
        post.parentPost = postId
        await Post.findByIdAndUpdate(
          postId,
          { $push: { comments: post._id }, $inc: { commentsCount: 1 } },
        );
      }
      post.user = userId;
      post.postImageFileId = postImageFileId || null;
      await post.save();
      if(post){
        res.status(200).json({_id: post._id})
      }else {
        console.log(`Post create operation failed`)
        res.status(404).json({ error: "Post create operation failed" })
      }
    } catch (error) {
      console.log(`Error: ${error}`)
      res.status(400).json({
        error: 'Bad Request',
      })
    }
  }
}