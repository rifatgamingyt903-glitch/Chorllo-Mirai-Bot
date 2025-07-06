const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "dalle",
  version: "1.0.0",
  hasPermssion: 0, // 0 = all users
  credits: "Aminul Sordar",
  description: "🎨 Generate an image from text using DALL·E 3",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  },
  envConfig: {
    DALLE_API_KEY: "024875ee661a808c753b5e2f6a3eb908547691275d2015a884772153679618ef"
  }
};

module.exports.languages = {
  "en": {
    missingPrompt: "❌ | Please provide a prompt.\n\nExample: dalle A cat sitting on Mars.",
    waiting: "⏳ | Generating your image, please wait...",
    success: "✅ | Here's your generated image!",
    error: "❌ | Something went wrong. Please try again later."
  },
  "vi": {
    missingPrompt: "❌ | Vui lòng nhập nội dung để tạo ảnh.\n\nVí dụ: dalle một con mèo trên sao Hỏa.",
    waiting: "⏳ | Đang tạo ảnh, vui lòng đợi...",
    success: "✅ | Đây là ảnh bạn yêu cầu!",
    error: "❌ | Có lỗi xảy ra, vui lòng thử lại sau."
  },
  "bn": {
    missingPrompt: "❌ | অনুগ্রহ করে একটি প্রম্পট দিন।\n\n📌 উদাহরণ: dalle চাঁদের উপর বসে আছে একটি বিড়াল।",
    waiting: "⏳ | অনুগ্রহ করে অপেক্ষা করুন... আপনার ইমেজ তৈরি হচ্ছে!",
    success: "✅ | আপনার চাওয়া ইমেজ প্রস্তুত!",
    error: "❌ | দুঃখিত! ইমেজ তৈরি করতে সমস্যা হয়েছে।"
  }
};

module.exports.onLoad = function () {
  const dir = path.join(__dirname, "cache");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};

module.exports.handleReaction = function () {};
module.exports.handleReply = function () {};
module.exports.handleEvent = function () {};
module.exports.handleSedule = function () {};

module.exports.run = async function ({ api, event, args, getText }) {
  const prompt = args.join(" ");
  const apiKey = module.exports.config.envConfig.DALLE_API_KEY;

  if (!prompt)
    return api.sendMessage(getText("missingPrompt"), event.threadID, event.messageID);

  const url = `https://haji-mix.up.railway.app/api/imagen?prompt=${encodeURIComponent(prompt)}&model=dall-e-3&quality=hd&api_key=${apiKey}`;

  try {
    api.sendMessage(getText("waiting"), event.threadID, event.messageID);

    const res = await axios.get(url);
    const imageUrl = res.data.image;

    const imgData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imgPath = path.join(__dirname, "cache", `${event.senderID}_dalle.jpg`);
    fs.writeFileSync(imgPath, imgData.data);

    api.sendMessage({
      body: `${getText("success")}\n🖼️ Prompt: ${prompt}`,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

  } catch (err) {
    console.error("DALL·E Error:", err.message);
    return api.sendMessage(getText("error"), event.threadID, event.messageID);
  }
};
