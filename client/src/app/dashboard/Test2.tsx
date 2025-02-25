// import { useGerDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import numeral from "numeral";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Test2 = () => {
  const salesSummary = [
    {
      salesSummaryId: "9234a776-e6ac-46e2-bc24-c959ce216751",
      totalValue: 4754106.83,
      changePercentage: 61.51,
      date: "2023-03-18T22:32:25Z",
    },
    {
      salesSummaryId: "e5648831-7d0e-4ef5-8e04-f6e6a0eaafb1",
      totalValue: 1512948.97,
      changePercentage: -2.28,
      date: "2023-09-03T13:50:20Z",
    },
    {
      salesSummaryId: "785d33be-a1d8-47a6-b1d3-779942196b5c",
      totalValue: 5545737.54,
      changePercentage: -55.29,
      date: "2023-07-28T13:16:27Z",
    },
  ];

  const salesData = salesSummary || [];
  const [timeFrame, setTimeFrame] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Sales Summary</h2>
        <hr />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6 px-7 mt-5">
          <div className="text-lg font-medium">
            <p className="text-xs text-gray-400">Value</p>
            <span className="text-2xl font-extrabold">
              {totalValueSum ? numeral(totalValueSum).format("$0.00a") : "0"}
            </span>
            <span className="text-green-500 text-sm ml-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {averageChangePercentage.toFixed(2)}%
            </span>
          </div>
          <select
            className="shadow-sm border border-gray-300 bg-white p-2 rounded"
            value={timeFrame}
            onChange={(e) => {
              setTimeFrame(e.target.value);
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {/* Chart */}

        <ResponsiveContainer width={"100%"} height={350} className={"px-7"}>
          <BarChart
            data={salesData}
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="" vertical={false} />
            <XAxis
              dataKey={"date"}
              // tickFormatter={(value) => {
              //   const date = new Date(value);
              //   return `${date.getMonth() + 1} / ${date.getDate()}`;
              // }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-Us", {
                  month: "numeric",
                  day: "numeric"
                })
              }}
            />
            <YAxis tickFormatter={(value) => numeral(value).format("$0a")} />

            {/* <YAxis
              tickFormatter={(value) => {
                return `$${numeral(value).format("0a")}`;
              }}
            /> */}
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              }}
            />
            <Bar
              dataKey="totalValue"
              fill="#3182ce"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <br />

      {/* FOOTER */}
      <div>
        <hr />
        <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
          <p>{salesData.length || 0} Days</p>
          <p className="text-sm">
            Hugest Sales Date: {" "}
            <span className="font-bold">
              {highestValueDate}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Test2;
