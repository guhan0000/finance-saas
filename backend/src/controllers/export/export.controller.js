import prisma from "../../config/prisma.js";

import { format } from "@fast-csv/format";

export const exportTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        orgId: req.user.orgId,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.writeHead(200, {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=transactions.csv",
    });

    const csvStream = format({
      headers: true,
    });

    csvStream.pipe(res);

    transactions.forEach((transaction) => {
      csvStream.write({
        Title: transaction.title,
        Amount: transaction.amount.toString(),
        Type: transaction.type,
        Category: transaction.category.name,
        CreatedAt: transaction.createdAt.toISOString(),
      });
    });

    csvStream.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
