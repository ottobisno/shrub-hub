const router = require('express').Router();
const { User, Plant, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all plant posts to display on the homepage
router.get('/', async (req, res) => {
    try {
        // Get all plant posts and join with user data
        const plantData = await Plant.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        // Serializing the data so the template can read it
        const plants = plantData.map((plant) => plant.get({ plain: true }));

        // Pass the serialized data and session flag into template
        res.render('homepage', {
            plants,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

// Get an individual plant post by id
router.get('/plant/:id', async (req, res) => {
    try {
        const plantData = await Plant.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment
                }
            ]
        });

        const plant = plantData.get({ plain: true });

        res.render('plant', {
            ...plant,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

// Get the profile page for an individual user, with authentication
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on session id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Plant }]
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

// Get the login page for a user who is not logged in
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    };

    res.render('login');
});

module.exports = router;