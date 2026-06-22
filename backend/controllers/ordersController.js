const Order = require("../models/Order");
const { SERVICE_CATEGORIES } = require("../config/services");
const { buildWhatsappOrderLink } = require("../utils/whatsapp");
const { sendEmail } = require("../utils/email");

function validateAndPriceItems(items) {
  const priced = [];
  let total = 0;

  for (const item of items) {
    const category = SERVICE_CATEGORIES.find(
      (c) => c.name === item.category || c.slug === item.category
    );
    if (!category) {
      throw Object.assign(new Error(`Unknown service category: ${item.category}`), {
        statusCode: 400,
      });
    }

    const service = category.services.find((s) => s.name === item.service);
    if (!service) {
      throw Object.assign(
        new Error(`Unknown service "${item.service}" in category "${category.name}"`),
        { statusCode: 400 }
      );
    }

    const quantity = Math.max(1, Number(item.quantity) || 1);
    const lineTotal = service.price * quantity;
    total += lineTotal;

    priced.push({
      category: category.name,
      service: service.name,
      price: service.price,
      quantity,
      notes: item.notes || "",
    });
  }

  return { priced, total };
}

// POST /api/orders  (supports logged-in users AND guest checkout)
async function createOrder(req, res, next) {
  try {
    const { items, guestName, guestEmail, guestPhone, source } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart cannot be empty" });
    }

    if (!req.user && (!guestName || !guestEmail)) {
      return res
        .status(400)
        .json({ message: "Guest checkout requires at least a name and email" });
    }

    const { priced, total } = validateAndPriceItems(items);

    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      guestName: req.user ? req.user.fullName : guestName,
      guestEmail: req.user ? req.user.email : guestEmail,
      guestPhone: req.user ? req.user.phone : guestPhone || "",
      items: priced,
      totalEstimate: total,
      source: source || "website",
    });

    const whatsappLink = buildWhatsappOrderLink(order);
    order.whatsappLink = whatsappLink;
    await order.save();

    // Notify company by email (non-blocking on failure)
    const companyEmail = process.env.COMPANY_EMAIL || "apexdigitalworkszw@gmail.com";
    const itemsHtml = priced
      .map((i) => `<li>${i.service} (${i.category}) x${i.quantity} — $${i.price * i.quantity}</li>`)
      .join("");

    sendEmail({
      to: companyEmail,
      replyTo: order.guestEmail,
      subject: `New Order Received: ${order.orderNumber}`,
      html: `
        <h2>New Order: ${order.orderNumber}</h2>
        <p><strong>Customer:</strong> ${order.guestName} (${order.guestEmail}, ${order.guestPhone || "no phone"})</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Estimated Total:</strong> $${order.totalEstimate}</p>
        <p><strong>WhatsApp Link:</strong> <a href="${whatsappLink}">${whatsappLink}</a></p>
      `,
      text: `New Order: ${order.orderNumber}\nCustomer: ${order.guestName} (${order.guestEmail})\nTotal: $${order.totalEstimate}`,
    })
      .then(() => {
        order.emailSent = true;
        return order.save();
      })
      .catch((e) => console.error("Order notification email failed:", e.message));

    // Confirmation email to the customer
    sendEmail({
      to: order.guestEmail,
      subject: `We received your order — ${order.orderNumber}`,
      html: `
        <p>Hi ${order.guestName},</p>
        <p>Thank you for your order! Here's a summary:</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Estimated Total:</strong> $${order.totalEstimate}</p>
        <p>To finalize details and timelines, continue the conversation with us on WhatsApp:</p>
        <p><a href="${whatsappLink}">${whatsappLink}</a></p>
        <p>— The APEXDIGITALWORKSZW Team</p>
      `,
      text: `Hi ${order.guestName}, thank you for your order ${order.orderNumber}. Estimated total: $${order.totalEstimate}. Continue on WhatsApp: ${whatsappLink}`,
    }).catch((e) => console.error("Customer confirmation email failed:", e.message));

    res.status(201).json({
      message: "Order created successfully",
      order,
      whatsappLink,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/my  (logged-in user's orders)
async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id  (single order lookup, used for live tracking by order number too)
async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const isValidObjectId = /^[a-f\d]{24}$/i.test(id);

    const order = await Order.findOne(
      isValidObjectId ? { $or: [{ _id: id }, { orderNumber: id }] } : { orderNumber: id }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders  (admin: all orders)
async function getAllOrders(req, res, next) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 }).populate("user", "fullName email");
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

// PUT /api/orders/:id/status  (admin: update order status)
async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "contacted_on_whatsapp",
      "in_progress",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "contacted_on_whatsapp") order.whatsappMessageSent = true;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
