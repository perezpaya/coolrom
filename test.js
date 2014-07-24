var coolrom = require('./index')

coolrom.getPlatforms(function (err, platforms) {

	console.log(err, platforms);

})

coolrom.getRomsByPlatform('snes', function (err, rooms) {

	console.log(err, rooms);

});