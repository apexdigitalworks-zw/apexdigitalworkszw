const express = require("express");
const router = express.Router();
const { getAllServices, getCategoryBySlug } = require("../controllers/servicesController");

router.get("/", getAllServices);
router.get("/:slug", getCategoryBySlug);

module.exports = router;
