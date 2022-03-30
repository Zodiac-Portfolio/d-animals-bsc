import "./App.css";
import Navbar from "./components/template/Navbar";
import { useState } from "react";
import { useContractsContext } from "./context/contracts/ContractProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketContainer from "./pages/market/MarketContainer.js";
import ProfileContainer from "./pages/profile/ProfileContainer.js";
import ItemPageContainer from "./pages/itemPage/ItemPageContainer.js";
import ReactModal from "react-modal";
import ConnectionModal from "./components/modals/ConnectionModal";
import { contractActionTypes } from "./context/contracts/contractsReducer";
import useChain from "./hooks/useChain";
import useAccount from "./hooks/useAccount";
import { configData } from "./data/configData";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(10, 11, 15, 0.99)";
ReactModal.defaultStyles.content.background = "#3a3f50";
ReactModal.defaultStyles.content.width = "max-content";
ReactModal.defaultStyles.content.height = "fit-content";
ReactModal.defaultStyles.content.margin = "auto";

function App() {
  const [, dispatch] = useContractsContext();
  const { loadingConnection, wallet, balance } = useAccount(
    dispatch,
    contractActionTypes.SET_WALLET
  );
  const { correctChain } = useChain(loadingConnection);
  const [showModal, setShowModal] = useState(correctChain);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`App ${configData.style.background.pattern ? "" : "bg-bg-5"}`}
      style={{
        backgroundImage: configData.style.background.pattern
          ? `url("${configData.style.background.pattern.img}"`
          : "none",
      }}
    >
      <BrowserRouter>
        {!loadingConnection ? (
          <>
            {" "}
            <Navbar wallet={wallet} balance={balance} />
            {!correctChain && !loadingConnection && (
              <ConnectionModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
              />
            )}
            {wallet !== "" && correctChain && (
              <Routes>
                <Route
                  path="profile/inventory"
                  element={<ProfileContainer />}
                />

                {Object.keys(configData.nftCollections).map((col) => {
                  return (
                    <Route
                      key={Math.random(1, 9999999)}
                      path={`token/${configData.nftCollections[
                        col
                      ].alias.toLowerCase()}/:tokenId`}
                      element={<ItemPageContainer collection={col} />}
                    />
                  );
                })}

                <Route
                  path=""
                  element={
                    <MarketContainer loadingConnection={loadingConnection} />
                  }
                />
              </Routes>
            )}
          </>
        ) : (
          <></>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
