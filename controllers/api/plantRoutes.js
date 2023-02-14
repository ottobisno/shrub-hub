const router = require('express').Router();
const { Plant, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new plant post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPlant = await Plant.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPlant);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete an existing plant post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const plantData = await Plant.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!plantData) {
            res.status(404).json({ message: 'No plant found with this id' });
            return;
        };

        res.status(200).json(plantData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing plant post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const plantData = await Plant.findByPk(req.params.id);

        if (!plantData) {
            res.status(404).json({ message: 'No plant found with this id' });
            return;
        };

        const newPlantData = await plantData.update({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPlantData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;