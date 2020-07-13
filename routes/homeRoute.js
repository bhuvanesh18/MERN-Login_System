const express = require("express");
const router = express.Router();
const auth = require('./../middlewares/auth');
const { homeController } = require("../controllers/homeController");

router.route('/').get(auth , homeController);

module.exports = router;