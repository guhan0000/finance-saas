"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/category/category.service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],

    queryFn: getCategories,
  });
};
