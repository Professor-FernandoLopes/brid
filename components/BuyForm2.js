// handle change é responsável por captar e armazenar o state
/* handle submit pega as informações do estado, e pode trabalhá-las, inclusive passando-as
para middlewares ou outras funções.
*/
// ATENTAR SEMPRE SE A TRANSFERÊNCIA É DE TOKEN OU DE ETHER
//require('dotenv').config();
import React from "react";
import styles from './buy.module.scss';
// token precisa aprovar
import TokenEth from '../abis/TokenEth.json'
import {Button,Modal} from 'react-bootstrap'
import Bridge from '../abis/BridgeEth.json'
//import TokenBsc from '../abis/TokenBsc.json'
import Web3 from "web3";
import But3 from './Button3'
import But4 from './Button4'
import SymbolModal from './Modal'

//const BridgeBsc = require('../abis/BridgeBsc.json');



// não precisa usar useEffect se não for chamada assíncrona
// aqui eu tenho uma instância da ethereum e da binance
// instância da ETH
//const web3Eth = new Web3('wss://kovan.infura.io/ws/v3/4e5da96ac5b64fdc97cfcf7c10167450');

// instância da BSC
//const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

// apenas este admin pode invocar a função mint
//const adminPrivKey = "14086c59cf80dc588778be6a0dd953ec8c79533b33db5e8a8fe6bb4e1b9ad695";
//const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);



let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  console.log('MetaMask is installed!');
  
  
  web3 = new Web3(window.ethereum);

} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-2-s3.binance.org:8545/"
  );
  web3 = new Web3(provider);
}
 

 
  export default  function BuyForm({buttonSell}) {
  // Load token ETH
  
  let TokenData = TokenEth.networks[42].address
  const addressTokenEth = TokenData
  const ABI = TokenEth.abi

  const [tokenEth, setToken] = React.useState(undefined);
  const [account, setAccount] = React.useState('');
  //const [tokenBalance, setTokenBalance] = React.useState();
 // const [ethBalance, setEthBalance] = React.useState(undefined);
  
  React.useEffect(() => { 
  
    const loadTokenData = async () => {  
    await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    const result2 = new web3.eth.Contract(ABI,addressTokenEth);
    setToken(result2)
     }   
 loadTokenData()
},[]);


// load BridgeEth
let contractBridge = Bridge.networks[4].address
const addressBridgeData = contractBridge
const BRIDGEABI = Bridge.abi 

const [bridgeContract, setBridgeContract] = React.useState()

console.log(bridgeContract)

React.useEffect(() => {  
const loadBridgeData = async () => {    
const result2 = new web3.eth.Contract(BRIDGEABI,addressBridgeData);
 setBridgeContract(result2)
 }   
loadBridgeData()
},[]);

// vai precisar do endereço do tokenEth e da BridgeEth
const buyTokens = (etherAmount) => {
 
  // MÉTODO APROVE PERMITE QUE UM SMART CONTRACT FAÇA ALGO COM SEUS TOKEN
  tokenEth.methods.approve(addressBridgeData, etherAmount).send({ from: account }).on('transactionHash', (hash) => {
  
    // vai fazer o burn e emitir o evento que será captado pela api.
    let b = bridgeContract.methods.burn(account, etherAmount).send({ from: account}).on('transactionHash', (hash) =>{
             
   })
 })
 }

  

  // bridgeBsc mint
  // ao ouvir o evento Transfer emitido pelo script que invocou a função burn
  // a api vai acionar o método mint do smartcontract da BSC
  
  

    // handleSubmit
   const handleSubmit = async (e) => {  
   e.preventDefault();  
   let result = etherAmount.toString()
   let r =  web3.utils.toWei(result,'ether')
   buyTokens(r)
  }

  // handleChange

  const[etherAmount,setEtherAmount] = React.useState('');
  const handleChange = async (e) => {  
    e.preventDefault();  
    const ether2 = e.target.value * 1
    setEtherAmount(ether2)
    console.log(etherAmount)
    
  }
  // ethAmount is the user value input
 
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    return (
  
      
   <>
    <form   onSubmit={handleSubmit} className={styles.back}>

    <span className={styles.swap}> 
     SCRDT Bridge 
     <span className={ styles.swap2 }>
     
     </span>
     </span>
     
    <div className={styles.inputContainer}> 
    <But3  />  
    
    <input 
    type="text"
    className="form-control form-control-lg" style={{borderRadius:"20px", height:"100px", 
    backgroundColor:"#1a2c3f", color:"white"}}
    placeholder="0.0"
    required
    onChange= {handleChange}
    />
     
  </div>
      
        
        <div className={styles.inputContainer}> 
        <But4/>
        
        <input  readOnly 
        className="form-control form-control-lg" style={{borderRadius:"20px", height:"100px",backgroundColor:"#1a2c3f", color:"white"}}
          type="text"
          value={etherAmount}
          placeholder="0.0" 
          
         />
         
            
          </div>

        <div className="mb-1">
          <span className="float-left text-muted"></span>
          <span className="float-right text-muted"></span>
        </div>

      
        <button type="submit"  className="btn btn-success btn-block btn-lg"
         style={{borderRadius:"50px", height:"50px", marginTop:"30px",width:"470px", marginBottom:"1px"}}
         
         >Enter an amount</button>
    </form>
   
    </>
  )}