import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLanguage } from "@/i18n/LanguageContext";

export const WhatsAppFloat = () => {
  const { t } = useLanguage();
  const href = buildWhatsAppLink(
    "Hello Healthy Life Essentials 🌿 I'd like to chat with a herbal expert.",
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa_chat_expert")}
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]/60 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2} />
      <span className="hidden text-sm font-medium md:inline">{t("wa_chat_expert")}</span>
      <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-[#25D366] opacity-75" />
    </a>
  );
};
