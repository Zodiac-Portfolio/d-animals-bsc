import { Icon } from "@iconify/react";
import React from "react";
import { configData } from "../../../data/configData.js";
import { useContractsContext } from "../../../context/contracts/ContractProvider.js";

export default function ProfileSidebar({ responsive }) {
  const [{ wallet, balance }] = useContractsContext();

  return (
    <div className="flex flex-row 2sm:flex-col flex-none bg-secondary-6 bg-opacity-90  w-full 2sm:w-fit 2sm:h-full">
      {responsive === false && (
        <div className="w-full flex flex-col pt-6 px-12">
          <div className="rounded w-full pt-5 pb-5 px-2 border border-bg-3 text-center">
            <div className="flex justify-center items-center">
              <div className="flex items-center">
                <h4 className="mr-4 text-lg font-medium">
                  {wallet.substring(0, 4)}...
                  {wallet.substring(wallet.length - 4)}
                </h4>
                <div className="hover:cursor-pointer">
                  <Icon icon="bx:bx-edit" color="white" />
                </div>
              </div>
            </div>
            <small className="block mt-4 mb-4 text-bg-2 font-medium truncate"></small>
            <button className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-bg-2 hover:border-[#a1a6b6] active:border-bg-3 bg-bg-5 hover:bg-bg-4 active:bg-secondary-6">
              <span className="visible">
                <div className="flex items-center">
                  <Icon
                    icon={configData.chainInfo.coinIcon}
                    color={configData.chainInfo.color}
                  />
                  <span className="ml-2">
                    {balance} {configData.chainInfo.coinCurrency}
                  </span>
                </div>
              </span>
            </button>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-row 2sm:flex-col justify-evenly 2sm:justify-start w-full pt-2">
        <a
          className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer bg-bg-3"
          href="/profile/inventory/"
        >
          <Icon icon="ic:round-inventory-2" color="white" />
          <h6 className="hidden ml-2 text-sx 2sm:flex">Inventory</h6>
        </a>
        <a
          className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-not-allowed"
          href="/profile/activity/"
          style={{ opacity: 0.3 }}
        >
          <Icon icon="ph:activity-bold" color="white" />
          <h6 className="hidden ml-2 text-sx 2sm:flex">Activity</h6>
        </a>

        <a
          className="relative mt-4 px-2 py-4 rounded flex flex-row items-center cursor-pointer cursor-not-allowed"
          href="/profile/inventory/axie/"
          style={{ opacity: 0.3 }}
        >
          <Icon icon="ci:settings-filled" color="white" />
          <h6 className="hidden ml-2 text-sx 2sm:flex">Account Settings</h6>
        </a>
      </div>
    </div>
  );
}
