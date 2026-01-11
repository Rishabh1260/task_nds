const express = require('express');
const controller = require('../controller/users.controller');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.patch('/:id', controller.updateUser);
router.put('/:id/profile', controller.upsertProfile);
router.delete('/:id', controller.deleteUser);

module.exports = router;
