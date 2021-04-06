pragma solidity ^0.5.0;
import "./Endorsement_Token.sol";

contract DigitalEndorse {
    EndorsementToken tokenContract;
    address _owner = msg.sender;
    
    constructor(EndorsementToken contractAddress) public {
        tokenContract = contractAddress;
    }
    
    function endorseTracer(address tracer) public {
        //require(tracer is actually a tracer);
        require(tokenContract.balanceOf(msg.sender) > 0);
        uint256 tokId = tokenContract.getTokenId(msg.sender);
        tokenContract.approve(address(this), tokId);
        tokenContract.transferFrom(msg.sender, tracer, tokId);
    }
    
}