const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);
router.use('/comments', commentRoutes);

module.exports = router;