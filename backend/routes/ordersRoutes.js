const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/ordersController");
const { protect, adminOnly } = require("../middleware/auth");

// Optional auth: attach req.user if a valid token is present, but allow guests through.
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return protect(req, res, next);
  }
  next();
};

router.post("/", optionalAuth, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.get("/:id", getOrderById); // public lookup by order number for tracking

module.exports = router;
