module.exports.config = {
  name: "help2",
  version: "3.0-onlyAll",
  hasPermssion: 0,
  credits: "Aminul Sordar - Simplified by ChatGPT",
  description: "📚 Show all commands in decorated style",
  commandCategory: "🛠 System",
  usages: "all",
  cooldowns: 5
};

module.exports.languages = {
  en: {
    allCmds:
`📚 𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
━━━━━━━━━━━━━━━━━━━━
%1
━━━━━━━━━━━━━━━━━━━━
📌 Total: %2 commands
📂 Events: %3
🧑‍💻 Made by: Rifat Ahmed 🧃`
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { threadID, messageID } = event;
  const { commands, events } = global.client;

  if (args[0] !== "all")
    return api.sendMessage("❌ Please use: help all", threadID, messageID);

  const allCmds = Array.from(commands.values()).map((cmd, i) =>
`━❮●❯━━━━━❪❤💙💚❫━━━━━❮●❯━
【•${i + 1} ★𝐂𝐌𝐃-𝐍𝐀𝐌𝐄★【•${cmd.config.name}•】`
  ).join("\n");

  const msg = getText(
    "allCmds",
    allCmds,
    commands.size,
    events.size
  );

  return api.sendMessage(msg, threadID, messageID);
};
