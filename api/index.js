const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("OK");
});

const v1Router = require('./v1');
router.use("/v1", v1Router);


module.exports = router;
