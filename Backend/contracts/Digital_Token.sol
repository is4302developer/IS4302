pragma solidity ^0.5.0;
import "./ERC721Full.sol";

contract ContactTracing_Token is ERC721Full {

    address contractOwner;
    enum citizenRole { tracer, admin, NA }  // Prevents conflict of interest
    uint256 issueId = 0;
    mapping(address => citizenToken) citizens;
    mapping(uint256 => address) tokenOwners;

    constructor() public ERC721Full("Collectible", "COL") {
        contractOwner = msg.sender;
    }

    struct citizenToken {
        bool isMinted;
        uint256 tokenId;
        citizenRole role;
        uint256 numReview;
        uint256 rating;
        uint256 numOfGuarantors;
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

    function createToken(address citizenAddress) public onlyAdmin(msg.sender) validIssuance(citizenAddress) {
        _mint(citizenAddress, issueId);  
        citizenToken memory newToken = citizenToken(
            true,
            issueId,
            citizenRole.NA,
            0,
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

    function getTokenOwner(uint256 tokenId) internal view returns (address) {
        return tokenOwners[tokenId];
    }

    function getCitizenTokenId(address citizenAddress) external view returns (uint256) {
        return citizens[citizenAddress].tokenId;
    }

    function getCitizenReview(address citizenAddress) external view returns (uint256) {
        return citizens[citizenAddress].numReview;
    }

    function getCitizenRating(address citizenAddress) external view returns (uint256) {
        return citizens[citizenAddress].rating;
    }

    function getCitizenGuarantors(address citizenAddress) external view returns (uint256) {
        return citizens[citizenAddress].numOfGuarantors;
    }

    function setCitizenReview(uint256 tokenId, uint256 value) external {
        address citizenAddress = getTokenOwner(tokenId);
        citizens[citizenAddress].numReview = value;
    }

    function setCitizenRating(uint256 tokenId, uint256 value) external {
        address citizenAddress = getTokenOwner(tokenId);
        citizens[citizenAddress].rating = value;
    }

    function setCitizenGuarantors(address citizenAddress, uint256 value) external {
        citizens[citizenAddress].numOfGuarantors = value;
    }

    function getRoleByAddress(address citizenAddress) external view returns (citizenRole)  {
        return citizens[citizenAddress].role;
    }

    function getRoleByTokenId(uint256 tokenId) external view returns (citizenRole) {
        address citizenAddress = getTokenOwner(tokenId);
        return citizens[citizenAddress].role;
    }
}