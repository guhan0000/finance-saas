import { getCategories } from "../../repositories/category/category.repository.js";
import {
  createCategory,
  deleteCategory,
} from "../../repositories/category/category.repository.js";
export const fetchCategories = async (user) => {
  return getCategories(user.orgId);
};

export const addCategory = async (name, user) => {
  return createCategory({
    name,
    orgId: user.orgId,
  });
};

export const removeCategory = async (id, user) => {
  return deleteCategory(id, user.orgId);
};
