import React, { useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import WalletButton from "./WalletButton";
import NavbarItem from "./NavbarItem";
import { useLocation } from "react-router-dom";
import { formatEther } from "ethers/lib/utils";
import { configData } from "../../data/configData";
import { contractActionTypes } from "../../context/contracts/contractsReducer";

export default function Navbar({ wallet, balance }) {
  const location = useLocation();
  const [{ signer, correctChain }, dispatch] = useContractsContext();

  const getWalletBalance = useCallback(async () => {
    const balance = await signer.getBalance();
    return { balance: formatEther(balance) };
  }, [signer]);

  useEffect(() => {
    if (wallet !== "") {
      if (correctChain) {
        getWalletBalance().then((res) => {
          dispatch({
            type: contractActionTypes.SET_BALANCE,
            balance: parseFloat(res.balance),
          });
        });
      }
    }
  }, [correctChain, dispatch, getWalletBalance, location.pathname, wallet]);
  return (
    <div className="sticky top-0 w-full items-start z-10  ">
      <div className="flex w-full sm:justify-between bg-bg-6 bg-opacity-90 h-fit">
        <a href="/">
          <div className="my-3 mx-6 cursor-pointer">
            <img src={configData.project.logo} alt="LOGO" width={32} />
          </div>
        </a>

        {configData.pages?.map((page) => {
          return (
            <NavbarItem
              key={Math.random(0, 999)}
              icon={page.icon}
              text={page.name}
              to={page.route}
              location={location.pathname}
              disabled={page.disabled}
            />
          );
        })}

        <div className="hidden lg:flex flex ml-auto items-center">
          <div className="px-2">
            <div className="flex flex-col items-center justify-center"></div>
          </div>
          <div className="px-2">
            <div className="hidden lg:flex items-center justify-center">
              <div className="mr-2">
                <Icon icon="entypo:wallet" color="white" />
              </div>
              <div className="flex items-center justify-center ">
                <small className="px-4">
                  {balance} {configData.chainInfo?.coinCurrency}
                </small>
                <div className="cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden 2sm:flex">
          <WalletButton wallet={wallet} />
        </div>
      </div>
    </div>
  );
}
