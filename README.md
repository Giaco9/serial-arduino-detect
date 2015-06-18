# serial-arduino-detect
This simple module was heavily inspired from [Jhonny-Five](https://github.com/rwaldron/johnny-five/blob/master/lib/board.js#L67)
and is used with [serialPort](https://github.com/voodootikigod/node-serialport)
for autodetect Arduino board attach via USB.

### Quick example
```javascript
com = require('serialport');
let board = new Board(com);
board.detect(function(err, port){
  if(err) {
    console.error('Arduino do not found');
  } else {
    console.log('see serialPort documentation');
  }
});
```
For search a board you just need to create a new Board with serialPort object,
call detect method and passing a callback. This will be fire with err object or a port where
Arduino was found.
