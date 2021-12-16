import React, { useEffect, useState, useRef } from "react";
import { ethers } from 'ethers';
import contract from './contracts/ToDaMoonV3.json'
import img2 from './preview/2.png'
import img3 from './preview/3.png'
import img6 from './preview/6.png'
import img7 from './preview/7.png'
import img12 from './preview/12.png'
import img14 from './preview/14.png'
import img18 from './preview/18.png'
import "./App.css";

const contractAddress = "0x5E61Eca760577EB60a2682F43D813167420E0BFD"
const abi = contract.abi

const App = () => {

  const checkWalletIsConnected = async () => { 
    const { ethereum } = window

    if(!ethereum) {
      console.log("Make sure you have Metamask installed")
    } else {
      console.log("Wallet exists! We're ready to go")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log("Found an authorized account ", account)
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWalletHandler = async () => { 
    const { ethereum } = window

    if(!ethereum) {
      alert("Please install Metamask!")
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log("Found an account! Address ", accounts[0])
      setCurrentAccount(accounts[0])
    } catch(err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => { 
    try {
      const { ethereum } = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(contractAddress, abi, signer)

        console.log("Initialize payment")
        let nftTxn = await nftContract.mint(currentAccount, 1)
        
        console.log("Mining... please wait")
        await nftTxn.wait()

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      } else {
        console.log("Ethereum object does not exist")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <div>
        <h1>ToDaMoon</h1>
        <p>An NFT Sandbox by @Gadrian99</p>
      </div>
      <div>
        <img src={img18} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img12} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img2} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img3} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img14} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img6} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
        <img src={img7} style={{ height: '15rem', marginBottom: '1rem', width: '15rem' }}/>
      </div>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <div>
        <h4>Smart Contract Address</h4>
        <p>0x5E61Eca760577EB60a2682F43D813167420E0BFD</p>
      </div>
    </div>
  )
}

export default App
