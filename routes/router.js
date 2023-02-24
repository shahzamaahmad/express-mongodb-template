const express = require("express");
const controller = require("./../controller/controller");

const router = express.Router();

router.post("/hello", controller.getHello);

module.exports = router;
