/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider.js";
import { contractActionTypes } from "../../context/contracts/contractsReducer.js";
import {
  basicFetchURI,
  classFilters,
  filterByStats,
  orderItems,
  statsFilters,
} from "../../context/utils.js";
import MarketplaceFilters from "../../components/MarketplaceFilters.js";
import OrdenableItemsContainer from "../../components/template/OrdenableItemsContainer.js";
import MarketItem from "./components/MarketItem.js";
import ButtonSelectionFilter from "../../components/filters/ButtonSelectionFilter.js";
import FilterSection from "../../components/filters/FilterSection.js";
import ClassFilterItem from "../../components/filters/ClassFilterItem.js";
import { configData } from "../../data/configData.js";
import { actionTypes } from "../../context/stateReducer.js";
import { useStateContext } from "../../context/StateProvider.js";
import { fetchMarketItemsData } from "../../data/nftFunctions.js";

export default function MarketContainer({ loadingConnection }) {
  const [filtersState, setFiltersState] = useState({
    classFilterState: {},
  });
  const [collapsedClass, setCollapseClass] = useState(true);
  const [classSelected, setClassSelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("1");
  const [{ nftContracts, wallet }] = useContractsContext();

  const [{ marketItems, marketItemsFiltered }, dispatch] = useStateContext();

  useEffect(() => {
    if (wallet !== "") {
      fetchMarketItemsData(nftContracts, wallet).then((res) => {
        dispatch({
          type: actionTypes.SET_MARKET_ITEMS,
          marketItems: res,
        });
      });
    }

    return () => {};
  }, [nftContracts, dispatch, wallet, loadingConnection]);

  return (
    <div className="flex flex-row " style={{ height: "94vh" }}>
      <div className="w-full h-full mt-4  ">
        <OrdenableItemsContainer
          itemList={marketItemsFiltered}
          ItemComponentGrid={MarketItem}
          ItemComponentList={MarketItem}
          classSelected={classSelected}
          configData={configData}
        />
      </div>
    </div>
  );
}
