const { PageVisit, AnalyticsEvent } = require("../models/Analytics");
const Order = require("../models/Order");
const User = require("../models/User");
const Newsletter = require("../models/Newsletter");

function detectDevice(userAgent = "") {
  const ua = userAgent.toLowerCase();
  if (/mobile|iphone|android/.test(ua)) return "mobile";
  if (/tablet|ipad/.test(ua)) return "tablet";
  if (ua) return "desktop";
  return "unknown";
}

// POST /api/analytics/visit  (called by frontend on page load)
async function trackVisit(req, res, next) {
  try {
    const { path, referrer, sessionId, isUniqueVisitor } = req.body;
    const userAgent = req.headers["user-agent"] || "";

    await PageVisit.create({
      path: path || "/",
      referrer: referrer || "",
      userAgent,
      sessionId: sessionId || "",
      device: detectDevice(userAgent),
      isUniqueVisitor: !!isUniqueVisitor,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

// POST /api/analytics/event  (custom engagement event: cta clicks, whatsapp clicks, etc.)
async function trackEvent(req, res, next) {
  try {
    const { eventType, label, path, sessionId, meta } = req.body;
    if (!eventType) return res.status(400).json({ message: "eventType is required" });

    await AnalyticsEvent.create({ eventType, label, path, sessionId, meta });
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

// GET /api/analytics/dashboard  (admin: aggregated live stats)
async function getDashboardStats(req, res, next) {
  try {
    const now = new Date();
    const since24h = new Date(now - 24 * 60 * 60 * 1000);
    const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const since30d = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const [
      totalVisits,
      visits24h,
      visits7d,
      visits30d,
      uniqueVisitors30d,
      topPages,
      deviceBreakdown,
      eventCounts,
      totalOrders,
      pendingOrders,
      totalUsers,
      totalSubscribers,
      revenueAgg,
    ] = await Promise.all([
      PageVisit.countDocuments(),
      PageVisit.countDocuments({ createdAt: { $gte: since24h } }),
      PageVisit.countDocuments({ createdAt: { $gte: since7d } }),
      PageVisit.countDocuments({ createdAt: { $gte: since30d } }),
      PageVisit.countDocuments({ createdAt: { $gte: since30d }, isUniqueVisitor: true }),
      PageVisit.aggregate([
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      PageVisit.aggregate([{ $group: { _id: "$device", count: { $sum: 1 } } }]),
      AnalyticsEvent.aggregate([
        { $group: { _id: "$eventType", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      User.countDocuments(),
      Newsletter.countDocuments({ isActive: true }),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalEstimate" } } },
      ]),
    ]);

    res.json({
      visits: {
        total: totalVisits,
        last24h: visits24h,
        last7d: visits7d,
        last30d: visits30d,
        uniqueVisitors30d,
      },
      topPages,
      deviceBreakdown,
      eventCounts,
      orders: {
        total: totalOrders,
        pending: pendingOrders,
      },
      users: { total: totalUsers },
      newsletter: { activeSubscribers: totalSubscribers },
      revenueEstimate: revenueAgg[0]?.total || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { trackVisit, trackEvent, getDashboardStats };
