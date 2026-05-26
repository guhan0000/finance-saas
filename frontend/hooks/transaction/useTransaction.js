"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTransaction,
  getTransactions,
} from "@/services/transaction/transaction.service";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],

    queryFn: getTransactions,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};
