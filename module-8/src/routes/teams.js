const express = require('express');
const router = express.Router();
const controller = require('../controllers/teams');
const authentication = require('../middlewares/auth');

router.get('/', controller.getAll);

router.get('/:teamId', controller.getById);

router.post('/', authentication, controller.create);

router.patch('/:teamId', authentication, controller.update);

router.delete('/:teamId', authentication, controller.delete);

module.exports = router;
