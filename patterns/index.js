const patternArr = [
	{
		pattern:"What(?:'s|\\sis|\\sare)\\sthe\\smusic\\s(?:styles?|genres?)\\sof\\s(?<Artist>.+)\\s\\?$",
		intent: "Style of artist"
	},
	{
		pattern:"Who\\sdid\\s(?<Track>.+)\\s\\?$",
		intent: "Artist from track"
	},
	{
		pattern:"What(?:'s| is)\\sthe\\salbum\\sof\\s(?<Track>.+)\\s\\?$",
		intent: "Album from track"
	},
	{
		pattern:"What(?:'s|\\sis|\\sare)\\sthe\\smost\\s(?:listened|popular)\\salbums?\\sof\\s(?<Track>.+)\\s\\?$",
		intent: "Most listened album"
	},
	{
		pattern:"Is\\s(?<Artist1>.+)\\smore\\spopular\\sthan\\s(?<Artist2>.+)\\s\\?$",
		intent: "Artists popularity"
	},
	{
		pattern:"Is\\s(?<Track1>.+)\\smore\\slistened\\sthan\\s(?<Track2>.+)\\s\\?$",
		intent: "Tracks popularity"
	},
	{
		pattern:"Give me some recommendations?",
		intent: "Recommendations"
	}
];

module.exports = patternArr;