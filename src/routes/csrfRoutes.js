const express = require('express');

const { getCsrfToken } = require('../controllers/csrfController');
const csrfMiddleware = require('../middlewares/csrfMiddleware');

const csrfRouter = express.Router();

csrfRouter.get('/csrf-token', csrfMiddleware, getCsrfToken);

module.exports = { csrfRouter };
