pragma solidity ^0.5.0;
import "./ERC721Full.sol";

contract ContactTracing_Token is ERC721Full {

    address contractOwner;
    enum citizenRole { tracer, admin, NA }  // Prevents conflict of interest
    uint256 issueId = 0;
    mapping(address => citizenToken) citizens;
    mapping(uint256 => address) tokenOwners;

    constructor() public {
        contractOwner = msg.sender;
    }

    struct citizenToken {
        bool isMinted;
        uint256 tokenId;
        citizenRole role;
        uint256 numReview;
        uint256 rating;
    }

    modifier onlyAdmin(address _address) {
        citizenRole role = citizens[_address].role;
        require(role == citizenRole.admin || _address == contractOwner);
        _;
    }


    // Prevent issuing more than 1 token to any individual
    modifier validIssuance(address _address) {
        require(citizens[_address].isMinted == false);
        _;
    }

    // Ensures that the individual has a token
    modifier validToken(address _address) {
        require(citizens[_address].isMinted == true);
        _;
    }

    // function getRole(address _addresss) public view returns (citizenRole) {
    //     return citizens[_addresss].role;
    // }

    function createToken(address citizenAddress) public onlyAdmin(msg.sender) validIssuance(citizenAddress) {
        _mint(citizenAddress, issueId);
        citizenToken memory newToken = citizenToken(
            true,
            issueId,
            citizenRole.NA,
            0,
            0
        );
        citizens[citizenAddress] = newToken;
        tokenOwners[issueId] = citizenAddress;
        issueId++;
    }

    function registerAdmin(address citizenAddress) public onlyAdmin(msg.sender) validToken(citizenAddress) {
        citizens[citizenAddress].role = citizenRole.admin;
    }

    function registerTracer(address citizenAddress) public onlyAdmin(msg.sender) validToken(citizenAddress) {
        citizens[citizenAddress].role = citizenRole.tracer;
    }

}

// contract Trace_Token is ERC721Full {
//     constructor() public ERC721Full("Collectible", "COL") {}

//     address _owner = msg.sender;

//     function createToken(bytes32 hashedNric) public {
//         require(msg.sender == _owner);
//     }

//     function getOwnerOfContract() public view returns (address) {
//         return _owner;
//     }

//     function checkToken() public returns (bool) {}
// }
