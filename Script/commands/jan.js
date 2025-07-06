const axios = require("axios");

module.exports.config = {
  name: "jan",
  version: "1.4.5",
  hasPermssion: 0,
  credits: "Aminul Sordar",
  description: "💬 Jan AI চ্যাটবট: প্রশ্ন করো, শেখাও বা মজা করো!",
  commandCategory: "ai",
  usages: "[message | teach প্রশ্ন - উত্তর | count]",
  cooldowns: 3
};

module.exports.languages = {
  en: {
    missingInput: "⚠️ Please enter a question.",
    invalidFormat: "❌ Invalid format! Use:\n/jan teach Question - Answer",
    serverFail: "🚫 Server error! Try again later.",
    notLearned: "🤖 I haven't learned this yet. Please teach me!",
    countInfo: (q, a) =>
      `📊 Jan Knowledge:\n\n🧠 Total Questions: ${q}\n💬 Total Answers: ${a}\n\n💡 Help me grow smarter by teaching me!`
  },
  bn: {
    missingInput: "⚠️ অনুগ্রহ করে একটি প্রশ্ন লিখুন!",
    invalidFormat: "❌ ভুল ফরম্যাট!\nসঠিকভাবে লিখুন:\n/jan teach প্রশ্ন - উত্তর",
    serverFail: "🚫 সার্ভারে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।",
    notLearned: "🤖 আমি এটা এখনো শিখিনি। আমাকে শেখাও! 🧠",
    countInfo: (q, a) =>
      `📊 জান-এর শেখা তথ্য:\n\n📌 মোট প্রশ্ন: ${q}\n📌 মোট উত্তর: ${a}\n\n💡 আমাকে শেখালে আমি আরও স্মার্ট হবো!`
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { threadID, messageID } = event;
  const input = args.join(" ").trim();
  const sub = args[0]?.toLowerCase();

  if (!input) return api.sendMessage(getText("missingInput"), threadID, messageID);

  if (sub === "count") {
    try {
      const res = await axios.get("https://jan-api-by-aminul-sordar.vercel.app/count");
      const { questions, answers } = res.data;
      return api.sendMessage(getText("countInfo", questions, answers), threadID, messageID);
    } catch {
      return api.sendMessage(getText("serverFail"), threadID, messageID);
    }
  }

  if (sub === "teach") {
    const teachText = args.slice(1).join(" ");
    if (!teachText.includes(" - ")) return api.sendMessage(getText("invalidFormat"), threadID, messageID);

    try {
      const res = await axios.post("https://jan-api-by-aminul-sordar.vercel.app/teach", { text: teachText });
      return api.sendMessage(`✅ ${res.data.message}`, threadID, messageID);
    } catch {
      return api.sendMessage(getText("serverFail"), threadID, messageID);
    }
  }

  try {
    const res = await axios.get(`https://jan-api-by-aminul-sordar.vercel.app/answer/${encodeURIComponent(input)}`);
    const answer = res.data.answer || getText("notLearned");

    return api.sendMessage(`🤖 ${answer}`, threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID
        });
      }
    }, messageID);
  } catch {
    return api.sendMessage(getText("serverFail"), threadID, messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, getText }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const text = body.toLowerCase().trim();
  const triggers = ["jan", "janu", "bby", "baby", "বট", "babu"];
  const matched = triggers.find(prefix => text.startsWith(prefix));
  if (!matched) return;

  const parts = text.split(" ");
  const onlyTrigger = parts.length === 1;

  if (onlyTrigger) {
    // যদি শুধু ডাক হয়, র‍্যান্ডম SMS দিবে
    const randomReplies = [
      "হ্যাঁ জান, ডাকছো? 😚",
      "জান বলো কিরে? 🫂",
      "তোমার অপেক্ষায় ছিলাম 😌",
      "ভালোবাসি তোমাকে 💖",
      "আমি তো তোমারই জান 🥰",
      "Hmm কে ডাকছে জান কে 🤭",
      "সোনা জান বলো, কথা শুনছি 🐰",
      "I love you too 😽",
      "জান একটু ঘুমাচ্ছিলাম, এখন উঠলাম তোমার জন্য 💤💘",
      "জান! এতবার ডাকো কেন? আমি তো পাশেই আছি 🫣"
    ];
    const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];

    return api.sendMessage(reply, threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID
        });
      }
    }, messageID);
  }

  // অন্যথায় API থেকে উত্তর দিবে
  try {
    const res = await axios.get(`https://jan-api-by-aminul-sordar.vercel.app/answer/${encodeURIComponent(text)}`);
    const answer = res.data.answer || getText("notLearned");
    return api.sendMessage(`💬 ${answer}`, threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID
        });
      }
    }, messageID);
  } catch {
    return;
  }
};

module.exports.handleReply = async function ({ api, event, getText }) {
  const userInput = event.body.trim();

  try {
    const res = await axios.get(`https://jan-api-by-aminul-sordar.vercel.app/answer/${encodeURIComponent(userInput)}`);
    const replyText = res.data.answer || getText("notLearned");

    return api.sendMessage(`🤖 ${replyText}`, event.threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID
        });
      }
    }, event.messageID);
  } catch (err) {
    console.error("handleReply error:", err.message);
    return api.sendMessage(getText("serverFail"), event.threadID, event.messageID);
  }
};
