let users = []; // [{ id, username, password }]
let posts = [
    {
        id: 1,
        userId: 0,
        username: 'Admin',
        title: 'Welcome to SocialApp!',
        content: 'This is the first post on the platform. Feel free to explore and share your thoughts. Features implemented: JWT Auth, Image Uploads, CRUD operations, Pagination, and Dark Mode!',
        image: null,
        createdAt: new Date()
    }
]; 

module.exports = {
    users,
    posts
};
