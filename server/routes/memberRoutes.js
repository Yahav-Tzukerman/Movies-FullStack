const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../utils/authMiddleware');
const permissionsMiddleware = require('../utils/permissionsMiddleware');

router.get('/', authMiddleware, permissionsMiddleware('View Subscriptions'), memberController.getAllMembers);
router.post('/', authMiddleware, permissionsMiddleware('Create Subscriptions'), memberController.createMember);
router.put('/:id', authMiddleware, permissionsMiddleware('Update Subscription'), memberController.updateMember);
router.delete('/:id', authMiddleware, permissionsMiddleware('Delete Subscriptions'), memberController.deleteMember);

module.exports = router;
