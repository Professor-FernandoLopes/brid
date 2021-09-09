// handle change é responsável por captar e armazenar o state
/* handle submit pega as informações do estado, e pode trabalhá-las, inclusive passando-as
para middlewares ou outras funções.
*/

import React from "react";
import styles from './buy.module.scss'
import TokenEth from '../abis/TokenEth.json'

import BridgeEth from '../abis/BridgeEth.json'

// O TOKEN APROVA A BRIDGE FAZER O BURN
import TokenBsc from '../abis/TokenBsc.json'
// A BRIDGE FAZ O BURN
import BridgeBsc from '../abis/BridgeBsc.json'
import Web3 from 'web3'
import But2 from './ButtonSell.js'
import ButSell from "./ButtonSell2"
//import {Spinner} from '../components/Spinner'
// não precisa usar useEffect se não for chamada assíncrona

let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  console.log('MetaMask is installed!');
  
  
  web3 = new Web3(window.ethereum);

} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
  web3 = new Web3(provider);
}
 
  export default  function SellForm() {
  
   
  const addressToken = TokenBsc.networks[97].address
  const ABI = TokenBsc.abi

  const [tokenBsc, setToken] = React.useState(undefined);
  const [account, setAccount] = React.useState('');
  
  React.useEffect(() => { 
  
    const loadTokenData = async () => {  
    await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    const result2 = new web3.eth.Contract(ABI,addressToken);
    setToken(result2)
     }   
 loadTokenData()
},[]);



console.log(tokenBsc)
console.log(account)

const addressTokenEth = TokenEth.networks[42].address
const ABIETH = TokenEth.abi

const [tokenEth, setTokenEth] = React.useState(undefined);
const [accountEth, setAccountEth] = React.useState('');

React.useEffect(() => { 

  const loadTokenDataEth = async () => {  
  await ethereum.enable();
  const accountsEth = await web3.eth.getAccounts();
  setAccountEth(accountsEth[0])
  const result2Eth = new web3.eth.Contract(ABIETH,addressTokenEth);
  setTokenEth(result2Eth)
   }   
loadTokenDataEth()
},[]);






// load BridgeEth
 

// address
const addressBridgeData = BridgeBsc.networks[97].address
//abi
const BRIDGEABI = BridgeBsc.abi 

const [bridgeContract, setBridgeContract] = React.useState()

console.log(bridgeContract)

React.useEffect(() => {  
const loadBridgeData = async () => {    
const result21 = new web3.eth.Contract(BRIDGEABI,addressBridgeData);
 setBridgeContract(result21)
 }   
loadBridgeData()
},[]);

// o nome do parâmetro ele chama de token amount, mas o valor passado é etherAmount
 
const sellTokens = (etherAmount) => {
 
  // MÉTODO APROVE PERMITE QUE UM SMART CONTRACT FAÇA ALGO COM SEUS TOKEN
   tokenBsc.methods.approve(addressBridgeData, etherAmount).send({ from: account }).on('transactionHash', (hash) => {
  
    // vai fazer o burn e emitir o evento que será captado pela api.
    let b = bridgeContract.methods.burn(account, etherAmount).send({ from: account}).on('transactionHash', (hash) =>{
    
     
    
   })

 })
 }
    // handleSubmit
   const handleSubmit = async (e) => {  
   e.preventDefault();  
   let result 
   result = etherAmount.toString()
   let r =  web3.utils.toWei(result,'ether')
   sellTokens(r)
  }

  // handleChange

  const[etherAmount,setEtherAmount] = React.useState('');
  const handleChange = async (e) => {  
    e.preventDefault();  
    const ether2 = e.target.value * 1
    
    setEtherAmount(ether2)
    
    
  }
  // ethAmount is the user value input
 

  return (
  
   
    <form   onSubmit={handleSubmit} className={styles.back}>

    <span className={styles.swap}> 
     CRDT Bridge
     </span>
     
    <div className={styles.inputContainer}> 
    <But2/>  
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
        <ButSell/>
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
    
    
  )}