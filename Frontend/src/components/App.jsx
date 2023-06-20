import { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFT from './../contracts/NFT.json';
import Navbar from './Navbar';
import './../styles.css';

function App() {
   const [web3, setWeb3] = useState(null)
   const [account, setAccount] = useState(null)
   const [nft, setNft] = useState(null)
   const [nftAddress, setNftAddress] = useState('')

   const [currentSupply, setCurrentSupply] = useState(40)

   const[counter, setCounter] = useState(1)
   const [rolling, setRolling] = useState(false)

   const [ownerOf, setOwnerOf] = useState([])
   const[tokenid, setTokenId] = useState('Mint your husky first!')
   const [buttonText, setButtonText] = useState('Mint')


  const loadData = async()=>{
    const networkId = await web3.eth.net.getId();
    const nft = new web3.eth.Contract(NFT.abi, NFT.networks[networkId].address);
    setNft(nft);
    setNftAddress(NFT.networks[networkId].address);

    const totalSupply = await nft.methods.totalSupply().call();
    const maxSupply = await nft.methods.maxSupply().call();
    setCurrentSupply(maxSupply - totalSupply);

    if(account){
      const ownerOf = await nft.methods.tokensOfOwner(account).call()
      setOwnerOf(ownerOf)
    }
  }

  const loadMetamsk = async ()=>{
    if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()
      if(accounts.length>0) setAccount(accounts[0])
      
      await loadData();

      window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
			})

			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			})

      }
}

  const connectHandler = async ()=>{
    if(web3){
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
    }
  }

  const rollImages = async ()=>{
    const random = async()=>{
      const counter = (Math.floor(Math.random() * 40) + 1);
      setCounter(counter);
    }
    if(!rolling){
       setInterval(random, 10000);
      }
      setRolling(true);
    }

    useEffect(()=>{
      loadMetamsk();
      rollImages();
    }, [account, nft])

  const mintHandler=async (event)=>{
    event.preventDefault();
       if(ownerOf.length>0){
        //  console.log(ownerOf[0].toString())
          alert('You already own a husky!');
          return;
        }

      if(nft && account){
        setButtonText('Minting...')
        setTokenId('Generating...')
        await nft.methods.mint(1).send({from: account, value:0}).on('confirmation', async()=>{
          const totalSupply = await nft.methods.totalSupply().call();
          const maxSupply = await nft.methods.maxSupply().call();
          setCurrentSupply(maxSupply - totalSupply);
          const ownerOf = await nft.methods.tokensOfOwner(account).call()
          setOwnerOf(ownerOf)
          setButtonText('Minted!')
          setTokenId(ownerOf[0].toString())
        })

      }
  }

  return (
      <div className='app'>
        <Navbar connectHandler={connectHandler} account={account}/>
            <h1>Mint your own husky!</h1>
        <main>
          <div className='main-content'>
          <section className='header'>
            <h3>Our collection</h3>
            <img
								src={`https://beige-asleep-chinchilla-881.mypinata.cloud/ipfs/QmfFJZEfRJFf5auRT1PfjKWukmsHgwDxcv8FCeMaUB4ck5/${counter}.png`}
                alt="Husky"
							/>
              <p>Hurry! {currentSupply} left !</p>

          </section>
          <section className='info'>
            <ul>
										<li>40 generated husky images</li>
										<li>Free minting!</li>
                    <li>Hey</li>
									</ul>
                  <button className="mint" onClick={mintHandler}>{buttonText}</button>
                  {nft && <p>Import your NFT using: {nftAddress}
                  <br/><br/>Token ID: {tokenid}</p>}
          </section>
          </div>
        </main>
        
      </div>
    
  );
}

export default App;
