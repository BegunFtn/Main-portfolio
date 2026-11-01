# Steam dashboard setup

The Gaming page is configured for the profile provided by the owner:
https://steamcommunity.com/profiles/76561199858733261/

## Enable live data

1. Obtain your own Steam Web API user key at https://steamcommunity.com/dev/apikey.
2. Add the following to the project's `.env.local` (already ignored by Git):

   ```dotenv
   STEAM_API_KEY=your_key_here
   ```

3. Restart `npm run dev`. On your hosting provider, set the same server-side environment variable and redeploy.
4. Profile and game details must be visible to access game lists/playtime. The API respects Steam privacy settings. Hidden or unavailable values appear as `—`, never invented statistics.

The key is used only by `/api/steam`, never a `NEXT_PUBLIC_` variable or browser request. Do not paste it into chat or commit it.

## Behavior

- `/api/steam` reads the fixed portfolio owner's profile, owned games and recent games. Visitors cannot choose arbitrary accounts.
- Steam requests time out after eight seconds and cache for five minutes.
- UI can display up to 24 games sorted by playtime; total hours are calculated across the complete returned library.
- Recent hours cover all returned games played in the last two weeks; the UI receives up to six recently played games.
- Library/recent endpoint failures do not hide an otherwise available profile.
- This is a public profile display, not Steam sign-in or account authorization. No Steam credentials are collected.

## Sources

- https://partner.steamgames.com/doc/webapi/ISteamUser#GetPlayerSummaries
- https://partner.steamgames.com/doc/webapi/IPlayerService
- https://partner.steamgames.com/doc/webapi_overview/auth
