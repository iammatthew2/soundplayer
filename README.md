Sound Player
===========

Nodejs soundplayer wrapper supporting several command line sound players (`AFPLAY`(mac) `APLAY`, `MPG321`, `MPG123`). It is important to note that each of these players need to be installed before they can be used by the lib.

This library also attempts to provide additional support for parameters such as specifying audio device and gain (volume). These are specified using the `options` parameter.

```
var options = {
    "filename": "preview.mp3",
    gain: 100,
    debug: true,
    player: "afplay",
    device: "plughw0:0"
}
```

Installation
-----------
### Debian/Ubuntu - MPG123 ###
````
sudo apt-get install mpg123
npm install soundplayer
````

### Debian/Ubuntu - MPG321 ###
````
sudo apt-get install mpg321
npm install soundplayer
````

Example Usage
------------

````javascript
var soundplayer = require("soundplayer")

var options = {
    "filename": "preview.mp3",
    gain: 100,
    debug: true,
    player: "afplay",
    device: "plughw0:0"
}
var player = new soundplayer(options).play();

player.on('complete', function() {
    console.log('Done with playback!');
});

````

It's simple as that.

Documentation
------------
In progress.
