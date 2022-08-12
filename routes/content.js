const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Content  = require('../models/Content');

// @desc     Show add content page
// @route    GET /content/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('content/add')
})

// @desc     Process form
// @route    POST /content
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Content.create(req.body);
    res.redirect('/dashboard');
  } catch (e) {
    console.error(e);
    res.render('error/500');
  }
})

// @desc     Show all content
// @route    GET /content
router.get('/content', ensureAuth, async (req, res) => {
  try {
    const content = await Content.find({ status: 'public'})
      .populate('user')
      .sort({ createdAt: 'desc'})
      .lean();

      res.render('content/index' , {
        content,
      })

  } catch (e) {
      console.error(e);
      res.render('error/500');
  }

}) 




module.exports = router;
