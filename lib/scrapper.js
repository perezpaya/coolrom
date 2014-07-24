var request = require('request');
var c = console.log

var web_endpoints = {
	search: 'http://{domain}/search?q={query}&system={platform}',
	romById: 'http://{domain}/roms/{platform}/{id}/Batman.php',
	download: 'http://{domain}/dlpop.php?id={id}',
	platforms: 'http://{domain}/roms/'
}

function Scrapper (target, callback){

	this.target = target;

};

Scrapper.prototype.getRequest = function(url, data, callback) {
	request.get(url.format(data), function (error, resp, body){
		callback(error, body);
	});
};

Scrapper.prototype.getPlatforms = function(callback) {
	this.getRequest(web_endpoints.platforms, {
		domain: this.target
	}, callback);
};

Scrapper.prototype.searchRom = function(query, system, callback) {

	if(typeof system == 'function'){
		callback == system;
		system = '';
	}

	this.getRequest(web_endpoints.search, {
		domain: this.target,
		query: query,
		system: system
	}, callback);

};

Scrapper.prototype.getRomByIdAndPlatform = function(id, platform, callback) {

	this.getRequest(web_endpoints.romById, {
		domain: this.target,
		id: id,
		platform: platform
	}, callback);

};

Scrapper.prototype.getRomDownloadLink = function(id, callback) {

	this.getRequest(web_endpoints.download, {
		domain: this.target,
		id: id
	}, callback);

};


module.exports = Scrapper;

// Tooling :P

String.prototype.format = function() {
	
	var formatted = this;

    if(typeof arguments[0] == 'object'){
    	var object = arguments[0];
    	for (key in object){
    		var regexp = new RegExp('\\{'+key+'\\}', 'gi');
	        formatted = formatted.replace(regexp, object[key]);
    	}
    } else{
	    for (var i = 0; i < arguments.length; i++) {
	        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
	        formatted = formatted.replace(regexp, arguments[i]);
	    }
    }

    return formatted;

};