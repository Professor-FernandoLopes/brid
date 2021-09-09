pragma solidity ^0.8.0;

// aqui apenas o deploy do token
/* token base recebe nome e símbolo no construtor por meio do Token Eth ou Bsc,
que é passado como argumento da interface ERC20
*/
// o admin será o msg.sender
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TokenBase is ERC20 {
  
  address public admin;

  constructor(string memory name, string memory symbol) 
  
  ERC20(name, symbol) {
    admin = msg.sender;
  }

  function updateAdmin(address newAdmin) external {
    require(msg.sender == admin, 'only admin');
    admin = newAdmin;
  }

  function mint(address to, uint amount) external {
    
    _mint(to, amount);
  }

  function burn(address owner, uint amount) external {
    
    _burn(owner, amount);
  }
}

