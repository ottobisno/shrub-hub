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