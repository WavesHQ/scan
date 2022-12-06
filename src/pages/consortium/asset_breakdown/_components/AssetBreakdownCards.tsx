import { NumericFormat } from "react-number-format";
import classNames from "classnames";
import BigNumber from "bignumber.js";
import { AssetBreakdownInfo } from "@defichain/whale-api-client/dist/api/consortium";
import { CardList } from "@components/commons/CardList";
import { getAssetIcon } from "@components/icons/assets/tokens";

export function AssetBreakdownCards({
  assets,
}: {
  assets: AssetBreakdownInfo[];
}): JSX.Element {
  return (
    <CardList>
      {assets.map((groupedAsset, index) => (
        <AssetBreakdownCard asset={groupedAsset} key={index} />
      ))}
    </CardList>
  );
}

export function AssetBreakdownCard({
  asset,
}: {
  asset: AssetBreakdownInfo;
}): JSX.Element {
  const AssetIcon = getAssetIcon(asset.tokenSymbol);

  return (
    <CardList.Card testId="AssetBreakdownCard">
      <CardList.Header isToggleDisplayed={false}>
        <div className={classNames("flex", {})}>
          <AssetIcon className="h-8 w-8" />
          <span className="ml-2 text-2xl font-medium text-gray-900 dark:text-dark-gray-900">
            {asset.tokenDisplaySymbol}
          </span>
        </div>
      </CardList.Header>

      <CardList.List>
        {asset.memberInfo.map((member, index) => {
          const isLastItem = index === asset.memberInfo.length - 1;
          const isFirstItem = index === 0;
          return (
            <div
              key={`${asset.tokenDisplaySymbol}-${member.name}`}
              className={classNames("text-gray-900 dark:text-dark-gray-900", {
                "border-b border-gray-100 dark:border-gray-700":
                  index !== asset.memberInfo.length - 1,
                "pb-4": isLastItem,
                "pb-10": !isLastItem,
                "pt-6": !isFirstItem,
              })}
            >
              <div className="text-lg font-semibold">{member.name}</div>

              <CardRowItem
                header="Minted"
                value={new BigNumber(member.minted).toFixed(8)}
                subValue={`${member.minted}`}
              />
              <CardRowItem
                header="Burned"
                value={new BigNumber(member.burned).toFixed(8)}
                subValue={`${member.burned}`}
              />
            </div>
          );
        })}
      </CardList.List>
    </CardList.Card>
  );
}

function CardRowItem({
  header,
  value,
  subValue,
}: {
  header: string;
  value: string;
  subValue: string;
}): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-2">{header}</div>
      <NumericFormat
        value={new BigNumber(value).toFixed(8)}
        fixedDecimalScale
        thousandSeparator=","
        displayType="text"
        className="font-semibold"
      />
      <NumericFormat
        value={new BigNumber(subValue).toFixed(8)}
        fixedDecimalScale
        thousandSeparator=","
        prefix="≈$"
        displayType="text"
        className="text-sm text-gray-500 dark:text-gray-400"
      />
    </div>
  );
}
