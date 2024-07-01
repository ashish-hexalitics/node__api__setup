const express = require("express");
const router = express.Router();
const { authRouter, accountRouter } = require("./routes");

router.use("/auth", authRouter);
router.use("/account", accountRouter);

module.exports = router;
