pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Trace {

    address owner;
    
    mapping(address => bool) public admins;
    mapping(address => bool) public tracers;
    
    
    //given a token, returns all the trace records. but only tracer can know who owns the token by querying the db.
    
    struct AccessRecord {
        address tracer;
        bytes32 timeStamp; //no datetime type added yet 
        bytes32 purpose;
    }

    mapping(address => AccessRecord[]) accessRecords; 
    // given citizen address, see all the access records.
    
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
    
    
    function approveRetrieval(bytes32 _timeStamp, bytes32 _purpose) public {
        AccessRecord memory newRecord = AccessRecord(msg.sender,_timeStamp, _purpose);
        accessRecords[msg.sender].push(newRecord);
        //return True;
    }
    
    function getOwner() public view returns(address){
        return owner;
    }

    
    function getAccessRecords (address _citizen) public view returns(AccessRecord[] memory) {
        return  accessRecords[_citizen];
    }

}