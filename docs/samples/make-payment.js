const StellarSdk = require('stellar-sdk');
const {makePayment} = require('../../src');

//const server = new StellarSdk.Server('https://horizon.stellar.org');
//StellarSdk.Network.usePublicNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

const src_secret = '';
const dst_public_key = '';
const amount = '';
makePayment(server, src_secret, dst_public_key, amount).then(console.log).catch(((err) => {
    console.error(JSON.stringify(err, null, 4))
}));
