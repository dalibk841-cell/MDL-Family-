require("dotenv").config();
const express = require("express");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const port = process.env.PORT || 3000;
const guildId = process.env.DISCORD_GUILD_ID;
const inviteUrl = process.env.DISCORD_INVITE_URL || "#";

app.use(express.static(path.join(__dirname, "public")));

let discordClient = null;
let discordReady = false;

if (process.env.DISCORD_BOT_TOKEN && guildId) {
  discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
  discordClient.once("ready", () => {
    discordReady = true;
    console.log(`Discord bot connected as ${discordClient.user.tag}`);
  });
  discordClient.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
    console.error("Discord login failed. Check your private .env settings.", err.message);
  });
} else {
  console.log("Discord integration is in demo mode. Add the values from .env.example privately.");
}

app.get("/api/community", async (_req, res) => {
  let memberCount = null;
  let serverName = "MDL FAMILY";

  if (discordClient && discordReady) {
    try {
      const guild = await discordClient.guilds.fetch(guildId);
      const fullGuild = await guild.fetch();
      memberCount = fullGuild.memberCount;
      serverName = fullGuild.name || serverName;
    } catch (err) {
      console.error("Could not fetch Discord server info:", err.message);
    }
  }

  res.json({
    serverName,
    memberCount,
    connected: Boolean(discordClient && discordReady),
    inviteUrl
  });
});

app.listen(port, () => console.log(`MDL FAMILY website running on port ${port}`));
