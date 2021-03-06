
// aqui eu crio instâncias das conexões com os providers.
import { InjectedConnector } from '@web3-react/injected-connector'
//import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000
const RPC_URLS = {
  1: process.env.RPC_URL_1 ,
  4: process.env.RPC_URL_4
}

// aqui eu instancio a conexão com o metamask
export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42,56] })

/* export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  defaultChainId: 1
})
*/

// aqui instancio com a walletConnect
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

