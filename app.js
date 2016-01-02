console.log('Starting password manager...');
var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
.command('create', 'Creates account', function (yargs) {
    yargs.options({
        name: {
            demand: true,
            alias: 'n',
            description: 'Input desired account name.',
            type: 'string'
        },
        username: {
            demand: true,
            alias: 'u',
            description: 'Input desired username',
            type: 'string'
        },
        password: {
            demand: true,
            alias: 'p',
            description: 'Input desired password here.',
            type: 'string'
        },
        mpassword: {
            demand: true,
            alias: 'm',
            description: 'Password to run the create command',
            type: 'string'
        }
    }).help('help');
})
.command('get', 'Gets account', function (yargs) {
    yargs.options({
        name: {
            demand: true,
            alias: 'n',
            description: 'Name of account to get.'
        },
        mpassword: {
            demand: true,
            alias: 'm',
            description: 'Password to run the create command',
            type: 'string'
        }
    }).help('help');
})
.help('help')
.argv;

var command = argv._[0];
console.log(argv);

function getAccounts (mpassword) {
    //use getItemSync to fetch accounts, decrypt and return accounts array.
    var encryptedAccount = storage.getItemSync('accounts');
    var accounts = [];
    if (typeof encryptedAccount !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccount, mpassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return accounts;
}

function saveAccounts (accounts, mpassword) {
    //enctrypt accounts, setItemSync to save the accounts, return the accounts array.
    var enctryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), mpassword);
  	storage.setItemSync('accounts', enctryptedAccounts.toString());
    return accounts;
}

//account.name, account.username, account.password
function createAccount (account, mpassword) {
    var accounts = getAccounts(mpassword);
  	accounts.push(account);
  	saveAccounts(accounts, mpassword);
    return account;
}

function getAccount (accountName, mpassword) {
    var accounts = getAccounts(mpassword);
    var matchingAccount;
    for (i = 0; i < accounts.length; i++) {
        if (accountName === accounts[i].name) {
            matchingAccount = accounts[i];
        }
    }
    return matchingAccount;
}

if (command === 'create') {
  	try {
        var account = {
            name: argv.name,
            username: argv.username,
            password: argv.password
        }
        createAccount(account, argv.mpassword);
    } catch (e) {
        console.log('Could not create an account');
    }

} else if (command === 'get') {
    try {
        var name = argv.name;
        var fetchedAccount = getAccount(name, argv.mpassword);
        if (typeof fetchedAccount === 'undefined') {
            console.log('Account not found');
        } else {
            console.log('Account found');
            console.log(fetchedAccount);
        }
    } catch (e) {
        console.log('Could not retrieve account.');
    }
}

