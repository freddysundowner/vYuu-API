const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.post('/', postController.createPost)
router.get('/', postController.getAllPosts)
router.get('/:userId', postController.getPostByUserId)
router.put('/updateImages/:postId', postController.updatePostImages)
router.delete('/:postId', postController.deletePostById)
router.put('/like/:postId/:userId', postController.likePost)
router.put('/unlike/:postId/:userId', postController.unlikePost)


module.exports = router