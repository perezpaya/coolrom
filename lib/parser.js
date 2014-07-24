var Scrapper = require('./scrapper');
var cheerio = require('cheerio');

var scrapper = new Scrapper('coolrom.com');

parser = {}

parser.getPlatforms = function(callback) {
	var $;
	scrapper.getPlatforms(function (err, resp){
		if (err) return callback(err);
		$ = cheerio.load(resp);

		var parsed = $('font a:not([class], [title], [target], [href^="/"][href$=".php"])')

		var platforms = [];

		parsed.map(function (index, item){
			
			var platform = {}
			platform.code = item.attribs.href.replace('/roms/', '').replace('/', '');
			platform.name = item.children[0].data;

			platforms.push(platform);

		});

		callback(null, platforms);

	});

};

parser.searchRom = function(query, system, callback) {
	var $;
	scrapper.searchRom(query, system, function (err, resp){
		if (err) return callback(err);
		callback(err, resp);
	});

};

parser.getRomByIdAndPlatform = function(id, platform, callback) {
	var $;
	scrapper.getRomByIdAndPlatform(id, platform, function (err, resp){
		if (err) return callback(err);
		callback(err, resp);
	});

};

parser.getRomDownloadLink = function(id, callback) {
	var $;
	scrapper.getRomDownloadLink(id, function (err, resp){
		if (err) return callback(err);
		callback(err, resp);
	});

};

parser.getRomsByPlatform = function(platform, callback) {
	var $;
	scrapper.getRomsByPlatform(platform, function (err, resp){
		if (err) return callback(err);
		$ = cheerio.load(resp);
		callback(err, resp);
	})

};

parser.getRomsByPlatformAndFilter = function(platform, filter, callback) {
	var $;
	scrapper.getRomsByPlatformAndFilter(platform, filter, function (err, resp){
		if (err) return callback(err);
		callback(err, resp);	
	})

};

module.exports = parser