console.log('Starting password manager...');

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

console.log(argv.n);

function getAccounts (mpassword) {
  
}

function saveAccounts (accounts, mpassword) {
  
}

//account.name, account.username, account.password
function createAccount (account, mpassword) {
  var accounts = storage.getItemSync('accounts');
  if (typeof accounts === 'undefined') {
    accounts = [];
  }
  accounts.push(account);
  storage.setItemSync('accounts', accounts);
  console.log('Item Saved');
  return account;
}

function getAccount (accountName, mpassword) {
  var accounts = storage.getItemSync('accounts');
  var matchingAccount;
  for (i = 0; i < accounts.length; i++) {
    if (accountName === accounts[i].name) {
      matchingAccount = accounts[i];
    }
  }
  console.log(accounts);
  return matchingAccount;
}

if (command === 'create') {
  var account = {
    name: argv.name,
    username: argv.username,
    password: argv.password
  }
  createAccount(account, argv.mpassword);
} else if (command === 'get') {
  var name = argv.name;
  var fetchedAccount = getAccount(name, argv.mpassword);
  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found');
  } else {
    console.log('Account found');
    console.log(fetchedAccount);
  }
}

