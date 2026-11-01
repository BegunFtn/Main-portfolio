const minutes = value => Number.isFinite(value) && value >= 0 ? value : null;

function normalizeGame(game) {
  return {
    appId: game.appid,
    name: String(game.name || `Steam app ${game.appid}`),
    minutes: minutes(game.playtime_forever),
    recentMinutes: minutes(game.playtime_2weeks),
    image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
    url: `https://store.steampowered.com/app/${game.appid}/`,
  };
}

export async function readSteamProfile({ key, steamId, fetchImpl = fetch }) {
  if (!key || !/^\d{17}$/.test(steamId)) throw new Error("Invalid Steam configuration");
  async function request(method, params) {
    const url = new URL(`https://api.steampowered.com/${method}/`);
    url.searchParams.set("key", key);
    if (method.startsWith("IPlayerService/")) {
      url.searchParams.set("input_json", JSON.stringify(params));
    } else {
      for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));
    }
    const result = await fetchImpl(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    if (!result.ok) throw new Error("Steam service unavailable");
    return (await result.json()).response;
  }
  const [summary, ownedResult, recentResult] = await Promise.all([
    request("ISteamUser/GetPlayerSummaries/v2", { steamids: steamId }),
    request("IPlayerService/GetOwnedGames/v1", { steamid: steamId, include_appinfo: true, include_played_free_games: true }).then(data => ({ data, available: true }), () => ({ data: null, available: false })),
    request("IPlayerService/GetRecentlyPlayedGames/v1", { steamid: steamId, count: 0 }).then(data => ({ data, available: true }), () => ({ data: null, available: false })),
  ]);
  const player = summary?.players?.find(item => item.steamid === steamId);
  if (!player) throw new Error("Steam profile unavailable");
  const library = ownedResult.data;
  const libraryVisible = ownedResult.available && (Array.isArray(library?.games) || library?.game_count === 0);
  const games = (Array.isArray(library?.games) ? library.games : [])
    .filter(game => Number.isInteger(game.appid) && game.appid > 0).map(normalizeGame);
  const recent = recentResult.data;
  const recentVisible = recentResult.available && (Array.isArray(recent?.games) || recent?.total_count === 0);
  const recentGames = (Array.isArray(recent?.games) ? recent.games : [])
    .filter(game => Number.isInteger(game.appid) && game.appid > 0).map(normalizeGame);
  const totalMinutes = libraryVisible && games.every(game => game.minutes !== null)
    ? games.reduce((sum, game) => sum + game.minutes, 0) : null;
  const recentMinutes = recentVisible && recentGames.every(game => game.recentMinutes !== null)
    ? recentGames.reduce((sum, game) => sum + game.recentMinutes, 0) : null;
  // Explicit public fields only; authentication details and personal profile fields stay on the server.
  return {
    configured: true,
    player: {
      name: player.personaname || "Steam player",
      avatar: /^https:\/\//.test(player.avatarfull || "") ? player.avatarfull : null,
      profileUrl: `https://steamcommunity.com/profiles/${steamId}/`,
      status: player.gameextrainfo ? "In game" : player.personastate > 0 ? "Online" : "Offline",
      currentGame: player.gameextrainfo || null,
    },
    libraryVisible,
    recentVisible,
    gameCount: libraryVisible ? (Number.isInteger(library?.game_count) ? library.game_count : games.length) : null,
    totalMinutes,
    recentMinutes,
    games: games.sort((a, b) => (b.minutes ?? -1) - (a.minutes ?? -1)).slice(0, 24),
    recentGames: recentGames.slice(0, 6),
    updatedAt: new Date().toISOString(),
  };
}
