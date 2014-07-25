var Scrapper = require('./scrapper');
var cheerio = require('cheerio');

var scrapper = new Scrapper('coolrom.com');

parser = {}

parser.getPlatforms = function(callback) {
	var $;
	scrapper.getPlatforms(function (err, resp) {
		if (err) return callback(err);
		$ = cheerio.load(resp);

		var parsed = $('font a:not([class], [title], [target], [href^="/"][href$=".php"])')

		var platforms = [];

		parsed.map(function (index, item) {

			platforms.push({
				code: item.attribs.href.replace('/roms/', '').replace('/', ''),
				name: item.children[0].data
			});

		});

		callback(null, platforms);

	});

};

parser.searchRom = function(query, system, callback) {
	var $;
	scrapper.searchRom(query, system, function (err, resp) {
		if (err) return callback(err);

		$ = cheerio.load(resp);

		var roms = [];

		var romsParsed = $('font[size=2] a[href^="/roms/"][href$=".php"]');

		romsParsed.map(function (index, item) {

			var splitedUrl = item.attribs.href.split('/');

			roms.push({
				id: splitedUrl[3],
				platform: splitedUrl[2],
				name: item.children[0].data
			});

		});

		callback(err, roms);
	});

};

parser.getRomByIdAndPlatform = function(id, platform, callback) {
	var $;
	scrapper.getRomByIdAndPlatform(id, platform, function (err, resp) {
	
		if (err) return callback(err);

		$ = cheerio.load(resp);

		var screenshotsRaw = $('img[src^="http://coolrom.com/screenshots/"][src$=".jpg"]').slice(0, 2);
		var screenshots = [];
		var name = $('title')[0].children[0].data.split(' ROM')[0]
		//var name = //$('div b')[1].innerHTML.split('» ')[this.length]
		
		screenshotsRaw.map(function (index,  item) {
			screenshots.push(item.attribs.src);
		});

		callback(err, {
			id: id,
			platform: platform,
			screenshots: screenshots,
			name: name
		});
	
	});

};

parser.getRomDownloadLink = function(id, callback) {
	var $;
	scrapper.getRomDownloadLink(id, function (err, body, resp){
		if (err) return callback(err);
		var link = body.match(/(http:\/\/)+(fs)+[0-9]+(\.coolrom\.com)+[^\,\'\\]{0,}/g)[1];
		callback(err, link);
	});
};

parser.getFiltersByPlatform = function(platform, callback) {
	var $;
	scrapper.getRomsByPlatform(platform, function (err, resp){
		if (err) return callback(err);
		$ = cheerio.load(resp);
		var tags = $('a[href^="/roms/'+platform+'/"][href$="/"]')
		var filter = [];
		
		tags.map(function (index, item){
			var tag = item.attribs.href.split('/')[3];
			if (tag == '') return;
			var name = item.children[0].data;
			filter.push({code: tag, name: name});
		});

		callback(err, filter);
	});

};

parser.getRomsByPlatformAndFilter = function(platform, filter, callback) {
	var $;
	scrapper.getRomsByPlatformAndFilter(platform, filter, function (err, resp){
		if (err) return callback(err);

		$ = cheerio.load(resp);

		var roms = [];

		var romsParsed = $('a[href^="/roms/"][href$=".php"]');

		romsParsed.map(function (index, item){

			var splitedUrl = item.attribs.href.split('/');

			roms.push({
				id: splitedUrl[3],
				platform: splitedUrl[2],
				name: item.children[0].data
			});

		});

		callback(err, roms);
	});
};

module.exports = parser