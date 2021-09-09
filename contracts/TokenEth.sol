pragma solidity ^0.8.0;

//não tem nada no construtor apenas chama a interface do token base e passa os argumentos para ele
import './TokenBase.sol';

contract TokenEth is TokenBase {
  constructor() 
  
  TokenBase('scrdt', 'SCRDT') {}
}
