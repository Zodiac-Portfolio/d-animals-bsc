// DEFAULTS - TO WORK
import logo from "../assets/logo.png";
import pattern from "../assets/bg-pattern.png";
export const configData = {
  chainInfo: {
    name: "Binance Smart Testnet",
    rpcUrl:
      "https://speedy-nodes-nyc.moralis.io/c8fd4f8f359a73105876ffb0/bsc/testnet",
    chainId: 97,
    coinCurrency: "BNB",
    coinIcon: "simple-icons:binance",
    color: "#F0BD19",
  },
  nftCollections: {
    dturtles: {
      name: "D Turtles",
      alias: "dturtles",
      contract: {
        name: "DTurtlesERC721",
        address: "0x6Ee5298a052906F82DD0E3Df0F6f03f7D2516b65",
        abi: "",
      },
      nftTypesFilters: false,
    },

    ddoggies: {
      name: "D Doggies",
      alias: "ddoggies",
      contract: {
        name: "DDoggiesERC721",
        address: "0x13e04488F30D2BEF185F99AA7CabEE502A1Bb9B7",
        abi: "",
      },
    },
    dfishies: {
      name: "D Fishies",
      alias: "dfishies",
      contract: {
        name: "DFishies",
        address: "0x94ba7d3b3dEc43B5d6c94887eB8BE350D6042d01",
        abi: "",
      },
    },
  },
  pages: [
    {
      name: "Profile",
      icon: "map:storage",
      route: "/profile/inventory",
    },
    {
      name: "Marketplace",
      icon: "map:grocery-or-supermarket",
      route: "/",
    },
  ],
  project: {
    logo: logo,
  },
  style: {
    background: {
      pattern: {
        img: pattern,
      },
    },
  },
};
