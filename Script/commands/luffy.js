module.exports.config = {
  name: "luffy",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "anjelo",
  description: "Show your text on Luffy's paper",
  commandCategory: "fun",
  usages: "luffy <your text>",
  cooldowns: 10,
  dependencies: {
    "canvas": "",
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.languages = {
  en: {
    missingText: "⚠️ | Please provide some text!\nExample: luffy Go to sleep!"
  },
  ar: {
    missingText: "⚠️ | ادخل النص بعد الأمر!\nمثال: لوفي روحو تنامو"
  },
  vi: {
    missingText: "⚠️ | Vui lòng nhập nội dung!\nVí dụ: luffy Đi ngủ đi!"
  }
};

module.exports.wrapText = (ctx, text, maxWidth) => {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);

    const words = text.split(' ');
    const lines = [];
    let line = '';

    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }

      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
        line += `${words.shift()} `;
      } else {
        lines.push(line.trim());
        line = '';
      }

      if (words.length === 0) lines.push(line.trim());
    }

    return resolve(lines);
  });
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { loadImage, createCanvas } = require("canvas");
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const { threadID, messageID } = event;

  const text = args.join(" ");
  if (!text) return api.sendMessage(getText("missingText"), threadID, messageID);

  const bgUrl = "https://i.imgflip.com/72vuh1.jpg";
  const imgPath = __dirname + "/cache/luffy_text.png";

  try {
    const imgData = (await axios.get(bgUrl, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(imgPath, Buffer.from(imgData, "utf-8"));

    const bgImage = await loadImage(imgPath);
    const canvas = createCanvas(bgImage.width, bgImage.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "600 20px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";

    const lines = await this.wrapText(ctx, text, 200);
    ctx.fillText(lines.join("\n"), 40, 250);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(imgPath, imageBuffer);

    return api.sendMessage(
      { attachment: fs.createReadStream(imgPath) },
      threadID,
      () => fs.unlinkSync(imgPath),
      messageID
    );
  } catch (err) {
    console.error("Error in luffy command:", err);
    return api.sendMessage("❌ An error occurred while processing the image.", threadID, messageID);
  }
};
