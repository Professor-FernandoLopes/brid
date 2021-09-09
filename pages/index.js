// Aqui importa o Main. No Main tem o BuyForm e o SellForm
// aqui vem os providers
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

// inject web3providers from ethersjs
import { Web3Provider } from "@ethersproject/providers";
// formata o resultado com base na ethersjs
import { formatEther } from "@ethersproject/units";
// react dom to handle dom
import * as ReactDOM from "react-dom";
// react
import * as React from "react";

//dois componentes e um hook
import {Web3ReactProvider, useWeb3React,UnsupportedChainIdError} from "@web3-react/core";

import { NoEthereumProviderError,UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";

import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector";

// injected is responsible to connection inject
// constants which came from "./connectors"

// dos conectors estes dois
import {injected,walletconnect} from "../connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { Spinner } from "../components/Spinner";
//import BuyForm from "../components/BuyForm";
import Main from "../components/Main";
import styles from './index.module.scss'



// serão tratados por meio de Object.key() fazem a conexão com as wallets
const connectorsByName = {
 // WalletConnect: walletconnect,
  Injected: injected, 
  
};

// functions

// getErrorMessage in order to inform users they don't have an available connection
function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return //"No Ethereum browser extension detected";
  } else if (error instanceof UnsupportedChainIdError) {
    return //"Unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "";
  } else {
    console.error(error);
    return "";
  }
}

// getLibrary
  function getLibrary(provider) {
  // web3Provider comes from ethers
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

// Function App

function App() {
 
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
       <MyComponent />
      <Main/>
    </Web3ReactProvider>
  );
}


// <Web3ReactProvider> receives getLibrary as props
// function MyComponent is passed as children to <Web3ReactProvider> which is children from App

function MyComponent() {
  
  const context = useWeb3React();
  
  // destructuring this properties from context
  const {connector,library,chainId,account,activate,deactivate, active, error} = context;

  // handle logic to recognize the connector currently being activated
  // in order to take the data
  const [activatingConnector, setActivatingConnector] = React.useState();
  
React.useEffect(() => {
    console.log('running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);


  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
// set up block listener
  // Here I take the balance of the connected account
  // fetch eth balance of the connected account
  
  // função muito importante
  
  function Balance() {
  const { account, library, chainId } = useWeb3React()
  const [balance, setEthBalance] = React.useState();
  React.useEffect(() => {
    console.log('running')
    
    if (library && account) {
      let stale = false;

      library.getBalance(account).then(balance => {
          
        if (!stale) {
            setEthBalance(balance);
          }
        }).catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(undefined);
      };
    }  // chama esta função em havendo estas atualizações
  }, [library, account, chainId]);
  
  
}

 
  
  
  // log the walletconnect URI
  React.useEffect(() => {
    console.log('running')
    const logURI = uri => {
      console.log("WalletConnect URI", uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);
 
  
  // here is the return logic
  return (
    
    <nav  className={styles.nav} >
                                                                                                           
      <h3>
<span></span>
 
  <img src="/images/CRDT.png" alt="girl coding" className={styles.input_img}/>

  
        </h3>     
      
      
      <div class={styles.butt}>
        
        {(active || error) && (
          
          
  
          <button className="btn btn-dark btn-block btn-lg"
            style={{
              height: "45px",
              width:"150",
              borderRadius: "100px",
              borderColor: "red",
              cursor: "pointer",
              display: "flex",
              fontSize:"14px"
            }}
            onClick={() => {
              deactivate();
            }}
          >
            Deactivate
          </button>
        )}

<div>
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          const activating = currentConnector === activatingConnector;
          const connected = currentConnector === connector;
          const disabled =
            !triedEager || !!activatingConnector || connected || !!error;

          return (
             // este botão cobre injected e walletConnect
             
             
             <button className="btn btn-success btn-block btn-lg"
              
             
             style={{
                height: "45px",
                borderRadius: "100px",
                borderColor: activating,
                width: "150px",
                position:"absolute"
                  ? "orange"
                  : connected
                  ? "green"
                  : "unset",
                cursor: disabled ? "unset" : "pointer",
                position: "relative"
              }}
             
              disabled={disabled}
              key={name}
              
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(connectorsByName[name]);
              }}
            >
      
      
           <div style={{position: "absolute", 
           top: "8px", left: "0", right:"0", bottom:"0"
           ,color: "white",fontSize:"14px" }}>
                
           
                
                 {activating && (
                  <Spinner
                    color={"black"}
                    style={{ height: "25%" }}
                  />
                )}
                {connected && (<span role="img" aria-label="check"> </span> )}
                <span className="one" styles={{fontSize:"14px"}}>
                  
                  {account === undefined
                    ? "Connect"
                    : account === null
                    ? "None"
                    : `${account.substring(0, 6)}...${account.substring(
                        account.length - 4
                      )}`  }
                     
                </span>
              </div>
              
             
             
            </button>
          );
          
        })}
      </div>


        {!!error && (
          <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
            {getErrorMessage(error)}
          </h4>
        )}
      
      </div>

      
      
       
       
                             
    
     
    </nav>
  );
}

export default App