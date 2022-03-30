import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
// eslint-disable-next-line no-unused-vars
import { basicFetchURI, orderItems } from "../context/utils";
import { dFishiesAbi, dDoggiesAbi, dTrurtlesAbi } from "./abis";
import { configData } from "./configData";

// TEMPLATE - ADD YOUR CUSTOM CONTRACT, ABIS
export const getContract = (type, signer) => {
  switch (type) {
    case "dturtles":
      return new ethers.Contract(
        configData.nftCollections.dturtles.contract.address,
        dTrurtlesAbi,
        signer
      );
    case "ddoggies":
      return new ethers.Contract(
        configData.nftCollections.ddoggies.contract.address,
        dDoggiesAbi,
        signer
      );
    case "dfishies":
      return new ethers.Contract(
        configData.nftCollections.dfishies.contract.address,
        dFishiesAbi,
        signer
      );
    // TEMPLATE - ADD YOUR CUSTOM CONTRACT, ABIS
    default:
      break;
  }
};

const _fetchMarket = async (instance) => {
  let itemsforSale = await instance.contract.getItemsForSale({});
  let res = await Promise.all(
    itemsforSale.map(async (item) => {
      return await basicFetchURI(item, instance.alias);
    })
  );
  return res;
};

const _fetchMyTokens = async (instance) => {
  let itemsforSale = await instance.contract.getMyTokens({});
  let res = await Promise.all(
    itemsforSale.map(async (item) => {
      return await basicFetchURI(item, instance.alias);
    })
  );

  return res;
};

export const fetchMarketItemsData = async (nftContracts, wallet) => {
  // TEMPLATE - CODE YOUR OWN FETCH ITEMS
  let res = [];
  let contracts = [];
  Object.keys(configData.nftCollections).forEach((key, index) => {
    contracts.push(configData.nftCollections[key].alias);
  });

  if (contracts.length === nftContracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      let items = await _fetchMarket(nftContracts[i]);
      res = [...res, ...items];
    }
  }

  return res;
};

export const fetchMyTokens = async (nftContracts) => {
  // TEMPLATE - CODE YOUR OWN FETCH ITEMS
  let res = [];
  let contracts = [];
  Object.keys(configData.nftCollections).forEach((key, index) => {
    contracts.push(configData.nftCollections[key].alias);
  });

  if (contracts.length === nftContracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      let items = await _fetchMyTokens(nftContracts[i]);
      res = [...res, ...items];
    }
  }

  return res;
};

export const fetchCollectionItems = async (nftContracts, collectionName) => {
  // TEMPLATE - CODE YOUR OWN FETCH ITEMS
  let res = [];

  let collection = nftContracts.find((item) => item.alias === collectionName);
  console.log(collection);
  const _response = await collection.contract.getItemsForSale();

  res = await Promise.all(
    _response.map(async (item) => {
      return await basicFetchURI(item, collection.alias);
    })
  );

  return res;
};

export const fetchTokenData = async (
  nftContracts,
  collectionContract,
  tokenId,
  wallet,
  location
) => {
  // TEMPLATE - CODE YOUR OWN FETCH TOKEN DATA
  let _response;
  console.log(tokenId, collectionContract, nftContracts);
  let collection = nftContracts.find(
    (item) => item.alias === collectionContract
  );
  _response = await collection.contract.allItems(tokenId);
  _response = await basicFetchURI(_response, collection.alias);
  return {
    token: _response,
    contract: nftContracts.find((item) => item.alias === collectionContract),
  };
};

export const buyToken = async (
  nftContract,
  wallet,
  detailItem,
  setLoading,
  setItemBought
) => {
  // TEMPLATE - CODE YOUR OWN BUY TOKEN

  // TO DO - ferho be
  setLoading(true);
  const _buyTokenTransaction = await nftContract.buyToken(
    wallet,
    detailItem?.tokenId,
    { value: parseEther(detailItem?.price.toString()) }
  );

  await _buyTokenTransaction.wait();

  setLoading(false);
  setItemBought(true);
};

export const saveItemInInventory = async (
  nftContract,
  detailItem,
  setLoading,
  setItemBought,
  priceForItem
) => {
  // TEMPLATE - CODE YOUR OWN SAVE IN INVENTORY
  setLoading(true);
  const transcation = await nftContract.toggleForSale(
    detailItem?.tokenId,
    parseEther(priceForItem.toString())
  );

  await transcation.wait();

  setLoading(false);

  setItemBought(true);
};

export const putItemforSale = async (
  nftContract,
  detailItem,
  setLoading,
  setItemBought,
  priceForItem
) => {
  setLoading(true);
  const transcation = await nftContract.toggleForSale(
    detailItem?.tokenId,
    parseEther(priceForItem.toString())
  );

  await transcation.wait();

  setLoading(false);

  setItemBought(true);
};

// Add al ypur functions
