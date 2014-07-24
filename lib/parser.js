var Scrapper = require('./scrapper');
var cheerio = require('cheerio');

var scrapper = new Scrapper('coolrom.com');

parser = {}

parser.getPlatforms = function(callback) {
	var $;
	scrapper.getPlatforms(function (err, resp){
		if (err){
			return callback(err);
		}

		$ = cheerio.load(resp);

		var parsed = $('font a:not([class], [title], [target], [href^="/"][href$=".php"])')

		var platforms = [];

		parsed.map(function (index, item){
			
			var platform = {}
			platform.code = item.attribs.href.replace('/roms/', '').replace('/', '');
			platform.name = item.children[0].data;

			platforms.push(platform)

		})

		callback(null, platforms)

	});

};

parser.searchRom = function(query, system, callback) {
	var $;
	scrapper.searchRom(function (err, resp){

	});

};

parser.getRomByIdAndPlatform = function(id, platform, callback) {
	var $;
	scrapper.getRomByIdAndPlatform(function (err, resp){

	});

};

parser.getRomDownloadLink = function(id, callback) {
	var $;
	scrapper.getRomDownloadLink(function (err, resp){

	});

};

module.exports = parser