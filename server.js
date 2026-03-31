const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Handlebars configuration
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
        gt: (a, b) => a > b,
        lt: (a, b) => a < b
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global Middleware to handle user session for views
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            res.locals.user = decoded;
            req.user = decoded;
        } catch (err) {
            res.clearCookie('token');
        }
    }
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
