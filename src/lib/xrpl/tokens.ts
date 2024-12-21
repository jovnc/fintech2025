import { getClient } from "./xrplClient";
import xrpl from "xrpl";

// Create dining credits in issuing wallet
async function issueDiningCredits(
  issuingWallet: xrpl.Wallet,
  currencyCode: string
) {
  const client = getClient();
  await client.connect();

  const tx = {
    TransactionType: "Payment",
    Account: issuingWallet.address,
    Destination: issuingWallet.address,
    Amount: {
      currency: currencyCode,
      value: "1000000", // Total supply
      issuer: issuingWallet.address,
    },
  };

  const prepared = await client.autofill(tx as xrpl.Payment);
  const signed = issuingWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  if (result.result.meta?.TransactionResult === "tesSUCCESS") {
    console.log(`${currencyCode} issued successfully!`);
  } else {
    console.error("Failed to issue Dining Credits:");
  }

  await client.disconnect();
}

// Set trustline between issuing wallet and user wallet
export async function setTrustLine(
  userWallet: xrpl.Wallet,
  issuingWallet: xrpl.Wallet,
  currencyCode: string
) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const tx = {
    TransactionType: "TrustSet",
    Account: userWallet.address,
    LimitAmount: {
      currency: currencyCode,
      issuer: issuingWallet.address,
      value: "1000",
    },
  };

  const prepared = await client.autofill(tx);
  const signed = userWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Trust line set successfully!");
  } else {
    console.error(
      "Failed to set trust line:",
      result.result.meta.TransactionResult
    );
  }

  await client.disconnect();
}

// Create sell offer for Dining Credits
async function createSellOffer(
  userWallet: xrpl.Wallet,
  issuingWallet: xrpl.Wallet,
  currencyCode: string
) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const tx = {
    TransactionType: "OfferCreate",
    Account: userWallet.address,
    TakerGets: {
      currency: currencyCode,
      issuer: issuingWallet.address,
      value: "100", // Amount of Dining Credits to sell
    },
    TakerPays: xrpl.xrpToDrops("10"), // Price in XRP
  };

  const prepared = await client.autofill(tx);
  const signed = userWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Sell offer created successfully!");
  } else {
    console.error(
      "Failed to create sell offer:",
      result.result.meta.TransactionResult
    );
  }

  await client.disconnect();
}

// Create buy offer for Dining Credits
async function createBuyOffer(
  userWallet: xrpl.Wallet,
  issuingWallet: xrpl.Wallet,
  currencyCode: string
) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const tx = {
    TransactionType: "OfferCreate",
    Account: userWallet.address,
    TakerGets: xrpl.xrpToDrops("10"), // Price in XRP
    TakerPays: {
      currency: currencyCode,
      issuer: issuingWallet.address,
      value: "100", // Amount of Dining Credits to buy
    },
  };

  const prepared = await client.autofill(tx);
  const signed = userWallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Buy offer created successfully!");
  } else {
    console.error(
      "Failed to create buy offer:",
      result.result.meta.TransactionResult
    );
  }

  await client.disconnect();
}

createBuyOffer(userWallet, issuingWallet, "DINING");
