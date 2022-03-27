const patternArr = [
	{
		"regex":"What(?:'s|\\sis|\\sare)\\sthe\\smusic\\s(?:styles?|genres?)\\sof\\s(?<Artist>.+)\\s\\?$",
		"intent": "Style of artist"
	},
	{
		"regex":"Who\\sdid\\s(?<Track>.+)\\s\\?$",
		"intent": "Artist from track"
	},
	{
		"regex":"What(?:'s| is)\\sthe\\salbum\\sof\\s(?<Track>.+)\\s\\?$",
		"intent": "Album from track"
	},
	{
		"regex":"What(?:'s|\\sis|\\sare)\\sthe\\smost\\s(?:listened|popular)\\salbums?\\sof\\s(?<Track>.+)\\s\\?$",
		"intent": "Most listened album"
	},
	{
		"regex":"Is\\s(?<Artist1>.+)\\smore\\spopular\\sthan\\s(?<Artist2>.+)\\s\\?$",
		"intent": "Artists popularity"
	},
	{
		"regex":"Is\\s(?<Track1>.+)\\smore\\slistened\\sthan\\s(?<Track2>.+)\\s\\?$",
		"intent": "Tracks popularity"
	}
];

module.exports = patternArr;