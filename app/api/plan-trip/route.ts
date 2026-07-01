import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from "pdf-lib";
import fs from "fs";
import path from "path";

// ── Telegram config ────────────────────────────────────────────────────────────
const TELEGRAM_BOT_TOKEN = "8614999280:AAF-SmDpYfKX_llUK49Tp2nd50wauPkWKVg";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const CHAT_IDS = ["336726775", "798315948"];

// ── Luxury colour palette ──────────────────────────────────────────────────────
const GOLD = rgb(0.780, 0.639, 0.302); // #C7A34D
const DARK = rgb(0.137, 0.176, 0.200); // #232D33
const CREAM = rgb(0.945, 0.894, 0.788); // #F1E4C9
const WHITE = rgb(1, 1, 1);
const SMOKE = rgb(0.965, 0.957, 0.945);

// ── Text-wrap helper ──────────────────────────────────────────────────────────
function wrapText(text: string, font: PDFFont, size: number, maxW: number): string[] {
  if (!text) return [];
  const paragraphs = text.split(/\r?\n/);
  const result: string[] = [];
  for (const para of paragraphs) {
    const words = para.split(/\s+/);
    let currentLine = "";
    for (const word of words) {
      if (!word) continue;
      const cleanWord = word.replace(/[^\x20-\x7E\xA0-\xFF]/g, "?");
      const testLine = currentLine ? `${currentLine} ${cleanWord}` : cleanWord;
      
      let isOverWidth = false;
      try {
        const width = font.widthOfTextAtSize(testLine, size);
        if (width > maxW) isOverWidth = true;
      } catch {
        // Fallback: character count estimate (approx 0.5 of size per char)
        if (testLine.length * (size * 0.55) > maxW) isOverWidth = true;
      }

      if (isOverWidth) {
        if (currentLine) result.push(currentLine);
        currentLine = cleanWord;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) result.push(currentLine);
    if (para === "" && result.length > 0) result.push(" ");
  }
  return result;
}

// ── Field card helper ─────────────────────────────────────────────────────────
function drawField(
  page: PDFPage,
  label: string,
  value: string,
  x: number, y: number, w: number,
  labelFont: PDFFont,
  valueFont: PDFFont
): number {
  const LABEL_SIZE = 8;
  const VALUE_SIZE = 11;
  const PADDING_TOP = 8;
  const PADDING_BOTTOM = 10;
  const GAP_LABEL_VALUE = 4;

  const lines = wrapText(value || "-", valueFont, VALUE_SIZE, w);
  const totalFieldH = PADDING_TOP + LABEL_SIZE + GAP_LABEL_VALUE + (lines.length * (VALUE_SIZE + 3)) + PADDING_BOTTOM;

  page.drawText(label.toUpperCase(), { 
    x, 
    y: y - PADDING_TOP - LABEL_SIZE, 
    size: LABEL_SIZE, 
    font: labelFont, 
    color: GOLD 
  });

  let ty = y - PADDING_TOP - LABEL_SIZE - GAP_LABEL_VALUE - VALUE_SIZE;
  for (const line of lines) {
    page.drawText(line, { x, y: ty, size: VALUE_SIZE, font: valueFont, color: DARK });
    ty -= (VALUE_SIZE + 3);
  }
  
  page.drawRectangle({ x, y: y - totalFieldH + 2, width: w, height: 0.5, color: SMOKE });
  return totalFieldH;
}

// ── Decorative Pattern Helper ────────────────────────────────────────────────
function drawPattern(page: PDFPage, width: number, height: number) {
  // Add a very subtle geometric pattern in the background
  const SIZE = 40;
  for (let x = 0; x < width; x += SIZE) {
    for (let y = 0; y < height; y += SIZE) {
      if ((x + y) % (SIZE * 2) === 0) {
        page.drawCircle({
          x, y, size: 0.5,
          color: GOLD,
          opacity: 0.15
        });
      }
    }
  }
}

// ── Main PDF builder ──────────────────────────────────────────────────────────
async function buildPDF(data: {
  name: string; email: string; travelers: string; destinations: string[];
  selectedType: string; message: string; country: string; address: string; submittedAt: string;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const fontTitle = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontBold  = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg   = await doc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const MARGIN = 60;
  
  // ── Background & Patterns ──
  page.drawRectangle({ x: 0, y: 0, width, height, color: WHITE });
  drawPattern(page, width, height);
  
  // ── High-Contrast DARK Header ──
  const HEADER_H = 180;
  page.drawRectangle({ x: 0, y: height - HEADER_H, width, height: HEADER_H, color: DARK });
  
  // Decorative Gold Line in Header
  page.drawRectangle({ x: MARGIN, y: height - 50, width: width - MARGIN*2, height: 0.5, color: GOLD, opacity: 0.3 });

  // ── Left Accent Column ──
  page.drawRectangle({ x: 0, y: 0, width: 12, height, color: GOLD });

  // ── Header Content ──
  const HEADER_Y = height - 70;
  
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.webp");
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await doc.embedJpg(logoBytes);
    page.drawImage(logoImage, { x: MARGIN, y: HEADER_Y - 75, width: 80, height: 80 });
  } catch {
    page.drawText("*", { x: MARGIN, y: HEADER_Y - 40, size: 50, font: fontTitle, color: GOLD });
  }

  page.drawText("ADVENTURE IN ABYSSINIE", {
    x: MARGIN + 100,
    y: HEADER_Y - 20,
    size: 24,
    font: fontTitle,
    color: CREAM,
  });
  
  page.drawText("LUXURY EXPEDITION PLANNERS", {
    x: MARGIN + 100,
    y: HEADER_Y - 42,
    size: 8,
    font: fontReg,
    color: GOLD,
  });

  // Header Title
  const titleText = "TRAVELER REQUEST FORM";
  const titleW = fontTitle.widthOfTextAtSize(titleText, 14);
  page.drawText(titleText, { x: width - MARGIN - titleW, y: HEADER_Y - 30, size: 14, font: fontTitle, color: WHITE });

  let curY = height - HEADER_H - 50;

  const sectionHead = (title: string) => {
    curY -= 10;
    // Section Icon
    page.drawText("*", { x: MARGIN - 25, y: curY, size: 10, font: fontTitle, color: GOLD });
    page.drawText(title, { x: MARGIN, y: curY, size: 13, font: fontTitle, color: DARK });
    page.drawRectangle({ x: MARGIN, y: curY - 6, width: 40, height: 1.5, color: GOLD });
    curY -= 30;
  };

  const COL_W = (width - MARGIN * 2 - 40) / 2;

  // ── Section 1 ──
  sectionHead("PROPOSED TRAVELER");
  const h1 = Math.max(
    drawField(page, "Legal Name", data.name, MARGIN, curY, COL_W, fontBold, fontBold),
    drawField(page, "Email Correspondence", data.email, MARGIN + COL_W + 40, curY, COL_W, fontBold, fontReg)
  );
  curY -= h1 + 10;

  // ── Section 2 ──
  sectionHead("EXPEDITION PARAMETERS");
  const specBoxH = 100;
  // Soft background for specs
  page.drawRectangle({ x: MARGIN - 10, y: curY - specBoxH + 10, width: width - MARGIN*2 + 20, height: specBoxH, color: SMOKE, opacity: 0.5 });
  
  const specY = curY;
  drawField(page, "Group Size", `${data.travelers} Guests`, MARGIN, specY, COL_W, fontBold, fontBold);
  drawField(page, "Experience Type", data.selectedType || "Curated Discovery", MARGIN + COL_W + 40, specY, COL_W, fontBold, fontBold);
  curY -= 60;

  const destStr = data.destinations.join("  |  ") || "Regional Exploration";
  const h3 = drawField(page, "Geographic Interests", destStr, MARGIN, curY, width - MARGIN*2, fontBold, fontItalic);
  curY -= h3 + 20;

  // ── Section 3 ──
  sectionHead("ADDITIONAL SPECIFICATIONS");
  const msgLines = wrapText(data.message || "No bespoke requirements provided.", fontReg, 11, width - MARGIN * 2);
  let msgY = curY;
  for (const line of msgLines) {
    page.drawText(line, { x: MARGIN, y: msgY, size: 11, font: fontReg, color: DARK });
    msgY -= 18;
  }
  
  // Footer
  const FOOT_Y = 60;
  page.drawRectangle({ x: 0, y: 0, width, height: FOOT_Y, color: DARK });
  
  const footText = "ADVENTURE IN ABYSSINIE  |  CONFIDENTIAL PROPOSAL  |  (c) 2024";
  const footW = fontBold.widthOfTextAtSize(footText, 7);
  page.drawText(footText, {
    x: (width - footW) / 2,
    y: 25,
    size: 7,
    font: fontBold,
    color: GOLD,
  });

  const bytes = await doc.save();
  return bytes as Uint8Array;
}

export async function POST(request: NextRequest) {
  console.log("[/api/plan-trip] Request received");
  try {
    const body = await request.json();
    console.log("[/api/plan-trip] Body parsed:", JSON.stringify(body).substring(0, 100) + "...");
    
    let { name, email, travelers, selectedDestinations = [], selectedType = "", message = "", country = "Unknown", address = "Unknown" } = body;

    const geoCity = request.headers.get("x-vercel-ip-city");
    const geoRegion = request.headers.get("x-vercel-ip-country-region");
    const geoCountryCode = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");
    
    if (country === "Unknown" || !country) { if (geoCountryCode) country = geoCountryCode; }
    if (address === "Unknown" || !address) {
      const parts = [geoCity, geoRegion, geoCountryCode].filter(Boolean);
      if (parts.length > 0) address = parts.join(", ");
    }

    if (!name || !email) { 
      console.error("[/api/plan-trip] Validation failed: Missing name or email");
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 }); 
    }

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const fileSafeName = `TripPlan_${name.replace(/\s+/g, "_")}_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

    // Generate PDF
    console.log("[/api/plan-trip] Starting PDF generation...");
    let pdfBytes: Uint8Array;
    try {
      pdfBytes = await buildPDF({ 
        name, email, travelers: String(travelers), destinations: selectedDestinations, 
        selectedType, message, country, address, submittedAt: dateTimeStr 
      });
      console.log("[/api/plan-trip] PDF generated successfully, size:", pdfBytes.length);
    } catch (pdfErr) {
      console.error("[/api/plan-trip] PDF Generation Error:", pdfErr);
      return NextResponse.json({ error: "Failed to generate proposal PDF. Please try again." }, { status: 500 });
    }

    const escapeHtml = (str: string) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));
    const safeName = escapeHtml(name);
    const safeAddress = escapeHtml(address);
    const safeType = escapeHtml(selectedType || "Standard");
    const safeEmail = escapeHtml(email);
    const safeTravelers = escapeHtml(String(travelers));

    const caption = `✨ <b>New Bespoke Trip Request</b>\n\n👤 <b>${safeName}</b>\n📧 ${safeEmail}\n👥 <b>Travelers:</b> ${safeTravelers}\n🌍 <b>Style:</b> ${safeType}\n\n📍 <b>From:</b> ${safeAddress}\n🕐 ${dateTimeStr}`;

    console.log("[/api/plan-trip] Sending to Telegram...");
    const results = await Promise.allSettled(
      CHAT_IDS.map(async (chatId) => {
        const form = new FormData();
        form.append("chat_id", chatId);
        
        const fileBlob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
        form.append("document", fileBlob, `${fileSafeName}.pdf`);
        
        form.append("caption", caption);
        form.append("parse_mode", "HTML");

        const res = await fetch(`${TELEGRAM_API}/sendDocument`, {
          method: "POST",
          body: form
        });

        const json = await res.json();
        if (!json.ok) {
          console.error(`Telegram Error (${chatId}):`, json);
          throw new Error(json.description || "Telegram API failed");
        }
        return json;
      })
    );

    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === "rejected")
      .map((r) => r.reason?.message ?? String(r.reason));

    if (errors.length === CHAT_IDS.length) {
      console.error("[/api/plan-trip] All Telegram deliveries failed:", errors);
      return NextResponse.json({ error: "Telegram delivery failed", details: errors }, { status: 502 });
    }

    console.log("[/api/plan-trip] Success! Sent to", CHAT_IDS.length - errors.length, "chats");
    return NextResponse.json({ success: true, sent: CHAT_IDS.length - errors.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/plan-trip] Global Catch:", msg);
    return NextResponse.json({ error: "An unexpected error occurred: " + msg }, { status: 500 });
  }
}
