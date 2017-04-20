/**
 * Sound Player
 * Javascript wrapper to play sound via several commandline soundplayer tools Node.js
 * @author Victor Dibia
 * builds on work done by
 * @author Maciej Sopyło (killah)
 * Copyright 2012 Maciej Sopyło @ KILLAHFORGE.
 *
 * MIT License
 */

var spawn = require('child_process').spawn,
    events = require('events'),
    util = require('util');
var isMac = require('os').type() == 'Darwin' || require('os').type().indexOf('Windows') > -1;

/**
 * [exports description]
 * @param  {[type]} filename [file to be playd]
 * @param  {[type]} mode     ["aplay", "mpg321", "mpg123"]
 * @return {[type]}          [description]
 */
module.exports = function SoundPlayer(options) {
    events.EventEmitter.call(this);
    this.options = options || {};
    this.options.filename = options.filename || "";
    this.options.gain = options.gain || 100;
    this.options.device = options.device || "plughw:1,0";
    this.options.debug = options.debug || false;
    this.options.player = options.player || (isMac) ? "afplay" : "aplay";
};

util.inherits(module.exports, events.EventEmitter);

module.exports.prototype.play = function() {
    this.stopped = false;

    console.log(this.options)

    var self = this;
    switch (this.options.player) {
        case "aplay":
            this.process = spawn('aplay', [this.options.filename, '-D', this.options.device]);
            break;
        case "afplay":
            this.process = spawn('afplay', [this.options.filename, '-v', this.options.gain]);
            break;
        case "mpg321":
            this.process = spawn('mpg321', [this.options.filename, '-g', this.options.gain, '-a', this.options.device]);
            break;
        case "mpg123":
            this.process = spawn('mpg123', [this.options.filename, '-g', this.options.gain, '-a', this.options.device]);
            break;
    }
    this.process.on('exit', function(code, sig) {
        if (code !== null && sig === null) {
            self.emit('complete');
        }
    });

    this.process.on('error', function(err) {
        self.emit('error', err);
        if (self.options.debug) console.log('Error playing file ' + err);
    });
};

module.exports.prototype.stop = function() {
    this.stopped = true;
    this.process.kill('SIGTERM');
    this.emit('stop');
};

module.exports.prototype.pause = function() {
    if (this.stopped) return;
    this.process.kill('SIGSTOP');
    this.emit('pause');
};

module.exports.prototype.resume = function() {
    if (this.stopped) return this.play();
    this.process.kill('SIGCONT');
    this.emit('resume');
};
