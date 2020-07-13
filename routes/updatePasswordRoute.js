const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const { updatePasswordController } = require("../controllers/updatePasswordController");

router.route('/').post(auth , updatePasswordController);

module.exports = router;