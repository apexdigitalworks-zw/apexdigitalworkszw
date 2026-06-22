const express = require("express");
const router = express.Router();
const {
  getActiveAds,
  recordImpression,
  recordClick,
  getAllAdsAdmin,
  createAd,
  updateAd,
  deleteAd,
} = require("../controllers/adsController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getActiveAds);
router.post("/:id/impression", recordImpression);
router.post("/:id/click", recordClick);

router.get("/admin/all", protect, adminOnly, getAllAdsAdmin);
router.post("/", protect, adminOnly, createAd);
router.put("/:id", protect, adminOnly, updateAd);
router.delete("/:id", protect, adminOnly, deleteAd);

module.exports = router;
