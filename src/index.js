(function(exports) {

    const StellarSdk = require('stellar-sdk')

    exports.generateAccount = function() {
        const keypair = StellarSdk.Keypair.random()
        const secret = keypair.secret()
        const public_key = keypair.publicKey()
        return {secret, public_key}
    }

    exports.makePayment = function(server, src_secret, dst, amount) {
        return new Promise((resolve, reject) => {
            const src_keypair = StellarSdk.Keypair.fromSecret(src_secret)
            const payment = StellarSdk.Operation.payment({destination: dst, asset: StellarSdk.Asset.native(), amount: amount})
            server.loadAccount(src_keypair.publicKey()).then((account) => {
                const tx = new StellarSdk.TransactionBuilder(account).addOperation(payment).build()
                tx.sign(src_keypair)
                server.submitTransaction(tx).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    console.error('failed to submit transaction')
                    reject(err)
                })
            }).catch((err) => {
                console.error('failed to load account')
                reject(err)
            })
        })
    }

    exports.getBalance = function(server, src_public_key) {
        return new Promise((resolve, reject) => {
            server.loadAccount(src_public_key).then((account) => {
                resolve(account.balances)
            }).catch((err) => {
                console.error('failed to load account')
                reject(err)
            })
        })
    }

})(module.exports)
