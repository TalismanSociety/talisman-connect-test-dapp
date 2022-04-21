import logo from './logo.gif';
import './App.css';
import { useEffect, useState } from 'react';

// import {
//   web3Accounts,
//   web3Enable,
// } from './talisman-connect/bundle.ts';

import {
  web3Enable, 
  web3Accounts
} from '@polkadot/extension-dapp';

function App() {
  const [activeExtension, setActiveExtension] = useState([]);
  const [accountsConnected, setAccountsConnected] = useState([]);
  
  // const injectedExtensions = window?.injectedWeb3

  const connectExtension = async () => {
    
    let activeExtension = await web3Enable('my cool dapp')

    setActiveExtension(activeExtension)

    let accounts = []
    activeExtension ? accounts = await web3Accounts() : console.log("No Accounts Found")
    setAccountsConnected(accounts)
    
    console.log(accounts)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          AmsterDOT Integration Sandpit
        </h2>
        { activeExtension.length > 0 ? (
          <>
            <h4>Selected Extension: {activeExtension[0].name}</h4>
            {accountsConnected.map(account => 
                <p>{account.meta.name} : {account.address}</p>
            )}
          </>
        ):(
          <a href="#" onClick={() => connectExtension()}>
            <div className='btn'>
            Connect your wallet
            </div>
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
