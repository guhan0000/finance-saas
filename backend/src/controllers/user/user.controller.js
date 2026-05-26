import {
  createUserByAdmin,
  fetchUsers,
} from "../../services/user/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserByAdmin(req.body, req.user);

    res.status(201).json({
      message: "User created",

      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers(req.user);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
