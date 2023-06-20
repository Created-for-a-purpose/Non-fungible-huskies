const NFT = artifacts.require("NFT");
require('dotenv').config();

module.exports = async function (deployer,_, accounts) {

  const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_IMAGE_METADATA_CID}/`;
  // const accounts = await web3.eth.getAccounts();
  console.log(accounts[0])

  deployer.deploy(NFT,
    process.env.PROJECT_NAME, 
    process.env.PROJECT_SYMBOL, 
    process.env.MINT_COST,
    process.env.MAX_SUPPLY,
    IPFS_IMAGE_METADATA_URI,
    {from: accounts[0]});

  // console.log(`Project name: ${process.env.PROJECT_NAME}`);
  // console.log("Metadata:", IPFS_IMAGE_METADATA_URI);
    
};
