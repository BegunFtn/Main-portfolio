import { STEAM_ID, STEAM_PROFILE_URL } from "../../lib/gaming-config";
import { readSteamProfile } from "../../lib/steam-server.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.STEAM_API_KEY?.trim();
  if (!key) return Response.json({ configured: false, profileUrl: STEAM_PROFILE_URL });
  try {
    const data = await readSteamProfile({ key, steamId: STEAM_ID });
    return Response.json(data, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } });
  } catch {
    return Response.json({ configured: true, error: "Steam is temporarily unavailable", profileUrl: STEAM_PROFILE_URL }, { status: 503 });
  }
}
