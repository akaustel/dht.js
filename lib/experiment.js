var dht = require('./dht.js');
var crypto = require('crypto');
var fs = require('fs');



process.on('exit', function(code) {
    console.log("Process exit.");
    fs.writeFileSync('dht.json', JSON.stringify(node.save(),null,2));
});

process.on('SIGINT', function() {
    process.exit();
});

setInterval(function() {
    fs.writeFileSync('dht.json', JSON.stringify(node.save(),null,2));
}, 10*60*1000);

var node;

try {
    var state = JSON.parse(fs.readFileSync('dht.json'));
    // Create DHT node (server)
    var node = dht.node.create(state);
} catch(e) {
    // Create DHT node (server)
    var node = dht.node.create(13589);
}


// Connect to known node in network
node.connect({
  //id: new Buffer(/* 160bit node id */), /* <-- optional */
  address: '194.142.159.165',
  port: 13589
});

// Tell everyone that you have services to advertise
var hash = new Buffer('ThisIsAWishNodeDHTjs');
node.advertise(hash, 13589);

// Wait for someone to appear
node.on('peer:new', function (infohash, peer, isAdvertised) {
  // Ignore other services
  if (!isAdvertised) return;

  console.log(peer.address, peer.port);

  // Stop listening
  //node.close();

/*
  // Returns node's state as a javascript object
  var state = node.save();

  // Create node from existing state
  var old = dht.node.create(state);

  // Just cleaning up
  old.close();
  
  */
});

