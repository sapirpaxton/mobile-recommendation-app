const express = require('express');

const AppsCtrl = require('../controllers/apps-ctrl');
const CategoriesCtrl = require('../controllers/categories-ctrl');

const router = express.Router();

router.get('/apps', AppsCtrl.getApps);
router.get('/categories', CategoriesCtrl.getCategories);

module.exports = router;