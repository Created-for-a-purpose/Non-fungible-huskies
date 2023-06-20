const Navbar=((props)=>{
    const {connectHandler, account} = props;

  return(
    <nav className="navbar">
        <div className="left-content">
        <h1>Non fungible huskies</h1>
        </div>
    <div className="right-content">
    {
    account && (<h3>{account.slice(0, 5) + '...' + account.slice(38, 42)}</h3>)
   }
    {
    !account && (<button onClick={connectHandler}>Connect Wallet</button>)
   }
     </div>
    </nav>
  )
})

export default Navbar;