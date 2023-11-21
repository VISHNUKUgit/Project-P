const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('onDisplay', () => {
    console.log("Event happened!!!");
});

eventEmitter.emit("onDisplay");
