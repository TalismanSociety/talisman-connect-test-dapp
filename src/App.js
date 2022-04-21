import logo from './logo.gif';
import './App.css';

import {
  web3InWindow,
  web3Accounts,
  web3FromAddress,
  web3FromSource,
  isWeb3Injected,
  web3EnablePromise,
  web3Enable,
  web3AccountsSubscribe
} from './talisman-connect/bundle.ts';

import { useEffect, useState } from 'react';

function App() {

  const [selectedExtension, setSelectedExtesion] = useState([]);
  const [accountsConnected, setAccountsConnected] = useState([]);

  const injectedExtensions = async () => {
    // await web3InWindow()
    let selectedExtension = await web3Enable('my cool dapp', 'talisman')
    setSelectedExtesion(selectedExtension)

    let accounts = []
    selectedExtension ? accounts = await web3Accounts() : console.log("No Accounts Found")
    setAccountsConnected(accounts)
    
    console.log(accounts)
  }
  // const selectedExtension = async () => 

  useEffect(() => {
    // injectedExtensions();
    // selectedExtension();
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          The <b>Big</b> Wonderful Testing Thingy <span className="Version-Number">1.1.0</span>
        </h2>
        { selectedExtension.length > 0 ? (
          <>
            <h4>Selected Extension {selectedExtension[0].name}</h4>
            {accountsConnected.map(account => 
                <p>{account.meta.name} : {account.address}</p>
            )}
          </>
        ):(
          <a href="#" onClick={() => injectedExtensions()}>
            <div className='btn'>
            Click me to connect your wallet lol
            </div>
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
