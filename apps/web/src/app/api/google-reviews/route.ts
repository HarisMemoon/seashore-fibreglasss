import { NextResponse } from "next/server";

type GoogleReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
};

type GooglePlaceResult = {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
};

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim();
  if (configured) return configured;

  const query = process.env.GOOGLE_PLACE_QUERY?.trim() || "Seashore Fiberglass LLC Ocean City NJ";
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 900 } });
  if (!res.ok) return null;

  const json = (await res.json()) as { candidates?: Array<{ place_id?: string }> };
  return json.candidates?.[0]?.place_id ?? null;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim() ?? process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Missing GOOGLE_MAPS_API_KEY (or GOOGLE_PLACES_API_KEY)" },
      { status: 500 }
    );
  }

  const placeId = await resolvePlaceId(apiKey);
  if (!placeId) {
    return NextResponse.json({ ok: false, error: "Could not resolve Google place id" }, { status: 502 });
  }

  const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  detailsUrl.searchParams.set("place_id", placeId);
  detailsUrl.searchParams.set("fields", "rating,user_ratings_total,reviews");
  detailsUrl.searchParams.set("reviews_sort", "newest");
  detailsUrl.searchParams.set("key", apiKey);

  const res = await fetch(detailsUrl.toString(), { next: { revalidate: 900 } });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Google details fetch failed" }, { status: 502 });
  }

  const json = (await res.json()) as { result?: GooglePlaceResult };
  const result = json.result;

  const reviews = (result?.reviews ?? [])
    .filter((r) => (r.text ?? "").trim().length > 0)
    .slice(0, 6)
    .map((r) => ({
      name: (r.author_name ?? "Google User").trim(),
      quote: (r.text ?? "").trim(),
      city: (r.relative_time_description ?? "Google Review").trim(),
      stars: Math.max(1, Math.min(5, Math.round(r.rating ?? 5))),
    }));

  return NextResponse.json({
    ok: true,
    rating: result?.rating ?? 5,
    total: result?.user_ratings_total ?? reviews.length,
    reviews,
  });
}