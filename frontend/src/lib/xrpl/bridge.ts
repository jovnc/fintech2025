import xrpl, {
  Amount,
  convertStringToHex,
  CreatedNode,
  TransactionMetadataBase,
  Wallet,
  XChainBridge,
} from "xrpl";
import { getClient, Networks } from "./xrplClient";

// Define the XChainBridge
const xchainbridge = {
  LockingChainDoor: "rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ", // Locking chain door account
  LockingChainIssue: {
    currency: "XRP",
  },
  IssuingChainDoor: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Use the genesis address hardcoded in rippled
  IssuingChainIssue: {
    currency: "XRP",
  },
};

export async function bridgeXRP() {
  try {
    const lockingChainClient = getClient(Networks.Devnet);
    await lockingChainClient.connect();

    const issuingChainClient = getClient(Networks.Sidechain);
    await issuingChainClient.connect();

    // Create a wallet and fund it using the XRP faucet on Devnet.
    const lockingChainWallet = xrpl.Wallet.fromSeed(
      "sEdSSJDxLYNSsBx8TJk8vdvDY8McWSH"
    );
    await lockingChainClient.fundWallet(lockingChainWallet);

    console.log(lockingChainWallet);

    // Generate a wallet to create and fund on the issuing chain.
    const issuingChainWallet = xrpl.Wallet.fromSeed(
      "sEdTmKVqXzPsvgD87b9rRU9mwgunKhf"
    );
    console.log(convertStringToHex(issuingChainWallet.address));
    await issuingChainClient.fundWallet(issuingChainWallet);
    console.log(issuingChainWallet);

    // Create a wallet on the issuing chain and fund it using the XRP faucet on Devnet.
    const createwallet_issuingchain = await lockingChainClient.submitAndWait(
      {
        TransactionType: "XChainAccountCreateCommit",
        Account: lockingChainWallet.address,
        Destination: issuingChainWallet.address,
        XChainBridge: xchainbridge as XChainBridge,
        SignatureReward: "100", // "signature reward" to incentivize witnesses to submit attestations
        Amount: "10000000", // specifies the amount of XRP to send to the new account
      },
      { autofill: true, wallet: lockingChainWallet }
    );
    console.log(createwallet_issuingchain);

    // // Create claim ID
    const createclaim = await issuingChainClient.submitAndWait(
      {
        TransactionType: "XChainCreateClaimID",
        Account: issuingChainWallet.address,
        OtherChainSource: lockingChainWallet.address,
        SignatureReward: "100",
        XChainBridge: xchainbridge as XChainBridge,
      },
      { autofill: true, wallet: issuingChainWallet }
    );

    console.log(createclaim);

    let metadata = (createclaim.result.meta as TransactionMetadataBase)
      .AffectedNodes;

    let claimnode = null;

    for (const item of metadata as CreatedNode[]) {
      if (
        item.CreatedNode &&
        item.CreatedNode.LedgerEntryType === "XChainOwnedClaimID"
      ) {
        claimnode = item.CreatedNode;
        break;
      }
    }

    if (!claimnode) {
      throw new Error("Claim node not found");
    }
    const claimID = claimnode.NewFields.XChainClaimID;

    console.log("Claim ID", claimID);

    const xchaincommit = await lockingChainClient.submitAndWait(
      {
        TransactionType: "XChainCommit",
        Account: lockingChainWallet.address,
        OtherChainDestination: issuingChainWallet.address,
        Amount: "10000",
        XChainBridge: xchainbridge as XChainBridge,
        XChainClaimID: claimID as string,
      },
      { autofill: true, wallet: lockingChainWallet }
    );

    console.log(xchaincommit);

    // const xchainclaim = await issuingChainClient.submitAndWait(
    //   {
    //     TransactionType: "XChainClaim",
    //     Account: issuingChainWallet.address,
    //     Destination: issuingChainWallet.address,
    //     Amount: "10000",
    //     XChainBridge: xchainbridge as XChainBridge,
    //     XChainClaimID: claimID as string,
    //   },
    //   { autofill: true, wallet: issuingChainWallet }
    // );

    // console.log(xchainclaim);
    console.log("Bridge successful");
    await lockingChainClient.disconnect();
    await issuingChainClient.disconnect();
  } catch (error) {
    throw new Error(`Error bridging XRP: ${error}`);
  }
}
