const Ad = require("../models/Ad");

// GET /api/ads  (public: returns only active ads, optionally filtered by placement)
async function getActiveAds(req, res, next) {
  try {
    const { placement } = req.query;
    const filter = {
      isActive: true,
      $or: [{ endDate: null }, { endDate: { $gte: new Date() } }],
    };
    if (placement) filter.placement = placement;

    const ads = await Ad.find(filter).sort({ createdAt: -1 });
    res.json({ ads });
  } catch (err) {
    next(err);
  }
}

// POST /api/ads/:id/impression
async function recordImpression(req, res, next) {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { impressions: 1 } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// POST /api/ads/:id/click
async function recordClick(req, res, next) {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// ---- Admin CRUD ----

// GET /api/ads/admin/all
async function getAllAdsAdmin(req, res, next) {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json({ ads });
  } catch (err) {
    next(err);
  }
}

// POST /api/ads
async function createAd(req, res, next) {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json({ message: "Ad created", ad });
  } catch (err) {
    next(err);
  }
}

// PUT /api/ads/:id
async function updateAd(req, res, next) {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json({ message: "Ad updated", ad });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/ads/:id
async function deleteAd(req, res, next) {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ message: "Ad deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getActiveAds,
  recordImpression,
  recordClick,
  getAllAdsAdmin,
  createAd,
  updateAd,
  deleteAd,
};
