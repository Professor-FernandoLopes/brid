pragma solidity ^0.8.0;

// apenas uma interface com duas funções que podem ser compartilhadas por qualquer token

interface IToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
}
