'use strict';
let Board = function(serialPort) {
  this.serialport = serialPort;
  this.used = [];
  this.rport = /usb|acm|^com/i;
};

Board.prototype.detect = function(cb) {
  // Request a list of available ports, from the result set
  // filter for valid paths via known path pattern match.
  let that = this;
  this.serialport.list(function(err, result) {
    let ports;

    ports = result.filter(function(val) {
      let available = true;
      // Match only ports that Arduino cares about
      // ttyUSB#, cu.usbmodem#, COM#
      if (!that.rport.test(val.comName)) {
        available = false;
      }
      // Don't allow already used/encountered usb device paths
      if (that.used.indexOf(val.comName) > -1) {
        available = false;
      }
      // Allow only if is an arduino
      if (val.manufacturer.indexOf('Arduino') === -1 && val.manufacturer.indexOf('wch') === -1) {
        available = false;
      }

      return available;
    }).map(function(val) {
      return val.comName;
    });
    // If no ports are detected...
    if (!ports.length) {
      cb.call(that, new Error('No ports detected'), null);
    } else {
      // Get the first available device path from the list of detected ports
      that.used.push(ports[0]);
      cb.call(that, null, ports[0]);
    }
  });
};

module.exports = Board;
