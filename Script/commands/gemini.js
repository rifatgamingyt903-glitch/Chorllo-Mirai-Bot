const axios = require("axios");

module.exports.config = {
    name: "gemini",
    aliases: ["ai", "ask"],
    version: "2.0.0",
    author: "Aminul Sordar",
    cooldowns: 5,
    role: 0,
    shortDescription: "Ask Gemini AI a question",
    longDescription: "Ask Gemini AI a question using Aryan API and get a stylish response."
};

module.exports.languages = {
    en: {
        noQuestion: "❌ Please provide a question.\n📌 Example:\n- gemini Hi\n- gemini tell me a story",
        noResponse: "⚠️ No response from Gemini.",
        apiError: "⚠️ Failed to get a response from Gemini."
    },
    vi: {
        noQuestion: "❌ Vui lòng nhập câu hỏi.\n📌 Ví dụ:\n- gemini Xin chào\n- gemini kể cho tôi một câu chuyện",
        noResponse: "⚠️ Không có phản hồi từ Gemini.",
        apiError: "⚠️ Không thể nhận phản hồi từ Gemini."
    },
    ar: {
        noQuestion: "❌ الرجاء إدخال سؤال.\n📌 مثال:\n- gemini مرحبا\n- gemini أخبرني قصة",
        noResponse: "⚠️ لا يوجد رد من Gemini.",
        apiError: "⚠️ فشل الحصول على رد من Gemini."
    }
};

module.exports.run = async function({ api, event, args, getText }) {
    const { threadID, messageID, senderName } = event;

    // No question provided
    if (!args || args.length === 0) {
        return api.sendMessage(`🛑 ${getText("noQuestion")}`, threadID, messageID);
    }

    const question = args.join(" ");
    const geminiUrl = `https://aryan-nix-apis.vercel.app/api/gemini?prompt=${encodeURIComponent(question)}`;

    // Send a typing indicator
    api.sendMessage(`💬 Gemini AI is thinking... 🤖`, threadID);

    try {
        const res = await axios.get(geminiUrl);
        const answer = res?.data?.response || getText("noResponse");

        // Decorated reply
        const decoratedReply = 
`🌟 Gemini AI Reply 🌟
👤 User: ${senderName}
❓ Question: ${question}

💡 Answer:
${answer}

✨ Have a great day!`;

        return api.sendMessage(decoratedReply, threadID, messageID);

    } catch (error) {
        console.error("❌ Gemini API Error:", error?.response?.data || error.message);
        return api.sendMessage(
            `⚠️ ${getText("apiError")}\n\nDetails: ${error.message}`,
            threadID,
            messageID
        );
    }
};
