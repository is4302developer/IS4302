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

    // struct AccessRecord {
    //     uint256 tokenIdTracer;
    //     uint256 tokenIdSuspect;
    //     bytes32 timeStamp; 
    // }

    struct AccessRecord {
        address tracer;
        bytes32 timeStamp; //no datetime type added yet 
        bytes32 purpose;
    }

    struct TracingDuty {
        uint256 tokenIdSuspect;
        bool caseExists;
    }

    // mapping(uint256 => AccessRecord[]) accessRecords;
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

    function viewAvailableContactTracers() public {
        // To be discussed
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
        // //return True;
    }

    function getAccessRecords (address _citizen) public view returns(AccessRecord[] memory) {
        return accessRecords[_citizen];
    }

}

// contract Trace {

//     address owner;
    
//     mapping(address => bool) public admins;
//     mapping(address => bool) public tracers;
    
    
//     //given a token, returns all the trace records. but only tracer can know who owns the token by querying the db.
    
//     struct AccessRecord {
//         address tracer;
//         bytes32 timeStamp; //no datetime type added yet 
//         bytes32 purpose;
//     }

//     mapping(address => AccessRecord[]) accessRecords; 
//     // given citizen address, see all the access records.
    
//     constructor() public {
//       owner = msg.sender;
//     }
  
//     modifier onlyOwner() {
//         require(msg.sender == owner);
//         _;
//     }
    
//     modifier onlyAdmin() {
//         require(admins[msg.sender]);
//         _;
//     }
    
//     modifier onlyTracer() {
//         require(tracers[msg.sender]);
//         _;
//     }
    
//     function registerAdmin(address admin) public onlyOwner{
//         admins[admin] = true;
//     }
    
//     function registerTracer(address tracer) public onlyAdmin{
//         tracers[tracer] = true;
//     }
    
    
//     function approveRetrieval(bytes32 _timeStamp, bytes32 _purpose) public {
//         AccessRecord memory newRecord = AccessRecord(msg.sender,_timeStamp, _purpose);
//         accessRecords[msg.sender].push(newRecord);
//         //return True;
//     }
    
//     function getOwner() public view returns(address){
//         return owner;
//     }

    
//     function getAccessRecords (address _citizen) public view returns(AccessRecord[] memory) {
//         return  accessRecords[_citizen];
//     }

// }