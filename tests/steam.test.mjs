import test from "node:test";
import assert from "node:assert/strict";
import { readSteamProfile } from "../app/lib/steam-server.mjs";

const steamId = "76561199858733261";
const key = "test-only-key-not-a-real-secret";
const player = { steamid: steamId, personaname: "Test player", realname: "Private field", avatarfull: "https://example.com/avatar.png", personastate: 1 };
function mockFetch({ owned = {}, recent = {}, profile = { players: [player] }, fail = "" } = {}) {
  return async url => {
    assert.equal(url.hostname, "api.steampowered.com");
    assert.equal(url.searchParams.get("key"), key);
    if (url.pathname.startsWith("/IPlayerService/")) {
      const params = JSON.parse(url.searchParams.get("input_json"));
      assert.equal(params.steamid, steamId);
      if (url.pathname.includes("GetRecentlyPlayedGames")) assert.equal(params.count, 0);
    }
    if (url.pathname.includes(fail) && fail) return { ok: false };
    const response = url.pathname.includes("GetPlayerSummaries") ? profile : url.pathname.includes("GetOwnedGames") ? owned : recent;
    return { ok: true, json: async () => ({ response }) };
  };
}

test("normalizes public data, sorts the library, totals every game, and excludes secrets/private fields", async () => {
  const owned = { game_count: 30, games: Array.from({ length: 30 }, (_, index) => ({ appid: index + 1, name: `Game ${index}`, playtime_forever: index * 60 })) };
  const recent = { total_count: 8, games: Array.from({ length: 8 }, (_, index) => ({ appid: index + 1, name: `Recent ${index}`, playtime_2weeks: 30, playtime_forever: 60 })) };
  const result = await readSteamProfile({ key, steamId, fetchImpl: mockFetch({ owned, recent }) });
  assert.equal(result.games.length, 24);
  assert.equal(result.games[0].minutes, 29 * 60);
  assert.equal(result.totalMinutes, owned.games.reduce((sum, game) => sum + game.playtime_forever, 0));
  assert.equal(result.recentMinutes, 240);
  assert.equal(result.recentGames.length, 6);
  assert.equal(result.gameCount, 30);
  assert.equal(result.libraryVisible, true);
  assert.equal(result.player.profileUrl, `https://steamcommunity.com/profiles/${steamId}/`);
  assert.equal(JSON.stringify(result).includes(key), false);
  assert.equal(JSON.stringify(result).includes("Private field"), false);
});

test("private or unavailable activity stays unknown rather than becoming zero hours", async () => {
  const result = await readSteamProfile({ key, steamId, fetchImpl: mockFetch() });
  assert.equal(result.libraryVisible, false);
  assert.equal(result.recentVisible, false);
  assert.equal(result.totalMinutes, null);
  assert.equal(result.recentMinutes, null);
  assert.equal(result.gameCount, null);
  assert.deepEqual(result.games, []);
  assert.equal(result.player.name, "Test player");
});

test("a genuinely empty public library has zero games and zero hours", async () => {
  const result = await readSteamProfile({ key, steamId, fetchImpl: mockFetch({ owned: { game_count: 0 }, recent: { total_count: 0 } }) });
  assert.equal(result.libraryVisible, true);
  assert.equal(result.totalMinutes, 0);
  assert.equal(result.gameCount, 0);
  assert.equal(result.recentMinutes, 0);
});

test("a missing or invalid playtime is not silently counted as zero", async () => {
  const result = await readSteamProfile({ key, steamId, fetchImpl: mockFetch({ owned: { game_count: 2, games: [{ appid: 1, playtime_forever: 60 }, { appid: 2, playtime_forever: -5 }] } }) });
  assert.equal(result.totalMinutes, null);
  assert.equal(result.games[1].minutes, null);
});

test("a library service failure still permits profile and recent activity", async () => {
  const result = await readSteamProfile({ key, steamId, fetchImpl: mockFetch({ fail: "GetOwnedGames", recent: { total_count: 0 } }) });
  assert.equal(result.player.name, "Test player");
  assert.equal(result.libraryVisible, false);
  assert.equal(result.totalMinutes, null);
  assert.equal(result.recentMinutes, 0);
});

test("missing player, upstream failures, and invalid configuration reject cleanly", async () => {
  await assert.rejects(readSteamProfile({ key, steamId, fetchImpl: mockFetch({ profile: { players: [] } }) }), /profile unavailable/);
  await assert.rejects(readSteamProfile({ key, steamId, fetchImpl: mockFetch({ fail: "GetPlayerSummaries" }) }), /service unavailable/);
  await assert.rejects(readSteamProfile({ key, steamId: "not-an-id", fetchImpl: () => { throw new Error("Must not fetch"); } }), /Invalid Steam configuration/);
});
