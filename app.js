const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const matcher = require('./matcher');
const Spotify = require('./spotify')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
var mode = normal;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (msg) => {
	if (msg.author.id != "942842660505403393" && mode == normal) {
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
					msg.reply("Would you prefer recommendations of Artists, Tracks or Genre ? You can put one of the propositions, two of them, all of them or none");
					mode = recommendations
					break;
			}
		})
	}
	else if (msg.author.id != "942842660505403393" && mode == recommendations) {
		console.log(`Message : ${msg}`);
		matcher(msg.content, cb => {
			switch (cb.intent) {
				case "Artists":
					msg.reply("Artists Recommendations");
					break;
				case "Tracks":
					msg.reply("Tracks Recommendations");
					break;
				case "Genre":
					msg.reply("Genre Recommendations");
					break;
				case "Artists and Tracks":
					msg.reply("Artists and Tracks");
					break;
				case "Artists and Genres":
					msg.reply("Artists and Genres");
					break;
				case "Tracks and Genres":
					msg.reply("Tracks and Genres");
					break;
				case "All":
					msg.reply("All recommendations");
					break;
				case "None":
					msg.reply("No recommendations");
			}
			mode = normal;
		})
	}
});

client.login(token);