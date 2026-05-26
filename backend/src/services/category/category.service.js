import { getCategories } from "../../repositories/category/category.repository.js";

export const fetchCategories = async (user) => {
  return getCategories(user.orgId);
};
