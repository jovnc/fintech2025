import { decodeAccountID } from "ripple-address-codec";

export function convertRippleToEthereum(rippleAddress: string) {
  try {
    // Decode the classic Ripple address (Base58) into a 20-byte public key hash
    const publicKeyHash = decodeAccountID(rippleAddress);

    // Convert the public key hash to a hexadecimal Ethereum-style address
    const ethereumAddress = `0x${Buffer.from(publicKeyHash).toString("hex")}`;
    return ethereumAddress;
  } catch (error) {
    throw new Error(
      `Error converting Ripple address to Ethereum style: ${error}`
    );
  }
}
