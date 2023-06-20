// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721Enumerable, Ownable{
    using Strings for uint256;

    string baseURI;
    string public baseExtension = ".json";
    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmount = 1;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost,
        uint256 _maxSupply,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {

        cost = _cost;
        maxSupply = _maxSupply;

        setBaseURI(_initBaseURI);
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint _mintAmount) public payable{
        uint256 supply = totalSupply();

        require(balanceOf(msg.sender)==0, "Only one NFT per account"); 

        require(_mintAmount > 0, "Need to mint at least 1 NFT");
        require(_mintAmount <= maxMintAmount, "Can't mint more than maxMintAmount");
        require(supply + _mintAmount <= maxSupply, "Not enough NFTs left");
        require(msg.value >= cost * _mintAmount, "Not enough ETH sent");

        for(uint256 i = 1; i <= _mintAmount; i++){
            _safeMint(msg.sender, supply + i);
        }
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function tokensOfOwner(address _owner) public view returns(uint256[] memory){
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);

        for(uint256 i; i<tokenCount; i++){
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
    }
  
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner{
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
       
       require(success);
    }
}

