import React, { useEffect } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider.js";
import ProfileSidebar from "./components/ProfileSidebar.js";
import MarketItem from "../market/components/MarketItem.js";
import OrdenableItemsContainer from "../../components/template/OrdenableItemsContainer.js";
import { actionTypes } from "../../context/stateReducer.js";
import { useStateContext } from "../../context/StateProvider.js";
import useResponsive from "../../hooks/useResponsive";
import { fetchMyTokens } from "../../data/nftFunctions.js";
export default function ProfileContainer() {
  const size = useResponsive();
  const [{ wallet, nftContracts }] = useContractsContext();
  const [{ myItems }, dispatch] = useStateContext();

  useEffect(() => {
    if (wallet !== "") {
      fetchMyTokens(nftContracts).then((res) => {
        dispatch({
          type: actionTypes.SET_MY_ITEMS,
          myItems: res,
        });
      });
    }

    return () => {};
  }, [nftContracts, dispatch, wallet]);

  return (
    <div className="flex flex-col 2sm:flex-row h-full ">
      <ProfileSidebar responsive={size.width < 600} />
      <div className="w-full h-full mt-4  ">
        <OrdenableItemsContainer
          itemList={myItems}
          ItemComponentGrid={MarketItem}
          ItemComponentList={MarketItem}
        />
      </div>
    </div>
  );
}
