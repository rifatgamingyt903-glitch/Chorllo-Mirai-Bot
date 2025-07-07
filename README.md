Welcome to **Mirai-Bot**, a powerful, modular Facebook Messenger chatbot built on Node.js — crafted with ❤️ by [Aminul Sordar](https://github.com/Aminulsordar)!

<br />
<p align="center">
    <a href="https://github.com/miraiPr0ject/miraiv2">
        <img src="https://i.imgur.com/sxW5AWa.png" alt="Logo">
    </a>

<h3 align="center">MiraiBot</h3>

<p align="center">
    A simple Facebook Messenger Bot made by AMINUL-SORDAR


---

## 🚀 How to Run the Bot

### 1. Clone the Repository

```bash
git clone https://github.com/Aminulsordar/Mirai-Bot.git
cd Mirai-Bot
``` 
---

### 2. Install Dependencies

```bash
npm install
```

## 3. Start the Bot
```bash
npm start
```
> ✅ Before running, make sure you’ve added your appState.json file or configured login credentials correctly.




---

## 🧩 Features

⚙️ Modular command & event loader

🧠 Conversational AI with learning memory

🌐 Express server + RESTful API

🌍 Multilingual support (English, বাংলা, Tiếng Việt)

🖥 Stylish terminal UI with logs

🔁 Dynamic reloading (commands/events)

📅 Cron jobs & scheduled messages

🛠 Admin system, cooldowns & permission control

📊 Web dashboard ready (Render/Vercel compatible

## How to create new command example here
```bash
module.exports.config = {
	name: "nameCommand", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "version", // phiên bản của module này
	hasPermssion: 0/1/2, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "Name need credit", // Công nhận module sở hữu là ai
	description: "say bla bla ở đây", // Thông tin chi tiết về lệnh
	commandCategory: "group", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "[option] [text]", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
		"packageName": "version"
	}, //Liệt kê các package module ở ngoài tại đây để khi load lệnh nó sẽ tự động cài!
	envConfig: {
		//Đây là nơi bạn sẽ setup toàn bộ env của module, chẳng hạn APIKEY, ...
	}
};

module.exports.languages = {
	"vi": {
		//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
	},
	"en": {
		//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
	}
}

module.exports.onLoad = function ({ configValue }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}

module.exports.handleReaction = function({ api, event, models, Users, Threads, Currencies, handleReaction, models }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}

module.exports.handleReply = function({ api, event, models, Users, Threads, Currencies, handleReply, models }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}

module.exports.handleEvent = function({ event, api, models, Users, Threads, Currencies }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}

module.exports.handleSedule = function({ event, api, models, Users, Threads, Currencies, scheduleItem }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}

module.exports.run = function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
}
```

<!-- LICENSE -->
## License

This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE](LICENSE) file.

<!-- CONTACT -->
## Contact

Aminul-sordar - [Facebook](https://facebook.com/100071880593545) - [GitHub](https://github.com/Aminulsordar) - aminulsordar04@gmail.com

-------------
## 🧠 Credits

- 👑 **Real Credit:** [Priyansh Rajput](https://github.com/PriyanshRajput)
- 🤝 **Co-Credit:** Rajib (Islamic Cyber Chat)

> Many thanks to these amazing contributors for their valuable work and inspiration!
> 
Thanks For Using MIRAI-BOT

