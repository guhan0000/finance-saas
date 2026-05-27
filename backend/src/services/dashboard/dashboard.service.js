import {
  getDashboardSummary,
  getCategoryBreakdown,
} from "../../repositories/dashboard/dashboard.repository.js";

export const fetchDashboardData = async (user) => {
  const summary = await getDashboardSummary(user.orgId, user.userId, user.role);

  const categories = await getCategoryBreakdown(
    user.orgId,
    user.userId,
    user.role,
  );

  return {
    summary,
    categories,
  };
};
