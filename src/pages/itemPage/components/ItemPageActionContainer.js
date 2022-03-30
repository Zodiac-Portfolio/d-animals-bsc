import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionModal from "../../../components/modals/ActionModal";
import MetamaskActionButton from "../../../components/template/MetamaskActionButton";
import { useContractsContext } from "../../../context/contracts/ContractProvider";
import {
  buyToken,
  putItemforSale,
  saveItemInInventory,
} from "../../../data/nftFunctions";
import { configData } from "../../../data/configData";
import { Icon } from "@iconify/react";

export default function ItemPageActionContainer({ detailItem, nftContract }) {
  const [showModal, setShowModal] = useState(false);
  const [itemBought, setItemBought] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceForItem, setPriceForItem] = useState(0.0);

  const [{ wallet, balance }] = useContractsContext();

  const navigate = useNavigate();
  const goToInventory = () => {
    navigate("/profile/inventory");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    if (!loading) {
      setShowModal(false);
    }
  };

  return (
    <div className="w-ful mb-10">
      <div className="flex  items-center p-4 w-full bg-secondary-4  sm:py-4 rounded-lg md:justify-end  ">
        <div className="text-right md:p-0">
          <div className="flex items-center p-1">
            <Icon
              icon={configData.chainInfo.coinIcon}
              color={configData.chainInfo.color}
            />
            <div className="ml-5 flex items-center">{detailItem?.price}</div>
          </div>
        </div>

        <div className="ml-7 w-full md:w-auto md:mt-0 ">
          <MetamaskActionButton
            stlye={{ display: loading ? "none" : "flex" }}
            text={
              wallet !== detailItem?.owner
                ? "Buy Item"
                : `${detailItem?.forSale ? "Save Item" : "Sell Item"}`
            }
            _onClick={handleOpenModal}
            disabled={detailItem?.price > balance}
            Modal={
              <ActionModal
                item={detailItem}
                showModal={showModal}
                action={
                  wallet !== detailItem?.owner
                    ? detailItem?.price > balance
                      ? undefined
                      : () =>
                          buyToken(
                            nftContract.contract,
                            wallet,
                            detailItem,
                            setLoading,
                            setItemBought
                          )
                    : detailItem?.forSale
                    ? () =>
                        saveItemInInventory(
                          nftContract.contract,
                          detailItem,
                          setLoading,
                          setItemBought,
                          priceForItem
                        )
                    : () =>
                        putItemforSale(
                          nftContract.contract,
                          detailItem,
                          setLoading,
                          setItemBought,
                          priceForItem
                        )
                }
                onceCompleted={goToInventory}
                handleCloseModal={handleCloseModal}
                completed={itemBought}
                inputValue={
                  wallet !== detailItem?.owner
                    ? undefined
                    : detailItem?.forSale
                    ? undefined
                    : priceForItem
                }
                setInputValue={
                  wallet !== detailItem?.owner
                    ? undefined
                    : detailItem?.forSale
                    ? undefined
                    : setPriceForItem
                }
                disabledAction={detailItem?.price > balance}
                loading={loading}
                image={detailItem?.image}
                notCompletedText={{
                  msg: `${
                    wallet !== detailItem?.owner
                      ? `Buy for ${detailItem?.price} ${configData.chainInfo.coinCurrency}`
                      : `${
                          detailItem?.forSale
                            ? "Delete item from market and save it in Inventory"
                            : "Add Item for sale"
                        }`
                  }`,
                  button: `${
                    wallet !== detailItem?.owner
                      ? `${
                          detailItem?.price > balance
                            ? "Not Enough BELLY"
                            : "Buy Item"
                        }`
                      : `${detailItem?.forSale ? "Save Item" : "Sell Item"}`
                  }
                    `,
                }}
                completedText={{
                  msg: `${
                    wallet !== detailItem?.owner
                      ? "Item Bought!"
                      : `${
                          detailItem?.forSale
                            ? "Item saved in Inventory"
                            : "Item on Sale!"
                        }`
                  }`,
                  button: "Go to Inventory",
                }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
