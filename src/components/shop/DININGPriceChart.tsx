"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

// Mock data for the DINING token price over time
const hourlyData = [
  { time: "00:00", price: 100, volume: 500 },
  { time: "01:00", price: 102, volume: 450 },
  { time: "02:00", price: 101, volume: 600 },
  { time: "03:00", price: 103, volume: 550 },
  { time: "04:00", price: 105, volume: 700 },
  { time: "05:00", price: 104, volume: 600 },
  { time: "06:00", price: 106, volume: 800 },
];

const dailyData = [
  { time: "Mon", price: 100, volume: 5000 },
  { time: "Tue", price: 102, volume: 5500 },
  { time: "Wed", price: 105, volume: 6000 },
  { time: "Thu", price: 103, volume: 5800 },
  { time: "Fri", price: 106, volume: 6200 },
  { time: "Sat", price: 108, volume: 6500 },
  { time: "Sun", price: 110, volume: 7000 },
];

const monthlyData = [
  { time: "Jan", price: 100, volume: 150000 },
  { time: "Feb", price: 105, volume: 160000 },
  { time: "Mar", price: 110, volume: 170000 },
  { time: "Apr", price: 108, volume: 165000 },
  { time: "May", price: 112, volume: 175000 },
  { time: "Jun", price: 115, volume: 180000 },
  { time: "Jul", price: 118, volume: 190000 },
];

type TimeFrame = "hour" | "day" | "month";

export function DININGPriceChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("day");

  const getData = () => {
    switch (timeFrame) {
      case "hour":
        return hourlyData;
      case "day":
        return dailyData;
      case "month":
        return monthlyData;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>DINING Token Price</CardTitle>
        <CardDescription>Price and volume over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end space-x-2">
          <Button
            variant={timeFrame === "hour" ? "default" : "outline"}
            onClick={() => setTimeFrame("hour")}
          >
            Hourly
          </Button>
          <Button
            variant={timeFrame === "day" ? "default" : "outline"}
            onClick={() => setTimeFrame("day")}
          >
            Daily
          </Button>
          <Button
            variant={timeFrame === "month" ? "default" : "outline"}
            onClick={() => setTimeFrame("month")}
          >
            Monthly
          </Button>
        </div>
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(var(--chart-1))",
            },
            volume: {
              label: "Volume",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getData()}>
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="var(--color-volume)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
