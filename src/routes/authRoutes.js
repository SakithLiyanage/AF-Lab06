const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../data/db');

// Register GET
router.get('/register', (req, res) => {
    res.render('register', { title: 'Sign Up', user: null });
});

// Register POST
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (users.find(u => u.username === username)) {
        return res.render('register', { error: 'Username already exists', user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET || 'secret');
    res.cookie('token', token).redirect('/posts');
});

// Login GET
router.get('/login', (req, res) => {
    res.render('login', { title: 'Sign In', user: null });
});

// Login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret');
        res.cookie('token', token).redirect('/posts');
    } else {
        res.render('login', { error: 'Invalid credentials', user: null });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/auth/login');
});

module.exports = router;
