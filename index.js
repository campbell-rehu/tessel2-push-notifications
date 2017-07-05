const tessel = require('tessel-io');
const five = require('johnny-five');
const push = require('pushover-notifications');
const board = new five.Board({
  io: new tessel()
});

const keys = require('./keys');
const USER_KEY = keys.USER_KEY;
const TOKEN = keys.TOKEN;

const p = new push({
  user: USER_KEY,
  token: TOKEN
});

board.on('ready', () => {
  var led = new five.Led('a5');
  var door = new five.Switch({
    pin: 'a2',
    invert: true
  });

  door.on('open', () => {
    led.on();
    const msg = {
      message: 'The circuit has been broken!'
    };
    p.send(msg, (err, result) => {
      print = (err) ? err : result;
      console.log(print);
    });
  });

  door.on('close', () => {
    led.off();
    console.log('The circuit is now closed');
  });
});

