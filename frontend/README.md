# FinishYourCredits

FinishYourCredits is a blockchain-based peer-to-peer marketplace for NUS dining credits, leveraging XRPL and its EVM sidechain to enhance security, transparency, promote environmental sustainability through waste reduction, while promoting inclusivity.

This is a submission for NUS Fintech Summit 2025 for the problem statement by Ripple:

Develop fintech applications leveraging XRPL and its new EVM Sidechain to minimize traditional costs associated with such ventures. These applications may encompass areas like insurance, wealth management, cross-border payments, lending, and more.

For more details about the project, refer to the devpost [here](https://devpost.com/software/finishyourcredits) or ideation report [here](https://docs.google.com/document/d/1MGq_7DXW6DbWYrtslIWyOBwmkku4kFRHT99xC2-lwNE/edit?usp=sharing).

You can view the live demo of the application [here](https://fintech2025.vercel.app/)

## Setting up the project

### Setting up the smart contract

1. `cd contract` to change to the contract directory
2. run `npx hardhat compile` to compile the smart contracts
3. run `npx hardhat ignition deploy ./ignition/modules/FintechModule.ts --network XRPL_EVM_Sidechain_Devnet` to deploy the smart contract on the EVM sidechain

### Setting up the database

1. create a database on supabase or create on localhost using postgres
2. enter the DB connection string inside the .env file inside the frontend folder

### Setting up frontend / backend

1. `cd frontend` to change to frontned directory
2. fill in environment variables in .env.example file and copy to .env file
3. run `npm install --peer-legacy-deps` to install legacy deps as we are using Next.JS v15.0
4. run `npm run dev` to start the server on localhost
