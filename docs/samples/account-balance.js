const StellarSdk = require('stellar-sdk');
const {getBalance} = require('../../src');

//const server = new StellarSdk.Server('https://horizon.stellar.org');
//StellarSdk.Network.usePublicNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

const public_key = process.argv[2];
getBalance(server, public_key).then(console.log).catch(console.error);
