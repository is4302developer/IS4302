pragma solidity ^0.5.0;

import './ERC721Full.sol';

contract EndorsementToken is ERC721Full {
  constructor() ERC721Full("EndorsementToken", "ENT") public {}
  
  address _owner = msg.sender;

  struct Endorsement {
    address originalOwner; //the citizen who votes
  }

  Endorsement[] endorsements;
  mapping(address => uint256) ownership; //owner => tokenID
  mapping(uint256 => address) tokenOwner; //tokenID => owner
  
  //uint256 totalTokens;

  function createTokens (address citizen) public {
    require(msg.sender == _owner);
    Endorsement memory _endorsement = Endorsement(citizen);
    uint _id = endorsements.push(_endorsement) - 1;
    require(ownership[citizen] == 0); //each citizen can only endorse once, modify this code if need to increase
    ownership[citizen] = _id;
    tokenOwner[_id] = citizen;
    _mint(citizen, _id);
  }
  
  function getCurrentTokenOwner(uint256 tokenId) public view returns (address){
      return tokenOwner[tokenId];
  }
  
  function getTokenId(address citizen) public view returns (uint256){
      return ownership[citizen];
  }
  
  function getOriginalOwner(uint256 tokenId) public view returns (address){
      return endorsements[tokenId].originalOwner;
  }
  
  function getOwnerOfContract() public view returns (address){
      return _owner;
  }
}