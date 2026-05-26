"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/services/category/category.service";

export const useCategories =
  () => {
    return useQuery({
      queryKey: ["categories"],

      queryFn: getCategories,
    });
  };

export const useCreateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createCategory,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "categories",
          ],
        });
      },
    });
  };

export const useDeleteCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteCategory,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "categories",
          ],
        });
      },
    });
  };