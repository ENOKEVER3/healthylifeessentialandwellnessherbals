import { LanguageCode } from "./LanguageContext";

const en = {
  nav_home: "Home",
  nav_consultation: "Medical Consultation",
  nav_consult_short: "Consult",
  nav_shop: "Shop",
  nav_ceo: "About the CEO",
  nav_ceo_short: "CEO",
  nav_all_products: "All products",
  cart: "Cart",

  hero_eyebrow: "Healthy Life Essentials & Wellness Herbals",
  hero_title: "Natural healing, doctor-formulated.",
  hero_subtitle:
    "Herbal remedies for feminine wellness, hormonal balance, infections, vitality and skin — crafted by Naturopathic Dr. Kolawole Oluwatomisin Esther.",
  hero_cta_shop: "Shop products",
  hero_cta_book: "Book a consultation",

  consult_eyebrow: "Medical Consultation",
  consult_title: "Speak privately with Dr. Oluwatomisin's team.",
  consult_subtitle:
    "Share your health intake confidentially. We'll review your information and reach out with a personalized natural protocol — typically within 24 hours.",

  footer_tagline:
    "Naturopathic, doctor-formulated herbal remedies for feminine wellness, hormonal balance, infections and vitality. Made in Nigeria, shipped nationwide.",
  footer_shop: "Shop",
  footer_company: "Company",
  footer_about_ceo: "About the CEO",
  footer_consultation: "Medical Consultation",
  footer_about: "Our Craft",

  language: "Language",
};

export type TranslationKey = keyof typeof en;

const fr: Record<TranslationKey, string> = {
  nav_home: "Accueil",
  nav_consultation: "Consultation médicale",
  nav_consult_short: "Consult.",
  nav_shop: "Boutique",
  nav_ceo: "À propos de la fondatrice",
  nav_ceo_short: "Fondatrice",
  nav_all_products: "Tous les produits",
  cart: "Panier",

  hero_eyebrow: "Healthy Life Essentials & Wellness Herbals",
  hero_title: "Soins naturels, formulés par un médecin.",
  hero_subtitle:
    "Remèdes à base de plantes pour le bien-être féminin, l'équilibre hormonal, les infections, la vitalité et la peau — élaborés par la Dre naturopathe Kolawole Oluwatomisin Esther.",
  hero_cta_shop: "Voir les produits",
  hero_cta_book: "Prendre rendez-vous",

  consult_eyebrow: "Consultation médicale",
  consult_title: "Parlez en privé à l'équipe de la Dre Oluwatomisin.",
  consult_subtitle:
    "Partagez vos informations de santé en toute confidentialité. Nous vous recontactons avec un protocole naturel personnalisé — généralement sous 24 heures.",

  footer_tagline:
    "Remèdes à base de plantes formulés par un médecin naturopathe pour le bien-être féminin, l'équilibre hormonal, les infections et la vitalité. Fabriqués au Nigeria, expédiés dans le monde entier.",
  footer_shop: "Boutique",
  footer_company: "Entreprise",
  footer_about_ceo: "À propos de la fondatrice",
  footer_consultation: "Consultation médicale",
  footer_about: "Notre savoir-faire",

  language: "Langue",
};

const de: Record<TranslationKey, string> = {
  nav_home: "Startseite",
  nav_consultation: "Medizinische Beratung",
  nav_consult_short: "Beratung",
  nav_shop: "Shop",
  nav_ceo: "Über die Gründerin",
  nav_ceo_short: "Gründerin",
  nav_all_products: "Alle Produkte",
  cart: "Warenkorb",

  hero_eyebrow: "Healthy Life Essentials & Wellness Herbals",
  hero_title: "Natürliche Heilung, ärztlich formuliert.",
  hero_subtitle:
    "Pflanzliche Heilmittel für weibliches Wohlbefinden, hormonelles Gleichgewicht, Infektionen, Vitalität und Haut — entwickelt von der Naturheilärztin Dr. Kolawole Oluwatomisin Esther.",
  hero_cta_shop: "Produkte ansehen",
  hero_cta_book: "Beratung buchen",

  consult_eyebrow: "Medizinische Beratung",
  consult_title: "Sprechen Sie vertraulich mit Dr. Oluwatomisins Team.",
  consult_subtitle:
    "Teilen Sie Ihre Gesundheitsangaben vertraulich. Wir prüfen Ihre Informationen und melden uns mit einem persönlichen Naturheilprotokoll — in der Regel innerhalb von 24 Stunden.",

  footer_tagline:
    "Naturheilkundliche, ärztlich formulierte Kräuterheilmittel für weibliches Wohlbefinden, hormonelles Gleichgewicht, Infektionen und Vitalität. Hergestellt in Nigeria, weltweit versandt.",
  footer_shop: "Shop",
  footer_company: "Unternehmen",
  footer_about_ceo: "Über die Gründerin",
  footer_consultation: "Medizinische Beratung",
  footer_about: "Unser Handwerk",

  language: "Sprache",
};

const zh: Record<TranslationKey, string> = {
  nav_home: "首页",
  nav_consultation: "医疗咨询",
  nav_consult_short: "咨询",
  nav_shop: "商店",
  nav_ceo: "关于创始人",
  nav_ceo_short: "创始人",
  nav_all_products: "全部产品",
  cart: "购物车",

  hero_eyebrow: "Healthy Life Essentials & Wellness Herbals",
  hero_title: "天然疗愈,医师配方。",
  hero_subtitle:
    "由自然疗法医师 Kolawole Oluwatomisin Esther 配制的草本疗法,呵护女性健康、荷尔蒙平衡、感染、活力与肌肤。",
  hero_cta_shop: "选购产品",
  hero_cta_book: "预约咨询",

  consult_eyebrow: "医疗咨询",
  consult_title: "与 Oluwatomisin 医师团队进行私密交流。",
  consult_subtitle:
    "请保密地分享您的健康信息。我们将审阅并在 24 小时内为您提供个性化的天然方案。",

  footer_tagline:
    "由自然疗法医师配制的草本疗法,关注女性健康、荷尔蒙平衡、感染与活力。尼日利亚制造,全球发货。",
  footer_shop: "商店",
  footer_company: "公司",
  footer_about_ceo: "关于创始人",
  footer_consultation: "医疗咨询",
  footer_about: "我们的工艺",

  language: "语言",
};

const pt: Record<TranslationKey, string> = {
  nav_home: "Início",
  nav_consultation: "Consulta médica",
  nav_consult_short: "Consulta",
  nav_shop: "Loja",
  nav_ceo: "Sobre a fundadora",
  nav_ceo_short: "Fundadora",
  nav_all_products: "Todos os produtos",
  cart: "Carrinho",

  hero_eyebrow: "Healthy Life Essentials & Wellness Herbals",
  hero_title: "Cura natural, formulada por médica.",
  hero_subtitle:
    "Remédios à base de ervas para o bem-estar feminino, equilíbrio hormonal, infecções, vitalidade e pele — elaborados pela médica naturopata Dra. Kolawole Oluwatomisin Esther.",
  hero_cta_shop: "Ver produtos",
  hero_cta_book: "Agendar consulta",

  consult_eyebrow: "Consulta médica",
  consult_title: "Fale em privado com a equipa da Dra. Oluwatomisin.",
  consult_subtitle:
    "Partilhe as suas informações de saúde com total confidencialidade. Vamos analisar e responder com um protocolo natural personalizado — normalmente em 24 horas.",

  footer_tagline:
    "Remédios à base de ervas formulados por médica naturopata para o bem-estar feminino, equilíbrio hormonal, infecções e vitalidade. Feitos na Nigéria, enviados para todo o mundo.",
  footer_shop: "Loja",
  footer_company: "Empresa",
  footer_about_ceo: "Sobre a fundadora",
  footer_consultation: "Consulta médica",
  footer_about: "O nosso ofício",

  language: "Idioma",
};

export const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en,
  fr,
  de,
  zh,
  pt,
};
