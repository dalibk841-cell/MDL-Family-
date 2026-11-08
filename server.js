
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

const allowedRoles = new Set([
  "Owner — المالك",
  "Co Owner — نائب المالك",
  "Manager — المدير",
  "Administrator — الإداري",
  "Moderator — المشرف",
  "High Staff +++",
  "High Staff ++",
  "High Staff +",
  "High Staff",
  "Lower Staff +++",
  "Lower Staff ++",
  "Lower Staff +",
  "Lower Staff"
]);

if (process.env.DISCORD_BOT_TOKEN && guildId) {
  discordClient = new Client({
    intents: [
     GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers 
      
  
    ]
  });

  discordClient.once("ready", () => {
    discordReady = true;
    console.log(`Discord bot connected as ${discordClient.user.tag}`);
  });

  discordClient.on("messageCreate", async (message) => {
    try {
      if (!message.guild || message.guild.id !== guildId) return;
      if (message.author.bot) return;
      if (message.content.trim() !== "فسخ") return;

      const isStaff = message.member?.roles.cache.some(
        role => allowedRoles.has(role.name)
      );

      if (!isStaff) {
        const warning = await message.reply(
          "❌ هذا الأمر مخصص لفريق الإدارة فقط."
        );
        setTimeout(() => warning.delete().catch(() => {}), 4000);
        return;
      }

      if (!message.channel.permissionsFor(discordClient.user)
        ?.has("ManageMessages")) {
        await message.reply("❌ البوت يحتاج صلاحية Manage Messages.");
        return;
      }

      let targetMessage = message;

      if (message.reference) {
        targetMessage = await message.fetchReference();

        if (targetMessage.guildId !== guildId) return;
      }

      await targetMessage.delete();

      if (targetMessage.id !== message.id) {
        await message.delete().catch(() => {});
      }

      const confirmation = await message.channel.send("🗑️ تم حذف الرسالة بنجاح!");
      setTimeout(() => confirmation.delete().catch(() => {}), 3000);

    } catch (error) {
      console.error("Delete command error:", error.message);
    }
  });

  discordClient.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
    console.error("Discord login failed:", err.message);
  });
} else {
  console.log("Discord integration is in demo mode.");
}app.get("/api/community"
discordClient.on("guildMemberAdd", async (member) => {
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      channel => channel.isTextBased() && channel.name.includes("ترحيب")
    );

    if (!welcomeChannel) return;

    await welcomeChannel.send(
      `👋 أهلاً وسهلاً ${member} في **MDL FAMILY** ❤️‍🔥

نتمنى تقضي أحلى الأوقات معانا!
اقرأ القوانين واستمتع بوقتك 🔥`
    );
  } catch (error) {
    console.error("Welcome error:", error);
  }
});
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

app.listen(port, () => {
  console.log(`MDL FAMILY website running on port ${port}`);
});
