// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EducationNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => bool) public schoolAdmins;

    struct Achievement {
        string activityName;
        string activityType;
        uint256 timestamp;
        address issuedBy;
    }

    mapping(uint256 => Achievement) public achievements;
    Achievement[] public achievementArray;

    mapping(address => uint256[]) private studentTokens;

    event AdminAuthorized(address indexed admin);
    event AdminRevoked(address indexed admin);
    event AchievementMinted(address indexed student, uint256 indexed tokenId, string activityName);

    constructor() ERC721("Education Achievement NFT", "EDU") {}

    modifier onlyAdmin() {
        require(schoolAdmins[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    function authorizeAdmin(address admin) public onlyOwner {
        schoolAdmins[admin] = true;
        emit AdminAuthorized(admin);
    }

    function revokeAdmin(address admin) public onlyOwner {
        schoolAdmins[admin] = false;
        emit AdminRevoked(admin);
    }

    function mintAchievement(
        address student,
        string memory activityName,
        string memory activityType,
        string memory tokenURI_
    ) public onlyAdmin returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        Achievement memory newAchievement = Achievement({
            activityName: activityName,
            activityType: activityType,
            timestamp: block.timestamp,
            issuedBy: msg.sender
        });

        achievements[tokenId] = newAchievement;
        achievementArray.push(newAchievement);
        studentTokens[student].push(tokenId);

        emit AchievementMinted(student, tokenId, activityName);

        return tokenId;
    }

    function getAchievement(uint256 tokenId) public view returns (Achievement memory) {
        require(_exists(tokenId), "Token does not exist");
        return achievements[tokenId];
    }

    function getStudentAchievements(address student) public view returns (Achievement[] memory) {
        uint256 tokenCount = studentTokens[student].length;
        Achievement[] memory studentAchievements = new Achievement[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = studentTokens[student][i];
            studentAchievements[i] = achievements[tokenId];
        }

        return studentAchievements;
    }

    function getAllAchievements() public view returns (Achievement[] memory) {
        return achievementArray;
    }

    function getStudentTokenIds(address student) public view returns (uint256[] memory) {
        return studentTokens[student];
    }

    function getStudentAchievementsByType(address student, string memory achievementType)
        public
        view
        returns (Achievement[] memory)
    {
        uint256 tokenCount = studentTokens[student].length;
        uint256 matchCount = 0;

        // First pass: count matches
        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = studentTokens[student][i];
            if (
                keccak256(bytes(achievements[tokenId].activityType)) ==
                keccak256(bytes(achievementType))
            ) {
                matchCount++;
            }
        }

        // Second pass: collect matches
        Achievement[] memory matched = new Achievement[](matchCount);
        uint256 index = 0;

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = studentTokens[student][i];
            if (
                keccak256(bytes(achievements[tokenId].activityType)) ==
                keccak256(bytes(achievementType))
            ) {
                matched[index] = achievements[tokenId];
                index++;
            }
        }

        return matched;
    }

    // Required overrides
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
