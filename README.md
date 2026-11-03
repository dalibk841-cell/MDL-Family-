# MDL FAMILY website starter

A responsive black-and-red community website with a small Node.js backend. It can display the Discord server member count after you connect your bot privately.

## Run it locally

1. Install Node.js (LTS).
2. Extract this folder.
3. In this folder, run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add your bot token, Discord server ID, and invite URL to `.env`.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## Discord setup (keep secrets private)

- Create an application and bot in the Discord Developer Portal.
- Invite the bot to your server with only the permissions it needs. This starter only needs access to the server to read basic guild information.
- Copy the server ID with Discord Developer Mode enabled.
- Put the bot token only in the private `.env` file on the server.
- Never paste the bot token into `public/`, browser JavaScript, screenshots, chats, or a public Git repository. If it is exposed, reset it in the Developer Portal immediately.

## Free hosting

You can deploy the Node.js app on a provider that currently offers a free tier, but free-tier limits and availability can change. Check the provider's current terms before choosing. Set the environment variables in the host dashboard; do not upload `.env`.

## What's included

- Responsive landing page with MDL branding
- Join Discord buttons
- Games section
- Backend `/api/community` endpoint
- Live member count and bot connection indicator when configured

## Next upgrades

Admin applications, giveaway listings, staff directory, leaderboard, Discord OAuth2 sign-in, and bot-powered announcements need additional backend routes and careful permission checks. Do not collect Discord passwords or ask members for their bot tokens.
