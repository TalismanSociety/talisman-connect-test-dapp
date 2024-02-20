import logo from './logo.gif';
import './App.css';
import { useState } from 'react';

import {
  web3Enable, 
  web3Accounts,
  web3FromAddress
} from '@polkadot/extension-dapp';

import { ApiPromise, WsProvider } from '@polkadot/api'

function App() {
  const [activeExtension, setActiveExtension] = useState([]);
  const [accountConnected, setAccountConnected] = useState([]);
  

  // connect Polkadot-sdk extensions
  const connectExtension = async () => {
    
    let activeExtension = await web3Enable('encode hackathon dapp')

    setActiveExtension(activeExtension)

    let accounts = []
    activeExtension ? accounts = await web3Accounts() : console.log("No Accounts Found")
    setAccountConnected(accounts)
  }

  // burn 1337 WND from first connected account  
  const initTransaction = async () => {

    // init API
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    // const wsProvider = new WsProvider('wss://127.0.0.1:9944'); // for a local node
    const api = await ApiPromise.create({ provider: wsProvider });


    // grab injected object
    const injector = await web3FromAddress(accountConnected[0].address);
  
    // send to zero address
    const tx = api.tx.balances.transferKeepAlive('5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM', 1337)

    // propogate tx
    tx.signAndSend(accountConnected[0].address, { signer: injector.signer }, ({ status }) => {
      if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
      } else {
          console.log(`Current status: ${status.type}`);
      }
    }).catch((error) => {
        console.log(':( transaction failed', error);
    });  
}
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Encode Hackathon Workshop
        </h2>
      </header>
      <div className="App-body">
        { activeExtension.length > 0 ? (
          <>
            <h4>Selected Extension: {activeExtension[0].name}</h4>
            Account:
            {accountConnected.map(account => 
                <p>{account.meta.name} : {account.address}</p>
            )}
            <div>
              <a href="#init" onClick={() => initTransaction()}>
                <div className='btn'>
                  Burn 1337 Westies
                </div>
              </a>
              <br/>
            </div>
          </>
        ):(
          <div>
            <a href="#connect" onClick={() => connectExtension()}>
              <div className='btn'>
              Connect Wallet
              </div>
            </a>
            <br/>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
