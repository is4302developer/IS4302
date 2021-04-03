pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Trace_Token is ERC721Full {
    constructor() public ERC721Full("Collectible", "COL") {}

    address _owner = msg.sender;

    function createToken(bytes32 hashedNric) public {
        require(msg.sender == _owner);
    }

    function getOwnerOfContract() public view returns (address) {
        return _owner;
    }

    function checkToken() public returns (bool) {}
}
