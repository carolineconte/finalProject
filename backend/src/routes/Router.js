const express = require('express');
const router = express()

router.use("/api/users", require("./UserRoutes"));

router.use("/professional", require("./vetRoutes"));

router.use("/owner", require("./OwnerRoutes"));

router.use("/", require("./PetRoutes"));

module.exports = router