import React from "react";
import StatWrapper from "./StatWrapper";

export default function ItemInfoPage({ detailItem }) {
  return (
    <div className="flex flex-col h-100">
      <div className="">
        <div className="font-bold text-xl leading-24 text-white mb-4">
          About
        </div>
        <div className="py-4 px-4 sm:px-4 sm:py-4 bg-color-bg-4 bg-bg-4 rounded-lg">
          <div className="flex items-start justify-start"></div>
          <div className="">
            <div className="text-bg-1 font-bold leading-14 text-lg tracking-1 uppercase">
              {detailItem?.name}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-bg-1 font-bold leading-14 text-xs tracking-1 uppercase">
              Owner
            </div>

            <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
              ({detailItem?.owner})
              <small className="text-bg-2 truncate"></small>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-bg-1 w-75 font-bold leading-14 text-xs tracking-1 uppercase">
              Description
            </div>
            <div className="mt-2 text-sm leading-20 flex items-center cursor-pointer">
              {detailItem?.description}
            </div>
          </div>
          {detailItem?._class?.icon && (
            <div className="mt-6">
              <div className="text-bg-1 font-bold leading-14 text-xs tracking-1 uppercase">
                Class
              </div>

              <div className="mt-2 text-lg leading-20 truncate flex items-center cursor-pointer">
                {detailItem?._class?.icon}
                <div className="ml-2">{detailItem?._class?.text}</div>
                <small className="text-bg-2 truncate"></small>
              </div>
            </div>
          )}
        </div>
      </div>

      {detailItem?.stats !== undefined && (
        <div className="mt-10">
          <div className="font-bold text-xl leading-24 text-white mb-2">
            Stats
          </div>

          <div
            className="
            flex flex-wrap
            justify-between
            py-2 px-2 pb-0
            sm:pt-4 sm:pb-4 sm:px-4
            rounded-lg bg-bg-4"
          >
            {detailItem?.stats?.map((stat) => {
              return <StatWrapper key={Math.random(0, 99999)} stat={stat} />;
            })}
          </div>
        </div>
      )}

      {/** EXTRA COMPONENTS */}
    </div>
  );
}
