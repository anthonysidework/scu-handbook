export interface ScrapedItem {
  name: string;
  description: string;
  dietaryTags: string[];
  dayPart: "breakfast" | "lunch" | "dinner" | "all-day";
}

export interface ScrapedStation {
  name: string;
  items: ScrapedItem[];
}

export interface ScrapedDay {
  dayIndex: number; // 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri
  dayName: string;
  stations: ScrapedStation[];
}

export interface ScrapedMenu {
  hallName: string;
  weekOf: string;
  hours: { label: string; time: string }[];
  days: ScrapedDay[];
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseDayPart(chunk: string): ScrapedItem["dayPart"] {
  const m = chunk.match(/\[([A-Za-z]+)\]/);
  if (!m) return "all-day";
  const abbr = m[1].toLowerCase();
  if (abbr === "b") return "breakfast";
  if (abbr === "lu" || abbr === "l") return "lunch";
  if (abbr === "di" || abbr === "d") return "dinner";
  return "all-day";
}

function parseDietaryTags(chunk: string): string[] {
  const tags: string[] = [];
  const titles = [...chunk.matchAll(/title="([^"]+)"/g)].map((m) => m[1]);
  for (const t of titles) {
    if (t.startsWith("Vegan:")) { tags.push("vegan"); continue; }
    if (t.startsWith("Vegetarian:")) { tags.push("vegetarian"); continue; }
    if (t.includes("Gluten")) tags.push("gluten-free");
  }
  return [...new Set(tags)];
}

function parseItemsFromCell(cellHtml: string): ScrapedItem[] {
  const items: ScrapedItem[] = [];
  const chunks = cellHtml.split(/<div class="menu-item-description/);
  for (const chunk of chunks.slice(1)) {
    const name = chunk.match(/<span class="weelydesc">([^<]+)<\/span>/)?.[1]?.trim();
    if (!name) continue;
    const description = chunk.match(/<span class="collapsed">([^<]+)<\/span>/)?.[1]?.trim() ?? "";
    items.push({
      name,
      description,
      dietaryTags: parseDietaryTags(chunk),
      dayPart: parseDayPart(chunk),
    });
  }
  return items;
}

export async function scrapeMenu(url: string): Promise<ScrapedMenu> {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SCUHandbook/1.0)" },
  });
  const html = await res.text();

  // Hall name
  const hallName = html.match(/<h1>([^<]+)<\/h1>/)?.[1]?.trim() ?? "";

  // Week date + hours
  const weekOf =
    [...html.matchAll(/<span class="cafeHoursDetails">([^<]+)<\/span>/g)]
      .map((m) => m[1].trim())
      .find((t) => t.startsWith("Week of"))
      ?.replace("Week of ", "") ?? "";

  const hours: { label: string; time: string }[] = [];
  for (const m of html.matchAll(/<span class="cafeHoursDetails">([^<]+)<\/span>/g)) {
    const text = m[1].trim();
    if (text.startsWith("Week of")) continue;
    const colon = text.indexOf(":");
    if (colon > 0) {
      hours.push({ label: text.slice(0, colon).trim(), time: text.slice(colon + 1).trim() });
    }
  }

  // Build stationId → station name map by walking HTML in order
  type El = { pos: number; kind: "sn"; name: string } | { pos: number; kind: "cell"; id: string };
  const elements: El[] = [];
  for (const m of html.matchAll(/class="stationname">([^<]+)</g)) {
    elements.push({ pos: m.index!, kind: "sn", name: m[1].trim() });
  }
  for (const m of html.matchAll(/id="td-(\d+)-\d+"/g)) {
    elements.push({ pos: m.index!, kind: "cell", id: m[1] });
  }
  elements.sort((a, b) => a.pos - b.pos);

  const stationIdToName: Record<string, string> = {};
  let curStation = "";
  for (const el of elements) {
    if (el.kind === "sn") { curStation = el.name; }
    else if (!(el.id in stationIdToName)) { stationIdToName[el.id] = curStation; }
  }

  // Find all cells with their positions
  interface CellRef { stationId: string; dayIndex: number; start: number; end: number }
  const cells: CellRef[] = [];
  for (const m of html.matchAll(/id="td-(\d+)-(\d+)"/g)) {
    cells.push({ stationId: m[1], dayIndex: parseInt(m[2]), start: m.index!, end: 0 });
  }
  for (let i = 0; i < cells.length - 1; i++) cells[i].end = cells[i + 1].start;
  if (cells.length) cells[cells.length - 1].end = html.length;

  // Build day → station → items map
  const dayMap = new Map<number, Map<string, ScrapedItem[]>>();
  for (const cell of cells) {
    const { stationId, dayIndex } = cell;
    if (dayIndex === 0 || dayIndex === 6) continue; // skip weekends
    const stationName = stationIdToName[stationId];
    if (!stationName) continue;
    const cellHtml = html.slice(cell.start, cell.end);
    if (cellHtml.includes("no-item")) continue;
    const items = parseItemsFromCell(cellHtml);
    if (!items.length) continue;

    if (!dayMap.has(dayIndex)) dayMap.set(dayIndex, new Map());
    const stMap = dayMap.get(dayIndex)!;
    if (!stMap.has(stationName)) stMap.set(stationName, []);
    stMap.get(stationName)!.push(...items);
  }

  // Build final days array (Mon–Fri only)
  const days: ScrapedDay[] = [];
  for (const dayIndex of [1, 2, 3, 4, 5]) {
    const stMap = dayMap.get(dayIndex);
    if (!stMap) continue;
    const stations: ScrapedStation[] = [];
    for (const [name, items] of stMap) stations.push({ name, items });
    days.push({ dayIndex, dayName: DAY_NAMES[dayIndex], stations });
  }

  return { hallName, weekOf, hours, days };
}

/** Returns the best day to show by default (today if data exists, else Monday). */
export function getDefaultDay(days: ScrapedDay[]): number {
  const today = new Date().getDay(); // 0=Sun … 6=Sat
  if (days.find((d) => d.dayIndex === today)) return today;
  return days[0]?.dayIndex ?? 1;
}
