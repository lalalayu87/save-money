// utils/parseSamsungCard.ts
import { Dragtransaction } from "@/components/CategoryBoard";

export function parseSamsungCard(text: string): Dragtransaction[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const samsungTransactions: Dragtransaction[] = [];
  let i = 0;

  while (i < lines.length) {
    const nameLine = lines[i];
    const amountLine = lines[i + 1];
    const dateLine = lines[i + 2];

    const amountMatch = amountLine?.match(/-?\d[\d,]*원/);
    const dateMatch = dateLine?.match(/\d{2}\.\d{2}/);

    if (amountMatch && dateMatch) {
      const date = `2025.${dateMatch[0].replace(".", "-")}`;
      const place = nameLine;
      const amount = amountMatch[0].replace("원", "");

      samsungTransactions.push({
        id: "", // 나중에 uuid 붙이기
        date,
        place,
        amount,
        category: "", // 나중에 categorize 함수로 분류하기
      });
      i += 3;
    } else {
      i++;
    }
  }

  return samsungTransactions;
}
