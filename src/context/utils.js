/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import { configData } from "../data//configData";

export const statsFilters = [];
export const basicFetchURI = async (item, collection) => {
  const tokenURI = item[2];
  let result = [];

  await axios.get(tokenURI).then((res) => {
    if (res.status === 200) {
      const { name, description, keyvalues, image } = res.data;
      const _class = res.data["class"];
      let _item = {
        collection: collection,
        tokenId: parseInt(item[0].toHexString().toString(16)),
        itemURI: tokenURI,
        image: image,
        name: name,
        _class: _class,
        description: description,

        stats: keyvalues,
        price: parseFloat(formatEther(item[6])),
        owner: item[4],
        forSale: formatEther(item[6]) > 0.0 ? true : false,
      };
      result = _item;
    } else {
    }
  });
  return result;
};

export const changeChainCorrect = async () => {
  let { chainId, name, rpcUrl, coinCurrency, coinIcon } = configData.chainInfo;
  chainId = "0x" + chainId.toString(16);

  //Comprobar si esta creada MUMBAI

  //SI no ho esta fer wallet_addEthereumChain

  const created = await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: chainId,
        chainName: name,
        nativeCurrency: {
          name: name,
          symbol: coinCurrency, // 2-6 characters long
          decimals: 18,
        },
        rpcUrls: [rpcUrl],
      },
    ],
  });
  if (created) {
  } else {
  }
};

// TEMPLATE - CODE YOUR OWN UTILS

export const getUIdataForClass = (clss) => {
  const configClass = configData.nftCollection.nftTypes;
  const configObj = configClass.find(
    (cl) => cl.text.toUpperCase() === clss.toUpperCase()
  );

  if (configObj) {
    return {
      icon: <Icon icon={configObj.icon} color={configObj.color} />,
      text: configObj.text.toUpperCase(),
    };
  }

  return {};
};

export const nftToUi = (nftData) => {
  const {
    description,
    forSale,
    image,
    itemURI,
    name,
    owner,
    price,
    stats,

    _class,
  } = nftData;

  return {
    ...nftData,
    _class: configData.nftCollection.nftTypes
      ? getUIdataForClass(_class)
      : undefined,
  };
};

export const getClassIcon = (classString) => {
  switch (classString) {
    case "KILLER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          icon={"mdi:knife-military"}
          color={"white"}
        />
      );
    case "SHOOTER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:bow-arrow"}
          color={"white"}
        />
      );
    case "TANK":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:shield-account"}
          color={"white"}
        />
      );
    case "SUPPORT":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:bottle-tonic-plus"}
          color={"white"}
        />
      );
    case "PIRATE":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:skull-crossbones"}
          color={"white"}
        />
      );
    case "RIDER":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:horse-variant"}
          color={"white"}
        />
      );
    case "MAGE":
      return (
        <Icon
          style={{ fontSize: "32px" }}
          className="text-xl"
          icon={"mdi:auto-fix"}
          color={"white"}
        />
      );
    default:
      return;
  }
};

const compareLower = (a, b) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
};
const compareHigher = (a, b) => {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
};
const compareHigherId = (a, b) => {
  if (a.tokenId > b.tokenId) {
    return -1;
  }
  if (a.tokenId < b.tokenId) {
    return 1;
  }
  return 0;
};

const compareLowerId = (a, b) => {
  if (a.tokenId < b.tokenId) {
    return -1;
  }
  if (a.tokenId > b.tokenId) {
    return 1;
  }
  return 0;
};

export const orderItems = (value, itemsToOrder, setValue) => {
  if (setValue) {
    setValue(parseInt(value));
  }

  switch (value) {
    case "1":
      return itemsToOrder.sort(compareLower);

    case "2":
      return itemsToOrder.sort(compareHigher);

    case "3":
      return itemsToOrder.sort(compareHigherId);
    case "4":
      return itemsToOrder.sort(compareLowerId);
    default:
      return itemsToOrder;
  }
};
