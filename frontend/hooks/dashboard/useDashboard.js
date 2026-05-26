"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardData } from "@/services/dashboard/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: getDashboardData,
  });
};
