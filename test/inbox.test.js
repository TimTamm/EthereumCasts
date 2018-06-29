//This program tests the functionality of inbox.sol using mocha, web3, and the ganache test network
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//constructor for Web3 instances
const provider = ganache.provider();
const web3 = new Web3(provider); //sets up provider for 
//ganache network
const { interface, bytecode } = require('../compile');

let accounts; 
let inbox;
const INITIAL_MESSAGE = 'Hi There!'

beforeEach(async () => { //async tells await return is asynchronous as in it takes time to deploy to network
    //Get a list of all unlocked accounts on Ganache Local network
    accounts = await web3.eth.getAccounts(); //eth module of web3 library
    //await, tells it to wait for network...    

    //Use one of those accounts to deploy the contract

    
    inbox = await new web3.eth.Contract(JSON.parse(interface))//Teaches web3 about what methods an 'Inbox.sol' contract has
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })//Tells web3 that we want to deploy a new copy of this contract
        .send({ from: accounts[0], gas: '1000000' });//Instructs web3 to send out a transaction that creates this contract

    inbox.setProvider(provider);    
});


describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); //ok checks if objects within, 'inbox.options.address' are defined values
    });
    
    it('has a default message', async () => {
        const message = await inbox.methods.message().call(); // methods contains all public functions within inbox 
        assert.equal(message, INITIAL_MESSAGE); //checks if message is equal to INITIAL_MESSAGE
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({ from: accounts[0] });// use .send and the provided test accounts to make change on contract
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});