"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface UsageChartsProps {
  data: Array<{
    date: string;
    diningCredits: number;
    breakfastCredits: number;
  }>;
}

export function UsageCharts({ data }: UsageChartsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Breakfast Credits Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              breakfastCredits: {
                label: "Breakfast Credits",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[40vh] min-h-[200px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                  interval="preserveStartEnd"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth()}`;
                  }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                  width={40}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border p-2 rounded shadow-md text-xs">
                          <p className="font-bold">{label}</p>
                          <p className="text-primary">
                            Volume: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="breakfastCredits"
                  stroke="var(--color-breakfastCredits)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Dinner Credits Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              diningCredits: {
                label: "Dinner Credits",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[40vh] min-h-[200px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  tickMargin={5}
                  interval="preserveStartEnd"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth()}`;
                  }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                  width={40}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border p-2 rounded shadow-md text-xs">
                          <p className="font-bold">{label}</p>
                          <p className="text-primary">
                            Volume: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="diningCredits"
                  stroke="var(--color-diningCredits)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
