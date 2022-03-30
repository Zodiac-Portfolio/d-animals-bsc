import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import { nftToUi } from "../../context/utils";
import { fetchTokenData } from "../../data/nftFunctions";
import ItemInfoPage from "./components/ItemInfoPage";
import ItemPageActionContainer from "./components/ItemPageActionContainer";
import ItemPagePresentation from "./components/ItemPagePresentation";

export default function ItemPageContainer({ collection }) {
  const [token, setToken] = useState({});
  const [{ nftContracts, wallet }] = useContractsContext();
  const [nftContract, setNftContract] = useState(
    nftContracts.find((item) => item.alias === collection)
  );
  let location = useLocation();
  let { tokenId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(tokenId);
    if (wallet !== "" && !token.owner) {
      fetchTokenData(nftContracts, collection, tokenId, wallet, location).then(
        (res) => {
          if (res !== 0) {
            setToken(res.token);
            console.log(token);
            setNftContract(nftContract);
          } else {
            //navigate("/");
          }
        }
      );
    }
  }, [
    location.pathname,
    navigate,
    token,
    wallet,
    nftContracts,
    tokenId,
    location,
    collection.alias,
    collection,
    nftContract,
  ]);
  return (
    <div className="overflow-auto h-full h-full">
      <div className="mx-auto px-16 md:mt-10 flex justify-center items-center">
        <div className="flex flex-col 2md:flex-row align-top w-full justify-evenly">
          <ItemPagePresentation detailItem={token} />

          <div className="">
            <div className="">
              <div className="font-bold mt-10 text-xl leading-24 text-white mb-4">
                Auction Info
              </div>
              <ItemPageActionContainer
                detailItem={token}
                nftContract={nftContract}
              />
            </div>
            <ItemInfoPage detailItem={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
