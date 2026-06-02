import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage, RotationTypes } from "pdf-lib";
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

  // 1. Split into paragraphs by newline to handle 0x000a correctly
  const paragraphs = text.split(/\r?\n/);
  const result: string[] = [];

  for (const para of paragraphs) {
    // 2. Split paragraph into words
    const words = para.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      if (!word) continue;

      // 3. Sanitize word: replace non-WinAnsi characters (like Ethiopic or special symbols) 
      // with "?" to prevent PDF generation crash when using Standard Fonts.
      const cleanWord = word.replace(/[^\x20-\x7E\xA0-\xFF]/g, "?");

      const testLine = currentLine ? `${currentLine} ${cleanWord}` : cleanWord;
      try {
        const width = font.widthOfTextAtSize(testLine, size);
        if (width <= maxW) {
          currentLine = testLine;
        } else {
          if (currentLine) result.push(currentLine);
          currentLine = cleanWord;
        }
      } catch {
        // Fallback if width calculation fails for any reason
        if (currentLine) result.push(currentLine);
        currentLine = cleanWord;
      }
    }
    if (currentLine) result.push(currentLine);
    // Add an empty line for paragraph breaks if there's more coming
    if (para === "" && result.length > 0) result.push(" ");
  }
  return result;
}

// ── Rounded rect helper ───────────────────────────────────────────────────────
function roundedRect(page: PDFPage, x: number, y: number, w: number, h: number, r: number, color: ReturnType<typeof rgb>) {
  page.drawRectangle({ x: x + r, y, width: w - 2 * r, height: h, color });
  page.drawRectangle({ x, y: y + r, width: w, height: h - 2 * r, color });
  page.drawCircle({ x: x + r, y: y + r, size: r, color });
  page.drawCircle({ x: x + w - r, y: y + r, size: r, color });
  page.drawCircle({ x: x + r, y: y + h - r, size: r, color });
  page.drawCircle({ x: x + w - r, y: y + h - r, size: r, color });
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
  const LABEL_SIZE = 8.5;
  const VALUE_SIZE = 11.5;
  const PADDING_TOP = 10;
  const PADDING_BOTTOM = 12;
  const LINE_SPACING = 3.5;
  const GAP_LABEL_VALUE = 5;

  const lines = wrapText(value || "-", valueFont, VALUE_SIZE, w);
  const fieldContentH = LABEL_SIZE + GAP_LABEL_VALUE + (lines.length * (VALUE_SIZE + LINE_SPACING));
  const totalFieldH = PADDING_TOP + fieldContentH + PADDING_BOTTOM;

  // Draw Label
  page.drawText(label.toUpperCase(), { 
    x, 
    y: y - PADDING_TOP - LABEL_SIZE, 
    size: LABEL_SIZE, 
    font: labelFont, 
    color: GOLD 
  });

  // Draw Value Lines
  let ty = y - PADDING_TOP - LABEL_SIZE - GAP_LABEL_VALUE - VALUE_SIZE;
  for (const line of lines) {
    page.drawText(line, { 
      x, 
      y: ty, 
      size: VALUE_SIZE, 
      font: valueFont, 
      color: DARK 
    });
    ty -= (VALUE_SIZE + LINE_SPACING);
  }
  
  // Clean, thin divider with a bit of breathing room at the bottom
  page.drawRectangle({ 
    x, 
    y: y - totalFieldH, 
    width: w, 
    height: 0.8, 
    color: SMOKE 
  });
  
  return totalFieldH + 8; // Extra margin after the field
}

// ── Gradient helper ──────────────────────────────────────────────────────────
function drawGradientBackground(page: PDFPage, width: number, height: number) {
  // We'll create a very subtle gradient from a soft CREAM to pure WHITE
  // By drawing thin rectangles across the page
  const steps = 100;
  const chunkH = height / steps;
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / steps;
    // Interpolate between CREAM (0.945, 0.894, 0.788) and WHITE (1,1,1)
    const r = 0.945 + (1 - 0.945) * ratio;
    const g = 0.894 + (1 - 0.894) * ratio;
    const b = 0.788 + (1 - 0.788) * ratio;
    
    page.drawRectangle({
      x: 0,
      y: height - (i + 1) * chunkH,
      width,
      height: chunkH + 1, // +1 to prevent thin white lines between chunks
      color: rgb(r, g, b),
    });
  }
}

// ── Main PDF builder ──────────────────────────────────────────────────────────
async function buildPDF(data: {
  name: string; email: string; phone: string; subject: string;
  message: string; country: string; address: string; submittedAt: string;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  // Fonts
  const fontTitle = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontBold  = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg   = await doc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const MARGIN = 55;
  
  // ── Background Gradient ──
  drawGradientBackground(page, width, height);
  
  // ── Left Accent Bar with its own Gold-to-Dark Gradient-ish look ──
  // (Using a solid bold Gold for the spine)
  page.drawRectangle({ x: 0, y: 0, width: 8, height, color: GOLD });
  
  // ── Subtle watermark in the background ──
  page.drawText("ADVENTURE IN ABYSSINIE", {
    x: width / 2 - 150,
    y: height / 2,
    size: 40,
    font: fontTitle,
    color: rgb(0.92, 0.88, 0.82), // Very faint
    rotate: { type: RotationTypes.Degrees, angle: 45 },
    opacity: 0.2,
  });

  // ── Header ──
  const HEADER_Y = height - 60;
  
  // Logo
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.jpg");
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await doc.embedJpg(logoBytes);
    const LOGO_W = 75;
    const LOGO_H = 75;
    page.drawImage(logoImage, { x: MARGIN, y: HEADER_Y - 55, width: LOGO_W, height: LOGO_H });
  } catch {
    page.drawText("*", { x: MARGIN, y: HEADER_Y - 30, size: 35, font: fontTitle, color: GOLD });
  }

  // Brand Name
  page.drawText("ADVENTURE IN ABYSSINIE", {
    x: MARGIN + 90,
    y: HEADER_Y - 15,
    size: 20,
    font: fontTitle,
    color: DARK,
  });
  page.drawText("CURATED ETHIOPIAN EXPEDITIONS", {
    x: MARGIN + 90,
    y: HEADER_Y - 35,
    size: 8,
    font: fontReg,
    color: GOLD,
  });

  // Reference Badge
  const refNum = `AA-${Date.now().toString(36).toUpperCase()}`;
  page.drawText("INQUIRY RECORD", {
    x: width - MARGIN - 90,
    y: HEADER_Y - 15,
    size: 8.5,
    font: fontBold,
    color: GOLD,
  });
  page.drawText(refNum, {
    x: width - MARGIN - 90,
    y: HEADER_Y - 32,
    size: 11,
    font: fontReg,
    color: DARK,
  });

  // Top Divider
  page.drawRectangle({ x: MARGIN, y: height - 155, width: width - MARGIN*2, height: 1.2, color: DARK });
  
  let curY = height - 175;

  // Section Heading Helper
  const sectionHead = (title: string) => {
    curY -= 25;
    page.drawText(title, { x: MARGIN, y: curY, size: 11, font: fontTitle, color: GOLD });
    curY -= 15;
  };

  const COL_W = (width - MARGIN * 2 - 40) / 2;

  // ── Client Info ──
  sectionHead("CLIENT PROFILE");
  
  const h1 = Math.max(
    drawField(page, "Full Name", data.name, MARGIN, curY, COL_W, fontBold, fontReg),
    drawField(page, "Email Address", data.email, MARGIN + COL_W + 40, curY, COL_W, fontBold, fontReg)
  );
  curY -= h1;

  const h2 = Math.max(
    drawField(page, "Telephone", data.phone || "Not Provided", MARGIN, curY, COL_W, fontBold, fontReg),
    drawField(page, "Origin", data.country, MARGIN + COL_W + 40, curY, COL_W, fontBold, fontReg)
  );
  curY -= h2;

  // ── Inquiry Details ──
  sectionHead("INQUIRY DETAILS");
  
  const h3 = drawField(page, "Subject / Interest", data.subject || "General Inquiry", MARGIN, curY, width - MARGIN*2, fontBold, fontReg);
  curY -= h3;

  // ── Message ──
  sectionHead("CORRESPONDENCE");
  
  const msgLines = wrapText(data.message, fontReg, 11, width - MARGIN * 2 - 20);
  
  // Decorative Quote
  page.drawText("“", { x: MARGIN - 5, y: curY + 8, size: 40, font: fontTitle, color: SMOKE });
  
  let msgY = curY;
  for (const line of msgLines) {
    page.drawText(line, { x: MARGIN + 12, y: msgY, size: 11, font: fontReg, color: DARK });
    msgY -= 17;
  }
  
  // ── Footer ──
  const FOOT_Y = 60;
  page.drawRectangle({ x: MARGIN, y: FOOT_Y + 10, width: width - MARGIN*2, height: 0.5, color: GOLD });
  
  const footText = "hello@aventure-abyssinie.com  ·  +251 91 160 3027  ·  Addis Ababa, Ethiopia";
  const footW = fontReg.widthOfTextAtSize(footText, 7);
  page.drawText(footText, {
    x: (width - footW) / 2,
    y: FOOT_Y - 10,
    size: 7,
    font: fontReg,
    color: GOLD,
  });

  page.drawText(`Submitted on ${data.submittedAt}`, {
    x: MARGIN,
    y: FOOT_Y - 25,
    size: 6,
    font: fontItalic,
    color: DARK,
  });

  const bytes = await doc.save();
  return bytes;
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, email, phone = "", subject = "", message, country = "Unknown", address = "Unknown" } = body;

    // Server-side location detection (robust fallback)
    const geoCity = request.headers.get("x-vercel-ip-city");
    const geoRegion = request.headers.get("x-vercel-ip-country-region");
    const geoCountryCode = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");

    if (country === "Unknown" || !country) {
      if (geoCountryCode) country = geoCountryCode;
    }

    if (address === "Unknown" || !address) {
      const parts = [geoCity, geoRegion, geoCountryCode].filter(Boolean);
      if (parts.length > 0) address = parts.join(", ");
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build timestamp
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const fileSafeName = `${name.replace(/\s+/g, "_")}_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;

    // Generate PDF
    const pdfBytes = await buildPDF({ name, email, phone, subject, message, country, address, submittedAt: dateTimeStr });

    const escapeHtml = (str: string) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCountry = escapeHtml(country);
    const safeAddress = escapeHtml(address);

    const caption = `📬 <b>New Contact Inquiry</b>\n\n👤 <b>${safeName}</b>\n📧 ${safeEmail}${phone ? `\n📞 ${safePhone}` : ""}\n\n🌍 <b>${safeCountry}</b>\n📍 ${safeAddress}\n\n🕐 ${dateTimeStr}`;

    // Send to all chat IDs (loop)
    const results = await Promise.allSettled(
      CHAT_IDS.map(async (chatId) => {
        const form = new FormData();
        form.append("chat_id", chatId);
        form.append(
          "document",
          new Blob([pdfBytes as BlobPart], { type: "application/pdf" }),
          `${fileSafeName}.pdf`
        );
        form.append("caption", caption);
        form.append("parse_mode", "HTML");

        const res = await fetch(`${TELEGRAM_API}/sendDocument`, { method: "POST", body: form });
        const json = await res.json();
        if (!json.ok) throw new Error(`chat_id ${chatId}: ${JSON.stringify(json)}`);
        return json;
      })
    );

    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === "rejected")
      .map((r) => r.reason?.message ?? String(r.reason));

    if (errors.length === CHAT_IDS.length) {
      return NextResponse.json({ error: "Failed to send to Telegram", details: errors }, { status: 502 });
    }

    return NextResponse.json({ success: true, sent: CHAT_IDS.length - errors.length, errors: errors.length ? errors : undefined });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/contact]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
