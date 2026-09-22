export type CountryCode = {
  /** ISO 3166-1 alpha-2 — used to render the flag emoji */
  iso: string;
  name: string;
  dial: string;
};

export const countryLocations: Record<string, string[]> = {
  NG: ["Abuja", "Lagos", "Ekiti", "Kano", "Rivers", "Oyo", "Kaduna", "Other city or state"],
  GH: ["Accra", "Kumasi", "Ashanti", "Greater Accra", "Tamale", "Other city or region"],
  KE: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Other city or county"],
  ZA: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Cape Town", "Johannesburg", "Other city or province"],
  EG: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Other city or governorate"],
  MA: ["Casablanca", "Rabat", "Marrakesh", "Fes", "Tangier", "Other city or region"],
  GB: ["England", "Scotland", "Wales", "Northern Ireland", "London", "Sunderland", "Other city or region"],
  IE: ["Dublin", "Cork", "Galway", "Limerick", "Other city or county"],
  US: ["California", "Texas", "Florida", "New York", "Georgia", "Washington", "Other state or city"],
  CA: ["Ontario", "Quebec", "British Columbia", "Alberta", "Toronto", "Other province or city"],
  FR: ["Île-de-France", "Provence-Alpes-Côte d’Azur", "Auvergne-Rhône-Alpes", "Paris", "Lyon", "Other city or region"],
  DE: ["Berlin", "Bavaria", "North Rhine-Westphalia", "Hamburg", "Hesse", "Other city or state"],
  ES: ["Madrid", "Catalonia", "Andalusia", "Valencia", "Basque Country", "Other city or region"],
  IT: ["Lazio", "Lombardy", "Campania", "Sicily", "Rome", "Other city or region"],
  PT: ["Lisbon", "Porto", "Braga", "Algarve", "Other city or region"],
  NL: ["North Holland", "South Holland", "Utrecht", "Amsterdam", "Rotterdam", "Other city or province"],
  BE: ["Brussels", "Flanders", "Wallonia", "Antwerp", "Other city or region"],
  CH: ["Zurich", "Geneva", "Bern", "Vaud", "Other city or canton"],
  SE: ["Stockholm", "Västra Götaland", "Skåne", "Gothenburg", "Other city or county"],
  NO: ["Oslo", "Vestland", "Rogaland", "Trøndelag", "Other city or county"],
  DK: ["Capital Region", "Central Denmark", "North Denmark", "Copenhagen", "Other city or region"],
  AE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Other emirate or city"],
  SA: ["Riyadh", "Makkah", "Madinah", "Eastern Province", "Jeddah", "Other city or region"],
  IN: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Kerala", "Other state or city"],
  PK: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad", "Other city or province"],
  CN: ["Beijing", "Shanghai", "Guangdong", "Sichuan", "Zhejiang", "Other city or province"],
  JP: ["Tokyo", "Osaka", "Hokkaido", "Kyoto", "Aichi", "Other city or prefecture"],
  KR: ["Seoul", "Busan", "Incheon", "Gyeonggi", "Daegu", "Other city or province"],
  AU: ["New South Wales", "Victoria", "Queensland", "Western Australia", "Sydney", "Other city or state"],
  BR: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná", "Other city or state"],
  MX: ["Mexico City", "Jalisco", "Nuevo León", "Yucatán", "Puebla", "Other city or state"],
};

const flag = (iso: string) =>
  iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

export const countryCodes: CountryCode[] = [
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "GH", name: "Ghana", dial: "+233" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "MA", name: "Morocco", dial: "+212" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "MX", name: "Mexico", dial: "+52" },
];

export const flagFor = flag;
