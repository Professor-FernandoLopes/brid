// está chamando o contrato bridge não o contrato token

const BridgeEth = artifacts.require('./BridgeEth.sol');
// const privKey = 'priv key of sender';
// vai chamar a função burn que vai emitir o evento Transfer que será ouvido pela api
module.exports = async done => {
  const nonce = 5;
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = 1;
  
  // assinatura para a dex version
 
  /* const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  */
         // vai invocar o burn                   //signature como parâmetro burn na dex version
  await bridgeEth.burn(accounts[0], amount);
  done();
}
