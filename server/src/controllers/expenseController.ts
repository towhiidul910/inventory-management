import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany( // we us the model ExpenseByCategory from schema.prisma like prisma.expenseByCategory
        {
            orderBy: {
                date: "desc",
            },
        }
    );

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
        (item) => ({
            ...item,
            amount: item.amount.toString(),
        })
    );
    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};

//This function is using the spread operator (...item) to copy all properties of item as they are and then overwrites the amount field by converting it to a string.
// { id: 1, name: "Food", amount: 2000 } -> { id: 1, name: "Food", amount: "2000" } // `amount` is now a string
