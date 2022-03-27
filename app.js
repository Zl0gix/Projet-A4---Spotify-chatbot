const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const matcher = require('./matcher');
const Spotify = require('./spotify')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
var mode = "normal";
var target = undefined;
var seed = {
	"Artists": {
		"finished": false,
		"questionning": false,
		"items": []
	},
	"Tracks": {
		"finished": false,
		"questionning": false,
		"items": []
	},
	"Genres": {
		"finished": false,
		"questionning": false,
		"items": []
	},
	"finished": false
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (msg) => {
	if (msg.author.id != "942842660505403393" && mode == "normal") {
		console.log(`Message : ${msg}`);
		matcher(msg.content, async cb => {
			switch (cb.intent) {
				case "Style of artist":
					msg.reply("Style of artist");
					console.log(cb.entities.groups);
					var artist = await Spotify.getArtist(cb.entities.groups.Artist);
					msg.reply(`${artist.name} is known to do ${artist.genres}`)
					break;
				case "Artist from track":
					msg.reply("Artist from track");
					console.log(cb.entities.groups);
					var track = await Spotify.getTrack(cb.entities.groups.Track);
					msg.reply(`${track.name} (by ${track.artists[0].name}) is made by ${track.artists[0].name}`)
					break;
				case "Album from track":
					msg.reply("Album from track");
					console.log(cb.entities.groups);
					var track = await Spotify.getTrack(cb.entities.groups.Track);
					msg.reply(`${track.name} is present in ${track.album.name}`)
					break;
				case "Most listened tracks":
					msg.reply("Most listened tracks");
					console.log(cb.entities.groups);
					var artist = await Spotify.getArtist(cb.entities.groups.Artist);
					var topTracks = await Spotify.getArtistTopTracks(artist.id);
					msg.reply(`${artist.name}'s most popular track is ${topTracks[0].name} (followed by ${topTracks[1].name} and ${topTracks[2].name})`)
					break;
				case "Artists popularity":
					msg.reply("Artists popularity");
					console.log(cb.entities.groups);
					var artist1 = await Spotify.getArtist(cb.entities.groups.Artist1);
					var artist2 = await Spotify.getArtist(cb.entities.groups.Artist2);
					var artistDiff = artist1.popularity - artist2.popularity
					var message = ""
					if (artistDiff < 0) {
						message = "less popular than"
					} else if (trackDiff > 0) {
						message = "more popular than"
					} else {
						message = "as popular as"
					}
					msg.reply(`${artist1.name} is ${message} ${artist2.name}`)
					break;
				case "Tracks popularity":
					msg.reply("Tracks popularity");
					console.log(cb.entities.groups);
					var track1 = await Spotify.getTrack(cb.entities.groups.Track1);
					var track2 = await Spotify.getTrack(cb.entities.groups.Track2);
					var trackDiff = track1.popularity - track2.popularity
					var message = ""
					if (trackDiff < 0) {
						message = "less popular than"
					} else if (trackDiff > 0) {
						message = "more popular than"
					} else {
						message = "as popular as"
					}
					msg.reply(`${track1.name} (by ${track1.artists[0].name}) is ${message} ${track2.name} (by ${track2.artists[0].name})`)
					break;
				case "Recommendations":
					msg.reply("Would you prefer recommendations of Artists or Tracks ? (Answer by one of them)");
					mode = "recommendations"
					target = undefined;

					break;
			}
		})
	}
	else if (msg.author.id != "942842660505403393" && mode == "recommendations") {

		if (target == undefined) {
			if (['Artists', 'Tracks'].includes(msg.content)) {
				target = msg.content;
				msg.reply("Target is set. Would you provide me Artists to cook your recommendations ? (Yes/No)");
				seed.Artists.questionning = true;
			} else {
				msg.reply("Please respond with one of the three options");
			}
		} else if (!seed.finished) {
			if (!seed.Artists.finished) {
				if (seed.Artists.questionning) {
					if (['Yes', 'No'].includes(msg.content)) {
						if (msg.content == "No") {
							msg.reply("Would you provide me Tracks to cook your recommendations ? (Yes/No)")
							seed.Artists.finished = true;
							seed.Tracks.questionning = true;
						} else {
							msg.reply("Listening for an artist :");
						}
						seed.Artists.questionning = false;
					} else {
						msg.reply("Please respond with Yes or No");
					}
				} else {
					msg.reply(`Using ${msg.content} for the recommendation, Would you provide me other artists ? (Yes/No)`);
					var artist = await Spotify.getArtist(msg.content)
					seed.Artists.items.push(artist);
					seed.Artists.questionning = true;
				}
			} else if (!seed.Tracks.finished) {
				if (seed.Tracks.questionning) {
					if (['Yes', 'No'].includes(msg.content)) {
						if (msg.content == "No") {
							msg.reply("Would you provide me Genres to cook your recommendations ? (Yes/No)")
							seed.Tracks.finished = true;
							seed.Genres.questionning = true;
						} else {
							msg.reply("Listening for a track :");
						}
						seed.Tracks.questionning = false;
					} else {
						msg.reply("Please respond with Yes or No");
					}
				} else {
					msg.reply(`Using ${msg.content} for the recommendation, Would you provide me other tracks ? (Yes/No)`);
					var track = await Spotify.getTrack(msg.content)
					seed.Tracks.items.push(track);
					seed.Tracks.questionning = true;
				}
			} else if (!seed.Genres.finished) {
				const genres = await Spotify.getGenres()
				if (seed.Genres.questionning) {
					if (['Yes', 'No'].includes(msg.content)) {
						if (msg.content == "No") {
							msg.reply("Now cooking you recommendations");
							seed.Genres.finished = true;
							seed.finished = true;
						} else {
							msg.reply("Listening for a genre :");
						}
						seed.Genres.questionning = false;
					} else {
						msg.reply("Please respond with Yes or No");
					}
				} else {
					if (genres.includes(msg.content)) {
						msg.reply(`Using ${msg.content} for the recommendation, Would you provide me other tracks ? (Yes/No)`);
						seed.Genres.items.push(msg.content);
						seed.Genres.questionning = true;
					} else {
						msg.channel.send(`This is the list of all defined genres ${genres}`);
						msg.reply(`Please, give me another genre, ${msg.content} is not defined.`);
					}
				}
			}
		}
		if (seed.finished) {
			var tracks = await Spotify.getRecommendations(
				seed.Artists.items.map(artist => artist.id),
				seed.Genres.items,
				seed.Tracks.items.map(track => track.id)
			);
			console.log(tracks);
			switch (target) {
				case 'Artists':
					var result = []
					tracks.forEach(track => {
						track.artists.forEach(artist => {
							result.push(artist.name);
						})
					});
					msg.channel.send(`I recommend you : ${[...new Set(result)].join(", ")}`)
					break;
				case 'Tracks':
					msg.channel.send(`I recommend you : ${tracks.map(track => track.name + " (by " + track.artists[0].name + ")")}`)
					break;
			}
			mode = "normal"
			target = undefined;
			seed = {
				"Artists": {
					"finished": false,
					"questionning": false,
					"items": []
				},
				"Tracks": {
					"finished": false,
					"questionning": false,
					"items": []
				},
				"Genres": {
					"finished": false,
					"questionning": false,
					"items": []
				},
				"finished": false
			}
		}

		console.log(`Message : ${msg}`);
	}
});

client.login(token);