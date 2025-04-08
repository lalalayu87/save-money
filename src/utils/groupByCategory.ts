import { Transaction } from "@/utils/parseTextTransactions";

export function groupByCategory(
  transactions: (Transaction & { category: string })[]
) {
  const grouped: Record<string, (Transaction & { category: string })[]> = {};

  transactions.forEach((t) => {
    if (!grouped[t.category]) {
      grouped[t.category] = [];
    }
    grouped[t.category].push(t);
  });

  return grouped;
}
