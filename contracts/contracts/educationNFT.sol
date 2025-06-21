// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EducationNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    // Mapping to track authorized teachers
    mapping(address => bool) public authorizedTeachers;
    
    // Mapping to track school administrators
    mapping(address => bool) public schoolAdmins;
    
    // Structure to store NFT metadata
    struct Achievement {
        string activityName;
        string activityType;
        string schoolName;
        uint256 timestamp;
        address issuedBy;
    }
    
    // Mapping from token ID to achievement details
    mapping(uint256 => Achievement) public achievements;
    
    // Events
    event TeacherAuthorized(address indexed teacher, address indexed admin);
    event TeacherRevoked(address indexed teacher, address indexed admin);
    event AchievementMinted(address indexed student, uint256 indexed tokenId, string activityName);
    
    constructor() ERC721("Education Achievement NFT", "EDU") {}
    
    // Modifier to check if sender is authorized teacher or owner
    modifier onlyAuthorized() {
        require(authorizedTeachers[msg.sender] || owner() == msg.sender, "Not authorized");
        _;
    }
    
    // Authorize a teacher to mint NFTs
    function authorizeTeacher(address teacher) public onlyOwner {
        authorizedTeachers[teacher] = true;
        emit TeacherAuthorized(teacher, msg.sender);
    }
    
    // Revoke teacher authorization
    function revokeTeacher(address teacher) public onlyOwner {
        authorizedTeachers[teacher] = false;
        emit TeacherRevoked(teacher, msg.sender);
    }
    
    // Mint achievement NFT to student
    function mintAchievement(
        address student,
        string memory activityName,
        string memory activityType,
        string memory schoolName,
        string memory tokenURI
    ) public onlyAuthorized {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        achievements[tokenId] = Achievement({
            activityName: activityName,
            activityType: activityType,
            schoolName: schoolName,
            timestamp: block.timestamp,
            issuedBy: msg.sender
        });
        
        emit AchievementMinted(student, tokenId, activityName);
    }
    
    // Batch mint for multiple students
    function batchMint(
        address[] memory students,
        string memory activityName,
        string memory activityType,
        string memory schoolName,
        string memory tokenURI
    ) public onlyAuthorized {
        for (uint i = 0; i < students.length; i++) {
            mintAchievement(students[i], activityName, activityType, schoolName, tokenURI);
        }
    }
    
    // Get achievement details
    function getAchievement(uint256 tokenId) public view returns (Achievement memory) {
        require(_exists(tokenId), "Token does not exist");
        return achievements[tokenId];
    }
    
    // Get all tokens owned by a student
    function getStudentTokens(address student) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(student);
        uint256[] memory tokens = new uint256[](balance);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (_exists(i) && ownerOf(i) == student) {
                tokens[currentIndex] = i;
                currentIndex++;
            }
        }
        
        return tokens;
    }
    
    // Override functions required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}