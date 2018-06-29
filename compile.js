const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//the solc compiler is built for many contracts. As we fed it the 'source'
//(we could have fed it a path) we did not have to specify the source file 
//for ':Inbox'. if we used a path instead of source we would need to specify 
//the source file for ':Inbox' eg 'contracts:Inbox'

module.exports = solc.compile(source, 1).contracts[':Inbox']; 