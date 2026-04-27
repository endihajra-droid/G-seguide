import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════════════
const T = {
  sv: {
    badge: "DIGITAL GÄSTGUIDE",
    tagline: "Välkommen hem",
    in: "IN", out: "UT", max: "MAX", guests: "GÄSTER",
    call: "Ring", mail: "Mail", map: "Karta",
    wifi: "WiFi", network: "NÄTVERK", password: "LÖSENORD", copy: "KOPIERA", copied: "✓ KOPIERAD",
    checkin: "Incheckning", checkoutSec: "Utcheckning", checkInTime: "INCHECKNING", checkOutTime: "UTCHECKNING", orLater: "eller senare", atLatest: "senast",
    keyTitle: "Nyckelinstruktion",
    shop: "Minibar & Snacks", shopDesc: "Ta det du vill ha från minibar-hyllan och betala smidigt via Revolut.",
    drinks: "DRYCKER", snacks: "SNACKS", extras: "ÖVRIGT",
    items: "varor", item: "vara", payNow: "Betala via Revolut →", payNote: "Skriv vad du köpt i meddelandet. Tack!",
    home: "Hemmet", rules: "Husregler", explore: "Utforska Malmö", checkoutTitle: "Utcheckning", emergency: "Nödinfo",
    emergencyNum: "Nödnummer", healthAdvice: "Sjukvårdsrådgivning", host: "Värd — Endrit",
    safetyNote: "Brandsläckare finns i hallen. Första hjälpen-kit i badrumsskåpet.",
    footer: "Vi hoppas ni får en underbar vistelse",
    weather: "Väder just nu",
    feelsLike: "Känns som",
    wind: "Vind",
    humidity: "Fukt",
    tourist: "TURISTPÄRLA",
    shopping: "SHOPPING",
    food: "MAT",
    grocery: "MATAFFÄR",
    pharmacy: "APOTEK",
    sightseeing: "SEVÄRDHETER",
    loading: "Laddar produkter...",
    getDirections: "Vägbeskrivning",
  },
  en: {
    badge: "DIGITAL GUEST GUIDE",
    tagline: "Welcome home",
    in: "IN", out: "OUT", max: "MAX", guests: "GUESTS",
    call: "Call", mail: "Mail", map: "Map",
    wifi: "WiFi", network: "NETWORK", password: "PASSWORD", copy: "COPY", copied: "✓ COPIED",
    checkin: "Check-in", checkoutSec: "Check-out", checkInTime: "CHECK-IN", checkOutTime: "CHECK-OUT", orLater: "or later", atLatest: "at the latest",
    keyTitle: "Key instructions",
    shop: "Minibar & Snacks", shopDesc: "Help yourself from the minibar shelf and pay easily via Revolut.",
    drinks: "DRINKS", snacks: "SNACKS", extras: "EXTRAS",
    items: "items", item: "item", payNow: "Pay via Revolut →", payNote: "Write what you took in the message. Thanks!",
    home: "The Home", rules: "House Rules", explore: "Explore Malmö", checkoutTitle: "Check-out", emergency: "Emergency",
    emergencyNum: "Emergency number", healthAdvice: "Health advice line", host: "Host — Endrit",
    safetyNote: "Fire extinguisher in the hallway. First aid kit in the bathroom cabinet.",
    footer: "We hope you have a wonderful stay",
    weather: "Weather now",
    feelsLike: "Feels like",
    wind: "Wind",
    humidity: "Humidity",
    tourist: "MUST SEE",
    shopping: "SHOPPING",
    food: "FOOD",
    grocery: "GROCERY",
    pharmacy: "PHARMACY",
    sightseeing: "SIGHTSEEING",
    loading: "Loading products...",
    getDirections: "Directions",
  },
  de: {
    badge: "DIGITALER GÄSTEFÜHRER",
    tagline: "Willkommen zu Hause",
    in: "EIN", out: "AUS", max: "MAX", guests: "GÄSTE",
    call: "Anruf", mail: "Mail", map: "Karte",
    wifi: "WLAN", network: "NETZWERK", password: "PASSWORT", copy: "KOPIEREN", copied: "✓ KOPIERT",
    checkin: "Check-in", checkoutSec: "Check-out", checkInTime: "CHECK-IN", checkOutTime: "CHECK-OUT", orLater: "oder später", atLatest: "spätestens",
    keyTitle: "Schlüsselanleitung",
    shop: "Minibar & Snacks", shopDesc: "Bedienen Sie sich aus der Minibar und zahlen Sie bequem über Revolut.",
    drinks: "GETRÄNKE", snacks: "SNACKS", extras: "EXTRAS",
    items: "Artikel", item: "Artikel", payNow: "Über Revolut bezahlen →", payNote: "Schreiben Sie bitte was Sie genommen haben. Danke!",
    home: "Das Haus", rules: "Hausregeln", explore: "Malmö entdecken", checkoutTitle: "Check-out", emergency: "Notfall",
    emergencyNum: "Notrufnummer", healthAdvice: "Gesundheitsberatung", host: "Gastgeber — Endrit",
    safetyNote: "Feuerlöscher im Flur. Erste-Hilfe-Set im Badezimmerschrank.",
    footer: "Wir hoffen, Sie haben einen wunderbaren Aufenthalt",
    weather: "Wetter jetzt",
    feelsLike: "Gefühlt",
    wind: "Wind",
    humidity: "Feucht.",
    tourist: "SEHENSWERT",
    shopping: "SHOPPING",
    food: "ESSEN",
    grocery: "SUPERMARKT",
    pharmacy: "APOTHEKE",
    sightseeing: "SEHENSWÜRDIGKEITEN",
    loading: "Produkte werden geladen...",
    getDirections: "Wegbeschreibung",
  },
};

const RULES = {
  sv: [
    "Rökning ej tillåtet inomhus",
    "Inga fester eller evenemang",
    "Tystnad efter kl 23:00",
    "Sortera sopor enligt skyltarna under diskbänken",
    "Lås dörren när ni lämnar huset",
  ],
  en: [
    "No smoking indoors",
    "No parties or events",
    "Quiet hours after 11 PM",
    "Sort waste according to the signs under the kitchen counter",
    "Lock the door when you leave",
  ],
  de: [
    "Rauchen im Haus nicht gestattet",
    "Keine Partys oder Veranstaltungen",
    "Ruhezeit ab 23:00 Uhr",
    "Müll nach den Schildern unter der Spüle trennen",
    "Tür beim Verlassen abschließen",
  ],
};

const APPLIANCES = {
  sv: [
    { icon: "👕", label: "Tvättmaskin", desc: "Tvättmedel ovan tvättmaskinen. Använd program 40°C blandat." },
    { icon: "🍽️", label: "Diskmaskin", desc: "Tab under diskbänken. Starta med knappen till höger." },
    { icon: "🌡️", label: "Värmepump", desc: "Fjärrkontroll på hyllan i vardagsrummet, höger om tavlan. Rekommenderat: 22°C." },
  ],
  en: [
    { icon: "👕", label: "Washing machine", desc: "Detergent above the machine. Use the 40°C mixed program." },
    { icon: "🍽️", label: "Dishwasher", desc: "Tabs under the kitchen counter. Start with the button on the right." },
    { icon: "🌡️", label: "Heat pump", desc: "Remote on the shelf in the living room, right of the painting. Recommended: 22°C." },
  ],
  de: [
    { icon: "👕", label: "Waschmaschine", desc: "Waschmittel über der Maschine. Programm 40°C Mischung verwenden." },
    { icon: "🍽️", label: "Geschirrspüler", desc: "Tabs unter der Spüle. Mit dem Knopf rechts starten." },
    { icon: "🌡️", label: "Wärmepumpe", desc: "Fernbedienung auf dem Regal im Wohnzimmer, rechts vom Bild. Empfohlen: 22°C." },
  ],
};

const CHECKOUT = {
  sv: [
    "Starta diskmaskinen",
    "Töm kylskåpet på era varor",
    "Ta ut soporna och sortera i sopkontainerna vid uppfarten",
    "Stäng & lås alla fönster och dörrar",
    "Lägg nyckeln i nyckelboxen",
    "Släck alla lampor",
    "Lämna alla handdukar i tvättkorgen",
  ],
  en: [
    "Start the dishwasher",
    "Empty the fridge of your items",
    "Take out the trash and sort it in the bins by the driveway",
    "Close & lock all windows and doors",
    "Put the key back in the key box",
    "Turn off all lights",
    "Leave all towels in the laundry basket",
  ],
  de: [
    "Geschirrspüler starten",
    "Kühlschrank von Ihren Sachen leeren",
    "Müll rausbringen und in die Tonnen an der Einfahrt sortieren",
    "Alle Fenster und Türen schließen & abschließen",
    "Schlüssel zurück in die Schlüsselbox legen",
    "Alle Lichter ausschalten",
    "Alle Handtücher in den Wäschekorb legen",
  ],
};

const KEY_INFO = {
  sv: "Kod till nyckelboxen skickas dagen innan ankomst tillsammans med incheckningsinstruktionerna. Vrid handtaget efter att du har angett koden för att ta ut nyckeln.",
  en: "The key box code will be provided the day before arrival together with the check-in instructions. Turn the handle afterwards to retrieve the key.",
  de: "Der Code für die Schlüsselbox wird am Tag vor der Ankunft zusammen mit den Check-in-Anweisungen bereitgestellt. Drehen Sie anschließend den Griff, um den Schlüssel zu entnehmen.",
};

const LOCAL = {
  sv: [
    { name: "Turning Torso", type: "sightseeing", dist: "15 min", note: "Ikonisk skyskrapa i Västra Hamnen — perfekt för foton" },
    { name: "Malmöhus Slott", type: "sightseeing", dist: "12 min", note: "Nordens äldsta renässansslott med museum" },
    { name: "Ribersborgs Kallbadhus", type: "sightseeing", dist: "14 min", note: "Havsbad & bastu — öppet året runt" },
    { name: "Emporia", type: "shopping", dist: "10 min", note: "Stort köpcentrum i Hyllie med 200+ butiker" },
    { name: "Rekas Burger", type: "food", dist: "7 min", note: "Populär burgare i Söderkulla" },
    { name: "McDonald's Lockarp", type: "food", dist: "8 min", note: "Snabbmat nära till hands" },
    { name: "Willys", type: "grocery", dist: "5 min", note: "Lindängen Centrum — budgetvänligt" },
    { name: "ICA Maxi", type: "grocery", dist: "8 min", note: "Cypressvägen — stort utbud" },
    { name: "Apotek", type: "pharmacy", dist: "5 min", note: "Lindängen Centrum" },
    { name: "Lilla Torg", type: "sightseeing", dist: "12 min", note: "Mysigt torg med restauranger & caféer i gamla stan" },
    { name: "Folkets Park", type: "sightseeing", dist: "10 min", note: "Familjeparken med lekplats, minigolf & evenemang" },
    { name: "Möllevångstorget", type: "food", dist: "10 min", note: "Malmös matmecka — marknader, falafel & streetfood" },
  ],
  en: [
    { name: "Turning Torso", type: "sightseeing", dist: "15 min", note: "Iconic skyscraper in Western Harbour — great for photos" },
    { name: "Malmöhus Castle", type: "sightseeing", dist: "12 min", note: "Scandinavia's oldest Renaissance castle with museums" },
    { name: "Ribersborg Open-Air Bath", type: "sightseeing", dist: "14 min", note: "Sea bath & sauna — open year round" },
    { name: "Emporia", type: "shopping", dist: "10 min", note: "Large shopping mall in Hyllie with 200+ stores" },
    { name: "Rekas Burger", type: "food", dist: "7 min", note: "Popular burgers in Söderkulla" },
    { name: "McDonald's Lockarp", type: "food", dist: "8 min", note: "Quick food nearby" },
    { name: "Willys", type: "grocery", dist: "5 min", note: "Lindängen Centrum — budget-friendly" },
    { name: "ICA Maxi", type: "grocery", dist: "8 min", note: "Cypressvägen — large selection" },
    { name: "Pharmacy", type: "pharmacy", dist: "5 min", note: "Lindängen Centrum" },
    { name: "Lilla Torg", type: "sightseeing", dist: "12 min", note: "Charming square with restaurants & cafés in Old Town" },
    { name: "Folkets Park", type: "sightseeing", dist: "10 min", note: "Family park with playground, minigolf & events" },
    { name: "Möllevångstorget", type: "food", dist: "10 min", note: "Malmö's food hub — markets, falafel & street food" },
  ],
  de: [
    { name: "Turning Torso", type: "sightseeing", dist: "15 Min", note: "Ikonischer Wolkenkratzer im Westhafen — perfekt für Fotos" },
    { name: "Schloss Malmöhus", type: "sightseeing", dist: "12 Min", note: "Skandinaviens ältestes Renaissanceschloss mit Museen" },
    { name: "Ribersborg Freibad", type: "sightseeing", dist: "14 Min", note: "Meerbad & Sauna — ganzjährig geöffnet" },
    { name: "Emporia", type: "shopping", dist: "10 Min", note: "Großes Einkaufszentrum in Hyllie mit 200+ Geschäften" },
    { name: "Rekas Burger", type: "food", dist: "7 Min", note: "Beliebte Burger in Söderkulla" },
    { name: "McDonald's Lockarp", type: "food", dist: "8 Min", note: "Schnelles Essen in der Nähe" },
    { name: "Willys", type: "grocery", dist: "5 Min", note: "Lindängen Centrum — günstig" },
    { name: "ICA Maxi", type: "grocery", dist: "8 Min", note: "Cypressvägen — große Auswahl" },
    { name: "Apotheke", type: "pharmacy", dist: "5 Min", note: "Lindängen Centrum" },
    { name: "Lilla Torg", type: "sightseeing", dist: "12 Min", note: "Gemütlicher Platz mit Restaurants & Cafés in der Altstadt" },
    { name: "Folkets Park", type: "sightseeing", dist: "10 Min", note: "Familienpark mit Spielplatz, Minigolf & Events" },
    { name: "Möllevångstorget", type: "food", dist: "10 Min", note: "Malmös Food-Mekka — Märkte, Falafel & Streetfood" },
  ],
};

// ═══════════════════════════════════════════
// GOOGLE SHEETS MINIBAR — SÅ HÄR GÖR DU:
//
// 1. Öppna Google Sheets → skapa nytt ark
// 2. Skriv dessa kolumnrubriker i rad 1:
//    name | price | emoji | category
// 3. Fyll i dina produkter under, t.ex:
//    Coca-Cola | 16 | 🥤 | drink
//    Marabou   | 30 | 🍫 | snack
//    Handduk   | 75 | 🛁 | extra
//
//    category måste vara: drink, snack eller extra
//
// 4. Klicka: Arkiv → Dela → Publicera på webben
//    Välj "Kommaseparerade värden (.csv)" → Publicera
// 5. Kopiera länken och klistra in den nedan ↓
// ═══════════════════════════════════════════
const GOOGLE_SHEET_CSV_URL = "";
// ← Klistra in din Google Sheets CSV-länk här
// Exempel: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"
// Lämna "" för att använda reservlistan nedan istället.

// Reservlista — används om Google Sheet-länken är tom eller inte kan laddas
// Använd objekt-format för name så du kan ha översättningar: { sv: "...", en: "...", de: "..." }
// Eller en sträng om produkten heter samma på alla språk (t.ex. "Coca-Cola", "Red Bull")
const FALLBACK_ITEMS = [
  { id: 1,  name: { sv: "Läsk",          en: "Soft drink",     de: "Softdrink" },        price: 16, emoji: "🥤", cat: "drink" },
  { id: 2,  name: { sv: "Bubbelvatten",  en: "Sparkling water", de: "Sprudelwasser" },   price: 16, emoji: "💧", cat: "drink" },
  { id: 3,  name: { sv: "Stilla vatten", en: "Still water",    de: "Stilles Wasser" },   price: 16, emoji: "💧", cat: "drink" },
  { id: 4,  name: "Red Bull",                                                            price: 26, emoji: "⚡", cat: "drink" },
  { id: 5,  name: { sv: "Lättöl",        en: "Light beer",     de: "Leichtbier" },       price: 35, emoji: "🍺", cat: "drink" },
  { id: 6,  name: { sv: "Juice",         en: "Juice",          de: "Saft" },             price: 20, emoji: "🧃", cat: "drink" },
  { id: 7,  name: { sv: "Kex Choklad",   en: "Chocolate wafer", de: "Schokowaffel" },    price: 25, emoji: "🍫", cat: "snack" },
  { id: 8,  name: { sv: "Choklad",       en: "Chocolate bar",  de: "Schokolade" },       price: 30, emoji: "🍫", cat: "snack" },
  { id: 9,  name: { sv: "Nötmix",        en: "Nut mix",        de: "Nussmix" },          price: 25, emoji: "🥜", cat: "snack" },
  { id: 10, name: { sv: "Chips",         en: "Chips",          de: "Chips" },            price: 30, emoji: "🥨", cat: "snack" },
  { id: 11, name: { sv: "Handduksset",   en: "Towel set",      de: "Handtuch-Set" },     price: 75, emoji: "🛁", cat: "extra" },
];

// Hjälpfunktion: hämtar rätt språk-version av produktnamnet
function getName(name, lang) {
  if (typeof name === "string") return name;
  if (typeof name === "object" && name) return name[lang] || name.en || name.sv || "";
  return "";
}

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
  return lines.slice(1).map((line, i) => {
    const vals = line.split(",").map(v => v.trim().replace(/['"]/g, ""));
    const row = {};
    headers.forEach((h, j) => { row[h] = vals[j] || ""; });
    // Stöd för flerspråkiga kolumner i Google Sheets: name_sv, name_en, name_de
    const hasMultiLang = row.name_sv || row.name_en || row.name_de;
    const name = hasMultiLang
      ? { sv: row.name_sv || row.name || "", en: row.name_en || row.name || "", de: row.name_de || row.name || "" }
      : (row.name || "");
    return {
      id: i + 1,
      name,
      price: parseInt(row.price) || 0,
      emoji: row.emoji || "📦",
      cat: (row.category || "extra").toLowerCase(),
    };
  }).filter(item => {
    const n = typeof item.name === "string" ? item.name : (item.name.sv || item.name.en);
    return n && item.price > 0;
  });
}

const REVOLUT_URL = "https://revolut.me/endritttt6";

// ═══════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════
function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.7s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.7s ${delay}s cubic-bezier(.22,1,.36,1)`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

function CopyBtn({ text, lang }) {
  const [ok, setOk] = useState(false);
  const t = T[lang];
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1800); }}
      className="copy-btn" data-copied={ok ? "true" : "false"}>
      {ok ? t.copied : t.copy}
    </button>
  );
}

function WeatherWidget({ lang, dark }) {
  const [w, setW] = useState(null);
  const t = T[lang];
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=55.6059&longitude=13.0007&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=Europe/Stockholm")
      .then(r => r.json()).then(d => setW(d.current)).catch(() => {});
  }, []);

  const weatherIcon = (code) => {
    if (!code && code !== 0) return "🌡️";
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌧️";
    if (code <= 86) return "🌨️";
    return "⛈️";
  };

  if (!w) return null;
  const bg = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const sub = dark ? "rgba(232,224,212,0.4)" : "rgba(58,48,40,0.45)";
  const main = dark ? "#e8e0d4" : "#2a2520";

  return (
    <div style={{ padding: "16px 18px", borderRadius: 14, background: bg, border: `1px solid ${border}`, marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: sub, marginBottom: 12 }}>{t.weather.toUpperCase()}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>{weatherIcon(w.weather_code)}</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: main, fontFamily: "'Outfit',sans-serif" }}>{Math.round(w.temperature_2m)}°C</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          <span style={{ fontSize: 11, color: sub }}>{t.feelsLike} {Math.round(w.apparent_temperature)}°</span>
          <span style={{ fontSize: 11, color: sub }}>{t.wind} {Math.round(w.wind_speed_10m)} km/h</span>
          <span style={{ fontSize: 11, color: sub }}>{t.humidity} {w.relative_humidity_2m}%</span>
        </div>
      </div>
    </div>
  );
}

function Shop({ lang, dark }) {
  const t = T[lang];
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [loading, setLoading] = useState(!!GOOGLE_SHEET_CSV_URL);
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) return;
    fetch(GOOGLE_SHEET_CSV_URL)
      .then(r => r.text())
      .then(csv => {
        const parsed = parseCSV(csv);
        if (parsed.length > 0) setItems(parsed);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = Object.entries(cart).reduce((s, [id, q]) => { const it = items.find(i => i.id === +id); return s + (it ? it.price * q : 0); }, 0);
  const count = Object.values(cart).reduce((s, q) => s + q, 0);
  const add = id => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = id => setCart(c => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const summary = Object.entries(cart).map(([id, q]) => { const it = items.find(i => i.id === +id); return `${q}x ${getName(it.name, lang)}`; }).join(", ");

  const catLabel = { drink: t.drinks, snack: t.snacks, extra: t.extras };
  const bg = dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const bgActive = dark ? "rgba(176,141,87,0.06)" : "rgba(176,141,87,0.08)";
  const borderNorm = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const borderAct = dark ? "rgba(176,141,87,0.18)" : "rgba(176,141,87,0.25)";
  const txt = dark ? "#e8e0d4" : "#2a2520";
  const sub = dark ? "rgba(232,224,212,0.4)" : "rgba(58,48,40,0.45)";

  return (
    <div>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: sub, lineHeight: 1.6 }}>{t.shopDesc}</p>
      {loading ? (
        <div style={{ textAlign: "center", padding: "24px 0", color: sub, fontSize: 13 }}>{t.loading}</div>
      ) : ["drink", "snack", "extra"].map(cat => {
        const catItems = items.filter(i => i.cat === cat);
        if (!catItems.length) return null;
        return (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: "rgba(176,141,87,0.55)", marginBottom: 10 }}>{catLabel[cat]}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {catItems.map(item => {
                const q = cart[item.id] || 0;
                return (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 14px", borderRadius: 10,
                    background: q > 0 ? bgActive : bg,
                    border: `1px solid ${q > 0 ? borderAct : borderNorm}`,
                    transition: "all 0.3s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getName(item.name, lang)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#b08d57", minWidth: 40, textAlign: "right" }}>{item.price}kr</span>
                      {q === 0 ? (
                        <button onClick={() => add(item.id)} className="shop-add-btn">+</button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <button onClick={() => rem(item.id)} className="shop-qty-btn">−</button>
                          <span style={{ width: 22, textAlign: "center", fontSize: 14, fontWeight: 700, color: txt }}>{q}</span>
                          <button onClick={() => add(item.id)} className="shop-qty-btn shop-qty-btn-fill">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {count > 0 && (
        <div className="cart-bar">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{count} {count === 1 ? t.item : t.items}</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif" }}>{total} kr</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.15)", padding: "8px 12px", borderRadius: 8, wordBreak: "break-all", marginBottom: 10 }}>
            {summary}
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{t.payNote}</p>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "14px", textAlign: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1 }}>ATT BETALA</span>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", marginTop: 2 }}>{total} kr</div>
          </div>
          <a href={REVOLUT_URL} target="_blank" rel="noreferrer" className="revolut-btn">
            {t.payNow}
          </a>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════
export default function GuestGuide() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const t = T[lang];

  const accent = "#b08d57";
  const pageBg = dark ? "#1a1714" : "#faf6f1";
  const cardBg = dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)";
  const cardBgOpen = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const cardBorder = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const cardBorderOpen = dark ? "rgba(176,141,87,0.15)" : "rgba(176,141,87,0.25)";
  const txt = dark ? "#e8e0d4" : "#2a2520";
  const txtSub = dark ? "rgba(232,224,212,0.55)" : "rgba(58,48,40,0.5)";
  const txtFaint = dark ? "rgba(232,224,212,0.35)" : "rgba(58,48,40,0.3)";
  const iconDim = dark ? "rgba(232,224,212,0.3)" : "rgba(58,48,40,0.25)";
  const heroBg = dark
    ? "linear-gradient(165deg,#2a2520 0%,#1a1714 60%,#151210 100%)"
    : "linear-gradient(165deg,#5c7a5e 0%,#3d5a40 50%,#2c4230 100%)";
  const heroGlow = dark
    ? "radial-gradient(ellipse 80% 50% at 50% 25%,rgba(176,141,87,0.06) 0%,transparent 70%)"
    : "radial-gradient(ellipse 80% 50% at 50% 25%,rgba(255,255,255,0.1) 0%,transparent 70%)";
  const wifiBg = dark ? "rgba(176,141,87,0.03)" : "rgba(176,141,87,0.05)";
  const wifiBorder = dark ? "rgba(176,141,87,0.1)" : "rgba(176,141,87,0.15)";
  const alertBg = dark ? "rgba(176,141,87,0.05)" : "rgba(176,141,87,0.07)";
  const alertBorder = dark ? "rgba(176,141,87,0.1)" : "rgba(176,141,87,0.15)";
  const emBg = dark ? "rgba(201,123,90,0.04)" : "rgba(201,123,90,0.06)";
  const emBorder = dark ? "rgba(201,123,90,0.08)" : "rgba(201,123,90,0.12)";

  const sections = [
    { id: "wifi", icon: "◐", title: t.wifi },
    { id: "checkin", icon: "⬡", title: t.checkin },
    { id: "shop", icon: "◈", title: t.shop, badge: true },
    { id: "home", icon: "△", title: t.home },
    { id: "rules", icon: "▣", title: t.rules },
    { id: "local", icon: "◎", title: t.explore },
    { id: "checkout", icon: "◇", title: t.checkoutTitle },
    { id: "emergency", icon: "✦", title: t.emergency },
  ];

  const typeLabel = (type) => {
    const map = { sightseeing: t.sightseeing || t.tourist, shopping: t.shopping, food: t.food, grocery: t.grocery, pharmacy: t.pharmacy };
    return (map[type] || type).toUpperCase();
  };

  return (
    <div style={{ minHeight: "100vh", background: pageBg, fontFamily: "'Outfit',sans-serif", color: txt, overflowX: "hidden", WebkitFontSmoothing: "antialiased", transition: "background 0.5s, color 0.5s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        html{scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
        body{scroll-behavior:smooth;overscroll-behavior:none}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        a:active,button:active{transform:scale(0.97)!important}
        input[type="checkbox"]{accent-color:#b08d57;width:18px;height:18px;cursor:pointer}
        .copy-btn{padding:6px 14px;font-size:11px;font-weight:700;font-family:'Outfit',sans-serif;color:#b08d57;background:transparent;border:1.5px solid rgba(176,141,87,0.35);border-radius:8px;cursor:pointer;transition:all 0.3s cubic-bezier(.22,1,.36,1);letter-spacing:0.8px}
        .copy-btn[data-copied="true"]{color:#fff;background:#b08d57;border-color:#b08d57}
        .copy-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(176,141,87,0.2)}
        .shop-add-btn{width:32px;height:32px;border-radius:9px;border:1.5px solid rgba(176,141,87,0.25);background:transparent;color:#b08d57;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;line-height:1;transition:all 0.25s cubic-bezier(.22,1,.36,1)}
        .shop-add-btn:hover{background:rgba(176,141,87,0.08);transform:scale(1.05)}
        .shop-qty-btn{width:28px;height:28px;border-radius:7px;border:1px solid rgba(176,141,87,0.2);background:transparent;color:#b08d57;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;transition:all 0.2s}
        .shop-qty-btn-fill{background:rgba(176,141,87,0.12)}
        .cart-bar{margin-top:6px;padding:18px;border-radius:16px;background:linear-gradient(145deg,#b08d57 0%,#8a6d3b 100%);box-shadow:0 8px 32px rgba(176,141,87,0.25);animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1)}
        .revolut-btn{display:flex;align-items:center;justify-content:center;padding:15px;border-radius:12px;background:#fff;color:#1a1a1a;font-size:15px;font-weight:800;text-decoration:none;font-family:'Outfit',sans-serif;transition:all 0.25s cubic-bezier(.22,1,.36,1);box-shadow:0 4px 12px rgba(0,0,0,0.15)}
        .revolut-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.25)}
        .lang-btn{padding:6px 12px;font-size:12px;font-weight:700;border-radius:8px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s cubic-bezier(.22,1,.36,1);border:1.5px solid transparent;letter-spacing:0.5px}
        .theme-toggle{width:40px;height:40px;border-radius:12px;border:1.5px solid rgba(176,141,87,0.2);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all 0.4s cubic-bezier(.22,1,.36,1)}
        .theme-toggle:hover{transform:rotate(15deg)}
        .section-card{transition:background 0.4s cubic-bezier(.22,1,.36,1),border 0.4s cubic-bezier(.22,1,.36,1),transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s cubic-bezier(.22,1,.36,1)}
        .section-card:hover{transform:translateY(-1px)}
        .quick-action{transition:all 0.25s cubic-bezier(.22,1,.36,1)}
        .quick-action:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.08)}
        .place-card{transition:all 0.25s cubic-bezier(.22,1,.36,1)}
        .place-card:hover{transform:translateY(-1px);border-color:rgba(176,141,87,0.3)!important;box-shadow:0 4px 12px rgba(0,0,0,0.06)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @media (prefers-reduced-motion:reduce){
          html,body{scroll-behavior:auto}
          *{animation-duration:0.01ms!important;transition-duration:0.01ms!important}
        }
      `}</style>

      {/* ── HERO ── */}
      <header style={{
        position: "relative", padding: "28px 20px 32px", textAlign: "center",
        background: heroBg, overflow: "hidden",
        opacity: loaded ? 1 : 0, transition: "opacity 1.2s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: heroGlow, pointerEvents: "none" }} />

        {/* Top bar: Lang + Theme */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {["sv", "en", "de"].map(l => (
              <button key={l} className="lang-btn" onClick={() => setLang(l)}
                style={{
                  color: lang === l ? "#fff" : "rgba(255,255,255,0.45)",
                  background: lang === l ? "rgba(176,141,87,0.35)" : "transparent",
                  borderColor: lang === l ? "rgba(176,141,87,0.5)" : "rgba(255,255,255,0.1)",
                }}>
                {l === "sv" ? "🇸🇪" : l === "en" ? "🇬🇧" : "🇩🇪"} {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={() => setDark(d => !d)}
            style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 3.5,
            color: dark ? "#b08d57" : "rgba(255,255,255,0.8)", marginBottom: 20,
            padding: "6px 16px", border: `1px solid ${dark ? "rgba(176,141,87,0.2)" : "rgba(255,255,255,0.25)"}`, borderRadius: 20,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "scale(0.85)",
            transition: "all 1s 0.3s cubic-bezier(.22,1,.36,1)",
          }}>{t.badge}</div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: 46, fontWeight: 600,
            color: "#fff", margin: "0 0 8px", letterSpacing: 1, lineHeight: 1.1,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
            transition: "all 1s 0.5s cubic-bezier(.22,1,.36,1)",
          }}>Spelmansgatan 18</h1>

          <p style={{
            fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0, letterSpacing: 2,
            opacity: loaded ? 1 : 0, transition: "all 1s 0.7s cubic-bezier(.22,1,.36,1)",
          }}>{t.tagline}</p>

          <div style={{
            height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)",
            margin: "24px auto", width: loaded ? 48 : 0, transition: "width 1s 0.9s cubic-bezier(.22,1,.36,1)",
          }} />

          <div style={{
            display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap",
            fontSize: 11, fontWeight: 600, letterSpacing: 2.5, color: "rgba(255,255,255,0.5)",
            opacity: loaded ? 1 : 0, transition: "all 0.8s 1.1s cubic-bezier(.22,1,.36,1)",
          }}>
            <span>{t.in} 15:00</span>
            <span style={{ color: accent }}>·</span>
            <span>{t.out} 10:00</span>
            <span style={{ color: accent }}>·</span>
            <span>{t.max} 5 {t.guests}</span>
          </div>
        </div>
      </header>

      {/* ── WEATHER + QUICK ACTIONS ── */}
      <div style={{ padding: "16px 16px 0", position: "relative", zIndex: 2, maxWidth: 560, margin: "0 auto" }}>
        <Reveal delay={0.1}>
          <WeatherWidget lang={lang} dark={dark} />
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {[
              { href: "tel:+46762811051", icon: "☏", label: t.call },
              { href: "https://maps.google.com/?q=Spelmansgatan+18+Malmö", icon: "⊹", label: t.map, tgt: "_blank" },
              { href: "tel:112", icon: "⚠", label: "112", em: true },
            ].map((a, i) => (
              <a key={i} href={a.href} target={a.tgt} rel="noreferrer" className="quick-action" style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "16px 4px", borderRadius: 14,
                background: a.em ? emBg : cardBg, border: `1px solid ${a.em ? emBorder : cardBorder}`,
                textDecoration: "none", color: txt,
              }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{a.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>{a.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── SECTIONS ── */}
      <main style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: 10, maxWidth: 560, margin: "0 auto" }}>
        {sections.map((sec, i) => (
          <Reveal key={sec.id} delay={0.06 * i}>
            <div className="section-card" style={{
              borderRadius: 16, overflow: "hidden",
              background: open === sec.id ? cardBgOpen : cardBg,
              border: `1px solid ${open === sec.id ? cardBorderOpen : cardBorder}`,
            }}>
              <button onClick={() => setOpen(o => o === sec.id ? null : sec.id)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "18px 20px", background: "none", border: "none",
                cursor: "pointer", color: txt, fontFamily: "'Outfit',sans-serif", textAlign: "left",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 17, color: open === sec.id ? accent : iconDim, transition: "color 0.4s" }}>{sec.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>{sec.title}</span>
                  {sec.badge && <span style={{ fontSize: 9, fontWeight: 700, color: accent, background: "rgba(176,141,87,0.1)", padding: "2px 8px", borderRadius: 5 }}>★</span>}
                </div>
                <span style={{ fontSize: 22, fontWeight: 300, color: "rgba(176,141,87,0.35)", transition: "transform 0.4s cubic-bezier(.22,1,.36,1)", transform: open === sec.id ? "rotate(45deg)" : "none" }}>+</span>
              </button>

              <div style={{ maxHeight: open === sec.id ? 5000 : 0, overflow: "hidden", transition: "max-height 0.6s cubic-bezier(.22,1,.36,1)" }}>
                <div style={{ padding: "0 20px 22px" }}>

                  {sec.id === "wifi" && (
                    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${wifiBorder}`, background: wifiBg }}>
                      {[{ l: t.network, v: "Family H" }, { l: t.password, v: "12345678" }].map((r, j) => (
                        <div key={j} style={{ padding: "14px 16px", borderTop: j ? `1px solid ${wifiBorder}` : "none", display: "flex", flexDirection: "column", gap: 8 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "rgba(176,141,87,0.55)" }}>{r.l}</span>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                            <code style={{ fontSize: 18, fontWeight: 700, color: txt, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.5 }}>{r.v}</code>
                            <CopyBtn text={r.v} lang={lang} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.id === "checkin" && (
                    <div>
                      <div style={{ display: "flex", gap: 14, padding: 18, background: alertBg, borderRadius: 12, border: `1px solid ${alertBorder}` }}>
                        <span style={{ fontSize: 26, flexShrink: 0 }}>🔐</span>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: txtSub }}>{KEY_INFO[lang]}</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                        {[{ l: t.checkInTime, v: "15:00", n: t.orLater }, { l: t.checkOutTime, v: "10:00", n: t.atLatest }].map((ti, j) => (
                          <div key={j} style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 12px",
                            background: cardBg, borderRadius: 12, border: `1px solid ${cardBorder}`,
                          }}>
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "rgba(176,141,87,0.5)" }}>{ti.l}</span>
                            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 600, color: txt, margin: "4px 0" }}>{ti.v}</span>
                            <span style={{ fontSize: 12, color: txtFaint }}>{ti.n}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sec.id === "shop" && <Shop lang={lang} dark={dark} />}

                  {sec.id === "home" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {(APPLIANCES[lang] || APPLIANCES.en).map((a, j) => (
                        <div key={j} style={{ padding: "14px 16px", borderRadius: 10, background: cardBg, border: `1px solid ${cardBorder}`, display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 20 }}>{a.icon}</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: txt }}>{a.label}</span>
                          </div>
                          <p style={{ margin: "6px 0 0 30px", fontSize: 13, color: txtSub, lineHeight: 1.6 }}>{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.id === "rules" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {(RULES[lang] || RULES.en).map((r, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <span style={{ color: accent, fontSize: 7, marginTop: 7, flexShrink: 0 }}>●</span>
                          <span style={{ fontSize: 14, color: txtSub, lineHeight: 1.6 }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.id === "local" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {(LOCAL[lang] || LOCAL.en).map((p, j) => {
                        const query = encodeURIComponent(`${p.name}, Malmö, Sweden`);
                        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=driving`;
                        return (
                          <a key={j} href={mapsUrl} target="_blank" rel="noreferrer" className="place-card" style={{
                            padding: "14px 16px", borderRadius: 10, background: cardBg, border: `1px solid ${cardBorder}`,
                            display: "flex", flexDirection: "column", gap: 4,
                            textDecoration: "none", color: "inherit", cursor: "pointer",
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: txt }}>{p.name}</span>
                              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: accent, background: "rgba(176,141,87,0.08)", padding: "3px 9px", borderRadius: 5, flexShrink: 0 }}>{typeLabel(p.type)}</span>
                            </div>
                            <span style={{ fontSize: 13, color: txtSub, lineHeight: 1.5 }}>{p.note}</span>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                              <span style={{ fontSize: 12, color: txtFaint }}>🚗 {p.dist}</span>
                              <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: 0.5 }}>{t.getDirections} →</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {sec.id === "checkout" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {(CHECKOUT[lang] || CHECKOUT.en).map((c, j) => (
                        <label key={j} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                          <input type="checkbox" />
                          <span style={{ fontSize: 14, color: txtSub, lineHeight: 1.5 }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {sec.id === "emergency" && (
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                        {[
                          { l: t.emergencyNum, v: "112", h: "tel:112" },
                          { l: t.healthAdvice, v: "1177", h: "tel:1177" },
                          { l: t.host, v: "+46 76 281 1051", h: "tel:+46762811051" },
                        ].map((e, j) => (
                          <div key={j} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "14px 16px", borderRadius: 10, background: emBg, border: `1px solid ${emBorder}`,
                          }}>
                            <span style={{ fontSize: 13, color: txtSub }}>{e.l}</span>
                            <a href={e.h} style={{ fontSize: 16, fontWeight: 800, color: "#c97b5a", textDecoration: "none", fontFamily: "'Outfit',sans-serif" }}>{e.v}</a>
                          </div>
                        ))}
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: txtFaint, lineHeight: 1.7, padding: "14px 16px", background: cardBg, borderRadius: 10, border: `1px solid ${cardBorder}` }}>
                        {t.safetyNote}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </main>

      {/* ── FOOTER ── */}
      <Reveal delay={0.2}>
        <footer style={{ textAlign: "center", padding: "16px 24px 56px", maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 28, height: 1, background: "linear-gradient(90deg,transparent,rgba(176,141,87,0.3),transparent)", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: txtSub, margin: "0 0 4px", fontStyle: "italic" }}>
            {t.footer}
          </p>
          <p style={{ fontSize: 14, color: txtFaint, margin: 0 }}>— Endrit</p>
        </footer>
      </Reveal>
    </div>
  );
}

