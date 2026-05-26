import {
  getDashboardSummary,
  getCategoryBreakdown,
} from "../../repositories/dashboard/dashboard.repository.js";

export const fetchDashboardData = async (user) => {
  const summary = await getDashboardSummary(user.orgId);

  const categories = await getCategoryBreakdown(user.orgId);

  return {
    summary,
    categories,
  };
};
