const https = require('https');
const StellarSdk = require('stellar-sdk');
const {generateAccount, makePayment, getBalance} = require('../../src');

const src_account = generateAccount();
const dst_account = generateAccount();

https.get(`https://horizon-testnet.stellar.org/friendbot?addr=${src_account.public_key}`, (res) => {
    const {statusCode} = res;
    if (statusCode === 200) {
        console.log(`account ${src_account.public_key} has been funded`);
        const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
        getBalance(server, src_account.public_key).then(console.log)
        makePayment(server, src_account.secret, dst_account.public_key, '100000').then(console.log).catch(console.error);
    } else {
        console.error('there was an error in funding the account');
        process.exit(1);
    }
}).on('error', (err) => {
    console.log('request to fund account failed');
    console.error(JSON.stringify({
        err
    }, null, 4));
    process.exit(1);
});
