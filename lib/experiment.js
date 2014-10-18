var dht = require('./dht.js');
var crypto = require('crypto');

// Create DHT node (server)
var node = dht.node.create(13589);

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
