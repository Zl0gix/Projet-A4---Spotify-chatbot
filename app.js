const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const matcher = require('./matcher');
const Spotify = require('./spotify')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (msg) => {
	if (msg.author.id != "942842660505403393") {
		console.log(`Message : ${msg}`);
		matcher(msg.content, cb => {
			switch (cb.intent) {
				case "Style of artist":
					msg.reply("Style of artist");
					break;
				case "Artist from track":
					msg.reply("Artist from track");
					break;
				case "Album from track":
					msg.reply("Album from track");
					break;
				case "Most listened album":
					msg.reply("Most listened album");
					break;
				case "Artists popularity":
					msg.reply("Artists popularity");
					break;
				case "Tracks popularity":
					msg.reply("Tracks popularity");
					break;
				case "Recommendations":
					msg.reply("Recommendations");
					// faire de la merde
					break;
			}
		})
	}
});

client.login(token);