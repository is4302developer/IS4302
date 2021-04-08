pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./Digital_Token.sol";

contract ContactTracing {

    ContactTracingToken cttContract;
    address contractOwner;
    enum citizenRole { tracer, admin, NA }

    constructor(ContactTracingToken cttAddress) public {
        cttContract = cttAddress;
        contractOwner = msg.sender;
    }

    struct AccessRecord {
        address tracer;
        bytes32 timeStamp; 
        bytes32 purpose;
    }

    struct TracingDuty {
        uint256 tokenIdSuspect;
        bool caseExists;
    }

    mapping(address => AccessRecord[]) accessRecords;
    mapping(uint256 => uint256) appointedTracers;  // appointer => appointed
    mapping(uint256 => TracingDuty[5]) appointedDuties; 

    function checkIn(uint256 tokenId) public view returns (bool) {
        address _address = cttContract.getTokenOwner(tokenId);
        if (_address == msg.sender) {
            return true;
        } else {
            return false;
        }
    }

    function checkOut(uint256 tokenId) public view returns (bool) {
        address _address = cttContract.getTokenOwner(tokenId);
         if (_address == msg.sender) {
            return true;
        } else {
            return false;
        }
    }

    function viewAvailableContactTracers() public view returns (uint256[] memory) {
        return cttContract.getContactTracers();
    }

    // For citizens to choose and appoint their preferred contact tracer
    function appointTracer(uint256 tokenId) public {
        uint256 appointerTokenId = cttContract.getCitizenTokenId(msg.sender);
        require(cttContract.isTracerByTokenId(tokenId) == true); // Ensure that the tokenId belongs to a valid contact tracer
        appointedTracers[appointerTokenId] = tokenId;
    }

    // For admin to appoint duties to contact tracers
    function appointTracingDuties(uint256 tokenIdSuspect) public returns (bool) {
        require(cttContract.isAdminByAddress(msg.sender) == true); // Restrict function to admins only
        uint256 tokenIdTracer = appointedTracers[tokenIdSuspect];
        for (uint i = 0; i < 5; i++) {
            if (appointedDuties[tokenIdTracer][i].caseExists == false) {
                appointedDuties[tokenIdTracer][i].tokenIdSuspect = tokenIdSuspect;
                appointedDuties[tokenIdTracer][i].caseExists = true;
                return true;
            }
        }
        return false;
    }

    function approveRetrieval(bytes32 _timeStamp, bytes32 _purpose, uint256 tokenIdSuspect) public {
        uint256 tokenIdTracer = cttContract.getCitizenTokenId(msg.sender);
        bool isValid = false;
        uint i;
        for (i = 0; i < 5; i++) {
            if (appointedDuties[tokenIdTracer][i].tokenIdSuspect == tokenIdSuspect) {
                isValid = true;
                break;
            }
        }
        require(isValid == true);
        AccessRecord memory newRecord = AccessRecord(msg.sender, _timeStamp, _purpose);
        address suspect = cttContract.getTokenOwner(tokenIdSuspect);
        accessRecords[suspect].push(newRecord);
        appointedDuties[tokenIdTracer][i].caseExists = false;
    }

    function getAccessRecords(address _citizen) public view returns(AccessRecord[] memory) {
        return accessRecords[_citizen];
    }

    function getTracingDuties(address tracer) public view returns(TracingDuty[5] memory) {
        uint256 tokenId = cttContract.getCitizenTokenId(tracer);
        return appointedDuties[tokenId];
    }

    // For citizens to rate the contact tracer they have appointed
    function rateTracer(uint256 tokenId, uint256 rating) public {
        require(cttContract.isTracerByTokenId(tokenId) == true);
        require(rating >= 0);
        require(rating <= 5);
        address tracer = cttContract.getTokenOwner(tokenId);
        uint256 numReview = cttContract.getCitizenReview(tracer) + 1;
        uint256 totalRating = cttContract.getCitizenTotalRating(tracer) + rating;
        uint256 tracerRating = totalRating/numReview;
        cttContract.setCitizenReview(tokenId, numReview);
        cttContract.setCitizenTotalRating(tokenId, totalRating);
        cttContract.setCitizenRating(tokenId, tracerRating);
    }

}
