/**
 * Builds a pre-filled WhatsApp chat link for a given order, so the customer
 * (or admin) can tap through and immediately continue the conversation with
 * order details already typed into the message box.
 */
function buildWhatsappOrderLink(order) {
  const phone = process.env.COMPANY_WHATSAPP || "263781909006";

  const itemsText = order.items
    .map((i) => `- ${i.service} (${i.category}) x${i.quantity}`)
    .join("\n");

  const message =
    `Hello APEXDIGITALWORKSZW! \n` +
    `I just placed an order on your website.\n\n` +
    `Order Number: ${order.orderNumber}\n` +
    `Items:\n${itemsText}\n\n` +
    `Estimated Total: $${order.totalEstimate}\n\n` +
    `Please confirm and let me know the next steps. Thank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

module.exports = { buildWhatsappOrderLink };
