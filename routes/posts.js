const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.get('/', (req, res) => res.redirect('/posts'));

router.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('posts', { posts });
});

router.get('/create-post', auth, (req, res) => {
  res.render('create-post');
});

router.post('/create-post', auth, async (req, res) => {
  await Post.create({
    title: req.body.title,
    content: req.body.content,
    author: req.session.user.username
  });

  res.redirect('/posts');
});

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comments = await Comment.find({ postId: post._id });

  res.render('post', { post, comments });
});

router.post('/comment/:id', auth, async (req, res) => {
  await Comment.create({
    postId: req.params.id,
    author: req.session.user.username,
    text: req.body.text
  });

  res.redirect('/post/' + req.params.id);
});

router.get('/search', async (req, res) => {
  const query = req.query.q;
  const posts = await Post.find({ title: { $regex: query, $options: 'i' } }).sort({ createdAt: -1 });
  res.render('posts', { posts });
});

module.exports = router;