var crypto = require('crypto-js');

var secretObject = {
  name: 'Andrew',
  secretName: '007'
}
var secretMessage = JSON.stringify(secretObject);
var secretKey = 'password';

//Enctrypt a message.
var encryptedMessage = crypto.AES.encrypt(secretMessage, secretKey);
console.log(encryptedMessage);

//Decreypt a message.
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var dectryptedMessage = bytes.toString(crypto.enc.Utf8);
var dectryptedObject = JSON.parse(dectryptedMessage);
console.log(dectryptedObject);