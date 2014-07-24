var parser = require('./lib/parser')

module.exports = {
	getPlatforms: parser.getPlatforms
}

parser.getPlatforms(function (err, platforms) {

	console.log(err, platforms);

})