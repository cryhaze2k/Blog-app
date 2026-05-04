const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('profile', { user });
});

router.post('/profile', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.session.user._id, {
    bio: req.body.bio
  });

  res.redirect('/profile');
});

module.exports = router;