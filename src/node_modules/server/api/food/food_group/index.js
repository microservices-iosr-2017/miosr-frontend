'use strict';

var express = require('express');
var controller = require('./food_group.controller');

const router = express.Router();

router.get('/', controller.index);

export default router;
