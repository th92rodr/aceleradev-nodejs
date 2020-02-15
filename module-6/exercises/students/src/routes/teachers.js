const express = require('express');
const router = express.Router();
const controller = require('../controllers/teachers');

router.get('/', controller.getAll);

router.get('/:teacherId', controller.getById);

router.post('/', controller.create);

router.put('/:teacherId', controller.update);

router.delete('/:teacherId', controller.delete);

module.exports = router;
