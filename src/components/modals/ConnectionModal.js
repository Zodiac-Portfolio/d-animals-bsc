import React from "react";
import { changeChainCorrect } from "../../context/utils";
import MetamaskActionButton from "./../template/MetamaskActionButton";
import BasicModal from "./BasicModal";
import { configData } from "../../data//configData";

// TEMPLATE - CODE YOUR OWN CONNECTION MODAL

export default function ConnectionModal({ showModal, handleCloseModal }) {
  return (
    <BasicModal handleCloseModal={handleCloseModal} showModal={showModal}>
      <>
        <h1 className="text-xl text-white">
          You are in the incorrect Network!
        </h1>
        <div className=" flex my-5 items-center text-white">
          <div className="mr-5 md:text-xs">
            Please, switch the network to {configData.chainInfo.name}
          </div>
          <MetamaskActionButton
            text={"Connect"}
            _onClick={() => changeChainCorrect()}
          />
        </div>
      </>
    </BasicModal>
  );
}
