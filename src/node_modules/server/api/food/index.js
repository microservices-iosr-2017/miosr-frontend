'use strict';

var express = require('express');
var controller = require('./food.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

export default router;
