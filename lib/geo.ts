export interface GeoInfo {
  country: string;
  address: string;
}

export async function getGeoInfo(): Promise<GeoInfo> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("geo lookup failed");
    const data = await res.json();
    return {
      country: data.country_name || "Unknown",
      address: [data.city, data.region, data.country_name].filter(Boolean).join(", ") || "Unknown",
    };
  } catch {
    return { country: "Unknown", address: "Unknown" };
  }
}
