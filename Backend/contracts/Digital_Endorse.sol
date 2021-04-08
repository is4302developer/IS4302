pragma solidity ^0.5.0;
import "./Endorse_Token.sol";
import "./Digital_Token.sol";

contract DigitalEndorse {
    EndorsementToken tokenContract;
    ContactTracingToken cttContract;
    mapping(address => address) endorsements;  // endorsee => citizen being endorsed
    address _owner = msg.sender;

    constructor(
        EndorsementToken contractAddress,
        ContactTracingToken cttAddress
    ) public {
        tokenContract = contractAddress;
        cttContract = cttAddress;
    }

    function endorseTracer(address citizen) public {
        require(tokenContract.balanceOf(msg.sender) > 0);
        uint256 tokId = tokenContract.getTokenId(msg.sender);
        require(tokenContract.ownerOf(tokId) == msg.sender);
        tokenContract.transferFrom(msg.sender, _owner, tokId);
        uint256 gurantorsNo = cttContract.getCitizenGuarantors(citizen) + 1;
        cttContract.setCitizenGuarantors(citizen, gurantorsNo);
        endorsements[msg.sender] = citizen;
    }

    function unendorseTracer(address citizen) public {
        require(endorsements[msg.sender] == citizen);
        uint256 tokId = tokenContract.getTokenId(msg.sender);
        require(tokenContract.ownerOf(tokId) == _owner); 
        tokenContract.transferFrom(_owner, msg.sender, tokId);
        uint256 gurantorsNo = cttContract.getCitizenGuarantors(citizen) - 1;
        cttContract.setCitizenGuarantors(citizen, gurantorsNo);
        endorsements[msg.sender] = address(0);
    }
}
