import { Icon } from "@iconify/react";
import React from "react";
import { orderItems } from "../../context/utils";
import { useStateContext } from "../../context/StateProvider";
import { actionTypes } from "../../context/stateReducer";

export default function SortItemsFilters({
  itemsList,
  classSelected,
  orderSelected,
  setOrderSelected,
  viewSelected,
  setViewSelected,
  sortOptions,
  viewOptions,
}) {
  const [, dispatch] = useStateContext();
  const orderMarketItems = (value) => {
    // TEMPLATE - CODE YOUR OWN ORDER MARKET
    let orderedItems = orderItems(value, itemsList, setOrderSelected);

    setOrderSelected(value);

    dispatch({
      type: actionTypes.SET_MARKET_ITEMS_FILTERED,
      marketItems: orderedItems,
    });
  };

  return (
    <div className="relative flex flex-wrap justify-between flex-col-reverse xl:flex-row">
      <div className="flex justify- items-center xl:justify-center">
        <div className="flex items-center w-full justify-between xl:w-auto">
          {sortOptions !== undefined && (
            <div>
              <div className="text-left" style={{ width: "158px" }}>
                <select
                  onChange={(e) => orderMarketItems(e.target.value)}
                  className="text-white bg-secondary-6 px-2 py-2 relative rounded transition focus:outline-none border w-full text-white border-bg-2 hover:border-bg-1  bg-bg-5 hover:bg-bg-4 "
                  value={orderSelected}
                >
                  {sortOptions?.map((opt) => {
                    return (
                      <option key={Math.random(1, 99999)} value={opt.id}>
                        {opt.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
          {viewOptions !== undefined && (
            <div className="flex items-centerbtn-groups">
              <div className="flex cursor-pointer ml-8">
                <div className="control-group inline-flex flex-row horizontal">
                  {viewOptions.map((opt) => {
                    return (
                      <div
                        key={Math.random(1, 99999)}
                        onClick={() => setViewSelected(opt.text)}
                        className="border hover:border-bg-1  border-bg-2 rounded-l p-3 flex items-center justify-center border border-primary-2"
                        style={{
                          background: viewSelected === opt.text ? "blue" : "",
                        }}
                      >
                        <Icon icon={opt.icon} color="white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
