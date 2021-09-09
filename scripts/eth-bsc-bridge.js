// 1 ouve o evento de transfer burn do 


// este é a ponte
// SERVER CONFIG

// A API APENAS CAPTA O EVENTO TRANSFER DO BURN E FAZ O MINT DO TOKEN INVERSO.
require('dotenv').config();
//const express = require('express')
//const http = require('http')
//const PORT = process.env.PORT || 5000
//const app = express();
//const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

// está chamando o contrato bridge não o contrato token.
const Web3 = require('web3');
const BridgeEth = require('../abis/BridgeEth.json');

const BridgeBsc = require('../abis/BridgeBsc.json');

// aqui eu tenho uma instância da ethereum e da binance
// instância da ETH
const web3Eth = new Web3('wss://rinkeby.infura.io/ws/v3/4e5da96ac5b64fdc97cfcf7c10167450');

// instância da BSC
const web3Bsc = new Web3('https://data-seed-prebsc-2-s3.binance.org:8545/');

// apenas este admin pode invocar a função mint
const adminPrivKey = "14086c59cf80dc588778be6a0dd953ec8c79533b33db5e8a8fe6bb4e1b9ad695";
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

// instancia o contrato bridgeEth
const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['4'].address);

// instancia o contrato bridgeBsc
const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['97'].address
);

// bridgeEth transfer  aqui é o evento da transferência feita pela ponte do ether
// uma direção receber o evento burn da ethereum e chamar o mint da binance
// outra é o inverso.
bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
).on('data', async event => {
  const { from, to, amount, date, nonce } = event.returnValues;

  // bridgeBsc mint
  // ao ouvir o evento Transfer emitido pelo script que invocou a função burn
  // a api vai acionar o método mint do smartcontract da BSC
  
  // aqui é o mint do token bsc pela bridgeBsc
  const tx = bridgeBsc.methods.mint(to, amount, nonce);
  
// fazer o inverso

  try {  
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  
  
  const data = tx.encodeABI();
  
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`Processed transfer: - from ${from} - to ${to} - amount ${amount} tokens
  - date ${date}
  `);
  

   } catch (err){
     console.log(err)
   }
});

// inverso

bridgeBsc.events.Transfer(
  {fromBlock: 0, step: 0}
).on('data', async event => {
  const { from, to, amount, date, nonce } = event.returnValues;

  // bridgeBsc mint
  // ao ouvir o evento Transfer emitido pelo script que invocou a função burn
  // a api vai acionar o método mint do smartcontract da BSC
  
  // aqui é o mint do token bsc pela bridgeBsc
  const tx = bridgeEth.methods.mint(to, amount, nonce);
  
// fazer o inverso

  try {  
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  
  
  const data = tx.encodeABI();
  
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`Processed transfer: - from ${from} - to ${to} - amount ${amount} tokens
  - date ${date}
  `);
  

   } catch (err){
     console.log(err)
   }
});