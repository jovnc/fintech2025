"use client";

import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">DINING Token Price</CardTitle>
        <CardDescription className="text-sm">
          Price and volume over time
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <Tabs
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="hour">Hourly</TabsTrigger>
            <TabsTrigger value="day">Daily</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value={timeFrame}>
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
              className="h-[40vh] min-h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getData()}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                    tickMargin={5}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `$${value}`}
                    width={40}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    width={40}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border p-2 rounded shadow-md text-xs">
                            <p className="font-bold">{label}</p>
                            <p className="text-primary">
                              Price: ${payload[0].value}
                            </p>
                            <p className="">Volume: {payload[1].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="price"
                    stroke="var(--color-price)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="volume"
                    stroke="var(--color-volume)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
