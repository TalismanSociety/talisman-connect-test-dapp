import logo from './logo.gif';
import './App.css';

import {
  web3InWindow,
  web3Accounts,
  web3FromAddress,
  web3FromSource,
  isWeb3Injected,
  web3EnablePromise,
  web3AccountsSubscribe
} from './talisman-connect/bundle.ts';

import {  web3Enable as taliweb }  from './talisman-connect/bundle.ts';


import {
  web3Enable
} from '@polkadot/extension-dapp'

import { useEffect } from 'react';

function App() {

  const injectedExtensions = async () => {
    await web3InWindow()
    await taliweb('my cool dapp', 'talisman')
    await web3Enable("cool daap")
  }
  // const selectedExtension = async () => 

  useEffect(() => {
    injectedExtensions();
    // selectedExtension();
  })



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Big Wonderful Testing Thingy <span className="Version-Number">1.0.0</span>
        </p>
      </header>
    </div>
  );
}

export default App;
