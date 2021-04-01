pragma solidity ^0.5.0;

contract Trace {

    address owner;
    
    mapping(address => bool) public admins;
    mapping(address => bool) public tracers;
    
    
    //given a token, returns all the trace records. but only tracer can know who owns the token by querying the db.
    
    struct AccessRecord {
        bytes32 hashedNric;
        bytes32 timeStamp; //no datetime type added yet 
        bytes32 purpose;
    }

    mapping(address => AccessRecord[]) accessRecords; 
    // given tracer address, see all the info he accessed.
    
    constructor() public {
      owner = msg.sender;
    }
  
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender]);
        _;
    }
    
    modifier onlyTracer() {
        require(tracers[msg.sender]);
        _;
    }
    
    function registerAdmin(address admin) public onlyOwner{
        admins[admin] = true;
    }
    
    function registerTracer(address tracer) public onlyAdmin{
        tracers[tracer] = true;
    }
    
    
    function approveRetrieval(bytes32 nric, bytes32 _timeStamp, bytes32 _purpose) public {
        bytes32 _hashedNric = keccak256(abi.encodePacked(nric));
        AccessRecord memory newRecord = AccessRecord(_hashedNric,_timeStamp, _purpose);
        accessRecords[msg.sender].push(newRecord);
        //return True;
    }

}