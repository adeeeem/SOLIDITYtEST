import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractABI from "./contracts/YourContract.json";

const web3 = new Web3(Web3.givenProvider);

const App = () => {
  const [contractInstance, setContractInstance] = useState(null);
  const [account, setAccount] = useState("");
  const [contractValue, setContractValue] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        // Load the contract ABI and deployment address
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = contractABI.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed on the current network");
        }

        // Create an instance of the smart contract
        const contractInstance = new web3.eth.Contract(
          contractABI.abi,
          deployedNetwork.address
        );
        setContractInstance(contractInstance);

        // Get the current user's account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Example: Retrieve a value from the contract
        const value = await contractInstance.methods.getValue().call();
        setContractValue(value);
      } catch (error) {
        console.error("Error initializing contract:", error);
        // Handle the error and display an error message to the user
      }
    };

    init();
  }, []);

  const handleSetValue = async () => {
    try {
      // Example: Set a value in the contract
      await contractInstance.methods.setValue(42).send({ from: account });
      const value = await contractInstance.methods.getValue().call();
      setContractValue(value);
    } catch (error) {
      console.error("Error setting value:", error);
      // Handle the error and display an error message to the user
    }
  };

  return (
    <div>
      <h1>Interacting with Smart Contract</h1>
      <p>Contract value: {contractValue}</p>
      <button onClick={handleSetValue}>Set Value</button>
    </div>
  );
};

export default App;
