const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const { updateProfileController } = require("../controllers/updateProfileController");

router.route('/').post(auth , updateProfileController);

module.exports = router;