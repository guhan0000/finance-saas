import { fetchCategories } from "../../services/category/category.service.js";
import {
  addCategory,
  removeCategory,
} from "../../services/category/category.service.js";

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

export const create = async (req, res) => {
  try {
    const category = await addCategory(req.body.name, req.user);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await removeCategory(req.params.id, req.user);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
