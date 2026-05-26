import { fetchCategories } from "../../services/category/category.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await fetchCategories(req.user);

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
