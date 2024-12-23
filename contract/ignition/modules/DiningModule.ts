import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DiningModule = buildModule("DiningModule", (m) => {
  // Deploy the DiningCreditsToken contract
  const diningCreditsToken = m.contract("DiningCreditsToken");

  // Deploy the Marketplace contract with the address of DiningCreditsToken
  const marketplace = m.contract("Marketplace", [diningCreditsToken]);

  return { diningCreditsToken, marketplace };
});

export default DiningModule;
