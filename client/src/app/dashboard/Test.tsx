import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
// import { useGerDashboardMetricsQuery } from "@/state/api";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Test = () => {
  // const { data, isLoading } = useGerDashboardMetricsQuery();
  // const expenseData = data?.expenseSummary || [];

  //      expenseData[expenseData.length - 1] || null
  //      numbers = [1, 2, 3, 4, 5]
  //      numbers.length = 5
  //      numbers.length - 1 = 5 - 1 = 4 (last index)
  //      numbers[4] = 5
  //      || null = if array is empty, it returns null instead  of undefined

  // const lastDataPoint = expenseData[expenseData.length - 1] || null;

  // const data = [
  //   { date: "2024-02-01", sales: 10, profit: 5 },
  //   { date: "2024-02-02", sales: 15, profit: 8 },
  //   { date: "2024-02-03", sales: 7, profit: 2 },
  // ];
  const data = [
    { date: "2024-02-01", product: "sekiro", sales: 10, profit: 5 },
    { date: "2024-02-02", product: "Final Fantacy", sales: 15, profit: 8 },
    { date: "2024-02-03", product: "Dark Souls", sales: 7, profit: 3 },
  ];

  const expenseData = data || [];
  const lastDataPoint = expenseData[data.length - 1] || null;

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {/* {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : ( */}
      <>
        {/* header */}
        <div className="text-lg font-semibold mb-2 px-7 pt-5">Test chart</div>

        <hr />

        <h1 className="text-xl">
          {lastDataPoint ? numeral(lastDataPoint.sales).format("$0.00a") : "0"}
        </h1>
        {lastDataPoint && (
          <p
            className={`text-sm ${
              lastDataPoint.profit! >= 0
                ? "text-green-500"
                : "text-red-500"
            } flex ml-3`}
          >{lastDataPoint.profit! >= 0 ? (
            <TrendingUp className="w-5 h-5 mr-1" />
          ) : (
            <TrendingDown className="w-5 h-5 mr-1" />
          )}
          {Math.abs(lastDataPoint.profit!)}%</p>
        )}

        <ResponsiveContainer width="100%" height={200} className="p-2">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 45 }}
          >
            <XAxis
              dataKey="date"
              tick={{ fill: "blue", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
              angle={-10}
            />

            {/* <YAxis />
             */}
            <YAxis
              tick={{ fill: "red", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 20]}
            />

            {/* <Tooltip /> */}
            <Tooltip
              formatter={(value) => `$${value.toLocaleString("en")}`}
              // labelFormatter={(label) => new Date(label).toDateString()}
              itemStyle={{ color: "red" }}
              labelFormatter={(label) => {
                const date = new Date(label);

                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                });
              }}
            />

            {/* Sales Chart */}
            {/* Area chart with sales data */}
            <Area
              dataKey="sales"
              stroke="green"
              fill="lightblue"
              type="monotone"
              dot={true}
              strokeWidth={2}
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
      {/* )} */}
    </div>
  );
};

export default Test;
