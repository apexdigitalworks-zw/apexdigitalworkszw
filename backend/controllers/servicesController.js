const { SERVICE_CATEGORIES } = require("../config/services");

// GET /api/services
function getAllServices(req, res) {
  res.json({ categories: SERVICE_CATEGORIES });
}

// GET /api/services/:slug
function getCategoryBySlug(req, res) {
  const category = SERVICE_CATEGORIES.find((c) => c.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ message: "Service category not found" });
  }
  res.json({ category });
}

module.exports = { getAllServices, getCategoryBySlug };
