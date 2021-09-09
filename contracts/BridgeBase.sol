
// QUALQUER PESSOA PODE CHAMAR A FUNÇÃO BURN, MAS APENAS A API PODE CHAMAR A FUNÇÃO MINT
// Para trocar crdt por bcrdt
// 1° invoca a função burn da BridgeEth para queimar o token na rede ethereum
//2° emite um evento para a api para avisar que o token foi queimado
// 3° api chama a função mint
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './Itoken.sol';

contract BridgeBase {
  // admin address controlled by the bridge api
  address public admin;
  
  // é uma interface para o token crdt se for bridgeEth ou bcrdt se for BridgeBsc
  IToken public token;
  
  // evita que a mesma transação seja processada duas vezes.
  uint public nonce;
  
  // vai armazenar qual nonce foi processado
  mapping(uint => bool) public processedNonces;

  // fixa o processo se é burn ou mint
  enum Step { Burn, Mint }

  /* muito importante. São as informações do evento. Vai dizer 
  qual endereço enviou, para onde, a quantidade, a data, o nonce da transação
  e se é uma transação de mint ou burn
  */
  event Transfer(
    address from,
    address to,
    uint amount,
    uint date,
    uint nonce,
    Step indexed step
  );

  /* o contrato bridge recebe no construtor o endereço do token que será queimado ou mintado
  Se for BridgeEth será o crdt, se for BridgeBsc será bcrdt 
  */
  constructor(address _token) {
    admin = msg.sender;
    // instancia duas funções do token, ou seja mint e burn
    token = IToken(_token);
  }

// não pode confundir o argumento que a burn do bridge recebe com o burn do token
// vai ser chamada pelo script e emitirá o evento Transfer que será ouvido pela Api.
  // qualquer um pode chamar a função burn
 // QUANDO FAZ O BURN EMITE O EVENTO TRANSFER
  function burn(address to, uint amount) external {
    
   // instanciação do token
   // token.burn recebe a quantidade que será queimada e de quem é essa quantidade.
    token.burn(msg.sender, amount);
    
    emit Transfer(
      msg.sender,
      to,
      amount,
      block.timestamp,
      // cada transferência terá um único nonce
      nonce,
      Step.Burn
    );
    nonce++;
  }

 // apenas a bridge api deve poder chamar a função mint. 
  function mint(address to, uint amount, uint otherChainNonce) external {
  require(msg.sender == admin, 'only admin');
  
  // verifica se o nonce não foi processado, se tiver true dá um erro
  require(processedNonces[otherChainNonce] == false, 'transfer  processed');
  // atualiza o mapping dizendo que aquele nonce agora foi processado.
  
  processedNonces[otherChainNonce] = true;
    
    // minta o token
    token.mint(to, amount);
    
    emit Transfer(
      msg.sender,
      to,
      amount,
      block.timestamp,
      otherChainNonce,
      Step.Mint
    );
  }
}
