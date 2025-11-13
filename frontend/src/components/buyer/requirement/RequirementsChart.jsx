import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { BUYER_API_END_POINT } from "@/utils/constant";

const COLORS = ["#6A38C2", "#22C55E", "#FACC15", "#EF4444", "#3B82F6", "#A855F7"];

const RequirementsChart = () => {
  const [mandiChartData, setMandiChartData] = useState([]);
  const [trendChartData, setTrendChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${BUYER_API_END_POINT}/get-all-requirement`);
        const data = res.data;

        // ✅ 1️⃣ Aggregate by Mandi
        const mandiData = data.reduce((acc, item) => {
          const mandi = item.mandi || "Unknown";
          const needed = parseInt(item.needed) || 0;

          if (!acc[mandi]) acc[mandi] = { mandi, count: 0, totalNeeded: 0 };
          acc[mandi].count += 1;
          acc[mandi].totalNeeded += needed;
          return acc;
        }, {});
        setMandiChartData(Object.values(mandiData));

        // ✅ 2️⃣ Aggregate by Product over Time (for Line Chart)
        const timeData = {};
        data.forEach((item) => {
          const product = item.product || "Unknown";
          const needed = parseInt(item.needed) || 0;
          const date = item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : "Unknown";

          if (!timeData[date]) timeData[date] = {};
          if (!timeData[date][product]) timeData[date][product] = 0;

          timeData[date][product] += needed;
        });

        // Convert to array for recharts
        const trendArray = Object.entries(timeData).map(([date, productObj]) => ({
          date,
          ...productObj,
        }));

        setTrendChartData(trendArray);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Card className="p-6 mt-10 shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-8 text-green-700">
        📊 Buyer Requirement Analytics Dashboard
      </h2>

      {/* ✅ Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ✅ Bar Chart (By Mandi) */}
        <div className="p-4 border rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-center mb-4">Requirements by Mandi</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={mandiChartData}>
              <XAxis dataKey="mandi" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Requirements" fill="#6A38C2" radius={[10, 10, 0, 0]} />
              <Bar dataKey="totalNeeded" name="Total Needed (quintals)" fill="#22C55E" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Pie Chart (Distribution by Total Quantity) */}
        <div className="p-4 border rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-center mb-4">Distribution by Mandi (Total Quantity)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={mandiChartData}
                dataKey="totalNeeded"
                nameKey="mandi"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.mandi}
              >
                {mandiChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ Line Chart (Trend Over Time) */}
      <div className="mt-10 p-4 border rounded-2xl bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-center mb-4">
          📈 Increasing Demand Trend of Products Over Time
        </h3>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={trendChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Create a separate line for each product */}
            {trendChartData.length > 0 &&
              Object.keys(trendChartData[0])
                .filter((key) => key !== "date")
                .map((product, index) => (
                  <Line
                    key={product}
                    type="monotone"
                    dataKey={product}
                    name={product}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RequirementsChart;
