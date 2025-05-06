const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../utils/authMiddleware');
const permissionsMiddleware = require('../utils/permissionsMiddleware');

router.get('/', authMiddleware, permissionsMiddleware('View Subscriptions'), subscriptionController.getAllSubscriptions);
router.post('/', authMiddleware, permissionsMiddleware('Create Subscriptions'), subscriptionController.createSubscription);
router.put('/:id/addMovie', authMiddleware, permissionsMiddleware('Update Subscription'), subscriptionController.addMovieToSubscription);
router.delete('/:id', authMiddleware, permissionsMiddleware('Delete Subscriptions'), subscriptionController.deleteSubscription);

module.exports = router;
