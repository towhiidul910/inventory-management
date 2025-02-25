"use client";

import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";
// import Test from "./Test";
// import Test2 from "./Test2";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />

      {/* <Test/> */}
      <CardExpenseSummary />
      {/* <Test2/> */}
      {/* <div className=" md:row-span-1 xl:row-span-2 bg-gray-500"></div> */}
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[{
          title: "Customer Growth",
          amount: "175.00",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Expenses",
          amount: "10.00",
          changePercentage: -56,
          IconComponent: TrendingDown,
        }]}
      />
       <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[{
          title: "Dues",
          amount: "250",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Expenses",
          amount: "27.00",
          changePercentage: 56,
          IconComponent: TrendingDown,
        }]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[{
          title: "Dues",
          amount: "250",
          changePercentage: 69,
          IconComponent: TrendingUp,
        },
        {
          title: "Expenses",
          amount: "27.00",
          changePercentage: 96,
          IconComponent: TrendingDown,
        }]}
      />
      {/* <div className=" md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className=" md:row-span-1 xl:row-span-2 bg-gray-500"></div> */}
    </div>
  );
};

export default Dashboard;
