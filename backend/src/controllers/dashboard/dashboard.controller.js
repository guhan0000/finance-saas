import { fetchDashboardData } from "../../services/dashboard/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await fetchDashboardData(req.user);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
