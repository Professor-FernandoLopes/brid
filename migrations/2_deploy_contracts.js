const TokenEth = artifacts.require('TokenEth.sol');
const TokenBsc = artifacts.require('TokenBsc.sol');
const BridgeEth = artifacts.require('BridgeEth.sol');
const BridgeBsc = artifacts.require('BridgeBsc.sol');

module.exports = async function (deployer, network, addresses) {
  if(network === 'ethTestnet') {
    // deploy TokenEth
    await deployer.deploy(TokenEth);
    
    const tokenEth = await TokenEth.deployed();
    // minta 1000 para o endereço do admin
    await tokenEth.mint(addresses[0], '1000000000000000000000');
    
    // deploy BridgeEth
    await deployer.deploy(BridgeEth, tokenEth.address);
    
    const bridgeEth = await BridgeEth.deployed();
    
    // A bridge tem que ter o poder de mintar e burn o token, por isso é o admin do token
    await tokenEth.updateAdmin(bridgeEth.address);
  }
 
 
  if(network === 'bscTestnet') {
    
    await deployer.deploy(TokenBsc);
    
    const tokenBsc = await TokenBsc.deployed();
   
    await tokenBsc.mint(addresses[0], '1000000000000000000000');

    await deployer.deploy(BridgeBsc, tokenBsc.address);
    
    const bridgeBsc = await BridgeBsc.deployed();
    
    await tokenBsc.updateAdmin(bridgeBsc.address);

  }
};
