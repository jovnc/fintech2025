"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeFilterProps {
  onFilterChange: (period: string) => void;
}

export function TimeFilter({ onFilterChange }: TimeFilterProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const handleChange = (value: string) => {
    setSelectedPeriod(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedPeriod} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Last Week</SelectItem>
          <SelectItem value="month">Last Month</SelectItem>
          <SelectItem value="year">Last Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
