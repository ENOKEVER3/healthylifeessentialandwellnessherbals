// WhatsApp integration helpers
export const WHATSAPP_NUMBER = "2347062966893"; // Healthy Life Essentials — Nigeria
export const WHATSAPP_DISPLAY = "+234 706 296 6893";

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const buildOrderMessage = (
  items: { name: string; quantity: number; lineTotal: number }[],
  subtotal: number,
  formatPrice: (n: number) => string,
) => {
  const lines = [
    "Hello Healthy Life Essentials 🌿",
    "I'd like to place an order:",
    "",
    ...items.map((i) => `• ${i.name} × ${i.quantity} — ${formatPrice(i.lineTotal)}`),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    "Please confirm availability and delivery details. Thank you!",
  ];
  return lines.join("\n");
};
