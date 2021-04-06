pragma solidity ^0.5.0;
import "./Endorse_Token.sol";
import "./Digital_Token.sol";

contract DigitalEndorse {
    EndorsementToken tokenContract;
    ContactTracingToken cttContract;
    address _owner = msg.sender;

    constructor(
        EndorsementToken contractAddress,
        ContactTracingToken cttAddress
    ) public {
        tokenContract = contractAddress;
        cttContract = cttAddress;
    }

    function endorseTracer(address tracer) public {
        require(cttContract.isTracerByAddress(tracer));
        require(tokenContract.balanceOf(msg.sender) > 0);
        uint256 tokId = tokenContract.getTokenId(msg.sender);
        require(tokenContract.ownerOf(tokId) == msg.sender);
        //tokenContract.approve(address(this), tokId);
        tokenContract.transferFrom(msg.sender, _owner, tokId);
        uint256 gurantorsNo = cttContract.getCitizenGuarantors(tracer) + 1;
        cttContract.setCitizenGuarantors(tracer, gurantorsNo);
    }

    function unendorseTracer(address tracer) public {
        require(cttContract.isTracerByAddress(tracer));
        uint256 tokId = tokenContract.getTokenId(msg.sender);
        require(tokenContract.ownerOf(tokId) == _owner); 
        tokenContract.transferFrom(_owner, msg.sender, tokId);
        uint256 gurantorsNo = cttContract.getCitizenGuarantors(tracer) - 1;
        cttContract.setCitizenGuarantors(tracer, gurantorsNo);
    }



}
