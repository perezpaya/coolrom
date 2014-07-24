Coolrom
============

Node.js coolrom.com webscrapper

npm install coolrom

## Easy to use. No moar

```javascript

var coolrom = require('coolrom');

coolrom.getPlatforms(function (err, platforms) {

    console.log(err, platforms);

})

coolrom.getFiltersByPlatform('snes', function (err, filters) {

    console.log(err, filters);

});

coolrom.searchRom('nes', 'zelda', function (err, roms) {

    console.log(err, roms);

});

coolrom.getRomsByPlatformAndFilter('nes', 'a', function (err, roms) {

    console.log(err, roms);

});

coolrom.getRomByIdAndPlatform(656, 'nes', function (err, rom){

    console.log(err, rom);

});

coolrom.getRomDownloadLink(656, function (err, link){

    console.log(err, link);

});
```
