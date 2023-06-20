const NFT = artifacts.require("NFT");

contract('NFT', (accounts) => {
  let nftInstance;

  beforeEach(async () => {
    nftInstance = await NFT.deployed(
      'MyNFT',
      'NFT',
      1,
      100,
      'https://example.com/',
      { from: accounts[0]}
    );
    // console.log(nftInstance);
  });

  it('Deploys successfully', async()=>{
    const address = await todo.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  })

  it('should set the base URI correctly', async () => {
    const newBaseURI = 'https://newbaseuri.com/';
    await nftInstance.setBaseURI(newBaseURI);

    const baseURI = await nftInstance._baseURI();
    assert.equal(baseURI, newBaseURI, 'Base URI not set correctly');
  });

  it('should mint NFTs correctly', async () => {
    const mintAmount = 3;
    const cost = await nftInstance.cost();

    await nftInstance.mint(mintAmount, { from: accounts[0], value: cost * mintAmount });

    const tokensOfOwner = await nftInstance.tokensOfOwner(accounts[0]);
    assert.equal(tokensOfOwner.length, mintAmount, 'NFTs not minted correctly');
  });

  it('should update the cost correctly', async () => {
    const newCost = 2;
    await nftInstance.setCost(newCost);

    const updatedCost = await nftInstance.cost();
    assert.equal(updatedCost, newCost, 'Cost not updated correctly');
  });

  it('should withdraw contract balance correctly', async () => {
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));

    await nftInstance.withdraw();

    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
    assert(initialBalance.lt(finalBalance), 'Contract balance not withdrawn correctly');
  });
});
