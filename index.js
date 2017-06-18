var Drone = require("rolling-spider");
var temporal = require('temporal');

var drone = new Drone({
});

drone.connect(function() {
  drone.setup(function() {
    drone.flatTrim();
    drone.startPing();
    drone.flatTrim();
    console.log('Connected to drone', drone.name);
    temporal.queue([
      {
        delay: 5000,
        task: function () {
          console.log("Taking off!")
          drone.takeOff();
          drone.flatTrim();
        }
      },
      {
        delay: 3000,
        task: function () {
          drone.forward({steps: 4});
        }
      },
      {
        delay: 3000,
        task: function () {
          drone.backward({steps: 4});
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log("Landing!")
          drone.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});
