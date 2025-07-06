module.exports.config = {
  name: "quran",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "S H A D O W",
  description: "قراءة آيات من القرآن الكريم",
  commandCategory: "group",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.languages = {
  ar: {
    noMoney: "- يجب أن يكون لديك على الاقل 100 دولار للاستماع إلى آيات القرآن!",
    success: "📖 | استمع إلى هذه الآيات المباركة..."
  },
  en: {
    noMoney: "- You must have at least $100 to listen to Quran verses!",
    success: "📖 | Listening to this blessed verse..."
  },
  vi: {
    noMoney: "- Bạn cần ít nhất 100 đô để nghe các câu Kinh Quran!",
    success: "📖 | Hãy lắng nghe những câu kinh thiêng liêng này..."
  }
};

module.exports.run = async ({ api, event, Currencies, getText }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  const audioLinks = [
    "https://audio.jukehost.co.uk/Rv4gPOzornuPEGv5XIJWNm56CWG3fnSp",
    "https://audio.jukehost.co.uk/e5st7AgyjXleDzPUwBvRt70GNaKpQwNV",
    "https://audio.jukehost.co.uk/ngWtCumV4MTVPBLyk14O9ev2ZxT0sEzr",
    "https://audio.jukehost.co.uk/jnnKiNtQLdsRiorMbHGgm0dLWy64YYx4",
    "https://audio.jukehost.co.uk/eCdZZh7PUHqi6mCI0l3LAoznfKkX4yeb",
    "https://audio.jukehost.co.uk/6t60PWxEa6WaT9QLRFrg0UTwtLYTFHkU",
    "https://audio.jukehost.co.uk/gldIjl98nL1HNgSyztqjEvA5vhaUttb3",
    "https://audio.jukehost.co.uk/Gdrk7gCl7CpDXZ41GaPAxJtguDUElfCU",
    "https://audio.jukehost.co.uk/KWa6s4YLClDCv20tsdQFtMqB3UXMO4tJ",
    "https://audio.jukehost.co.uk/nct5hsU0xjHNTUZDEvDTaoH8QhD0AMFa",
    "https://audio.jukehost.co.uk/QWYnnIcJ3OEz3FcB5sGKesNEtpm3ye61",
    "https://audio.jukehost.co.uk/BNyXe9xeXm7eXcRkzQkki408Nia0qcGF",
    "https://audio.jukehost.co.uk/wNZcxyQFHUGfh86GpwbY3r6SHvCkdwfO",
    "https://audio.jukehost.co.uk/A38nNEQAeCbTuIYIToBI9poggCVyIv2G",
    "https://audio.jukehost.co.uk/oQ7YX2iWNaCLrPvFIIvWyD3ZvC0gEGIg",
    "https://audio.jukehost.co.uk/bLqmHpnLswF9xKUglJALaeOD8EhNywEe",
    "https://audio.jukehost.co.uk/qvMhsEB4Vc3RIyfdwbgGTn0q5ij6OO8f",
    "https://audio.jukehost.co.uk/hZ8YNEzUMWxQpWuNg5Es68aYlN9bvkYf",
    "https://audio.jukehost.co.uk/qbE2d68bPVWZ48qSJp1ieCBFhSDgauXz",
    "https://audio.jukehost.co.uk/bbhiehfZzMyx7msYQxsVoUznHXUskjNF",
    "https://audio.jukehost.co.uk/M1g2130L7Pe2Tx7eoCzG8MpxqdxT2L78",
    "https://audio.jukehost.co.uk/ucToAA7bEPaHoZIlckOnHmBZmNUTpZCh",
    "https://audio.jukehost.co.uk/KIqlgdinCb9J6uZzOP7hLGsjYlxi7hg8",
    "https://audio.jukehost.co.uk/Pif1PGNAqBWgClf67N2r4zD5Llij2SrV"
  ];

  const { senderID, threadID, messageID } = event;
  const data = await Currencies.getData(senderID);
  const money = data.money || 0;

  if (money < 100) {
    return api.sendMessage(getText("noMoney"), threadID, messageID);
  }

  // Deduct 100 currency
  await Currencies.setData(senderID, { money: money - 100 });

  const selectedAudio = audioLinks[Math.floor(Math.random() * audioLinks.length)];
  const filePath = __dirname + "/cache/quran.mp3";

  const callback = () => {
    api.sendMessage(
      { body: getText("success"), attachment: fs.createReadStream(filePath) },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );
  };

  request(encodeURI(selectedAudio))
    .pipe(fs.createWriteStream(filePath))
    .on("close", callback)
    .on("error", (e) => {
      console.error(e);
      api.sendMessage("❌ حدث خطأ أثناء تحميل التلاوة.", threadID, messageID);
    });
};
