const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { posts } = require('../data/db');
const authMiddleware = require('../middleware/auth');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, 'post-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Read All Posts (Home)
router.get('/', (req, res) => {
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = posts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(posts.length / limit);

    res.render('home', {
        title: 'Timeline',
        posts: results,
        user: req.user,
        currentPage: page,
        totalPages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        nextPage: page + 1,
        prevPage: page - 1
    });
});

// Create Post (Form)
router.get('/create', authMiddleware, (req, res) => {
    res.render('create-post', { title: 'New Post', user: req.user });
});

// Create Post (Action)
router.post('/create', authMiddleware, upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: Date.now(),
        userId: req.user.id,
        username: req.user.username,
        title,
        content,
        image: req.file ? '/uploads/' + req.file.filename : null,
        createdAt: new Date()
    };
    posts.unshift(newPost); // Add at the beginning
    res.redirect('/posts');
});

// Update Post (Form)
router.get('/edit/:id', authMiddleware, (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post || post.userId !== req.user.id) {
        return res.status(404).send('Post not found or unauthorized');
    }
    res.render('edit-post', { title: 'Edit Post', post, user: req.user });
});

// Update Post (Action)
router.post('/edit/:id', authMiddleware, upload.single('image'), (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1 || posts[postIndex].userId !== req.user.id) {
        return res.status(404).send('Post not found or unauthorized');
    }

    const { title, content } = req.body;
    posts[postIndex].title = title;
    posts[postIndex].content = content;
    if (req.file) {
        posts[postIndex].image = '/uploads/' + req.file.filename;
    }

    res.redirect('/posts');
});

// Delete Post
router.post('/delete/:id', authMiddleware, (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1 || posts[postIndex].userId !== req.user.id) {
        return res.status(404).send('Post not found or unauthorized');
    }

    posts.splice(postIndex, 1);
    res.redirect('/posts');
});

module.exports = router;
