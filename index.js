const tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new tessel()
});

board.on('ready', () => {
  var led = new five.Led('a5');
  var door = new five.Switch({
    pin: 'a2',
    invert: true
  });

  door.on('open', () => led.on());
  door.on('close', () => led.off());
});

