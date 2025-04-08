// components/TextPasteAnalyzer.tsx
"use client";

import { useState } from "react";
import { parseTextTransactions } from "@/utils/parseTextTransactions";
import { categorize } from "@/utils/categorizer";
import CategoryBoard from "./CategoryBoard";
import { DragTransaction } from "./CategoryBoard";
import { v4 as uuidv4 } from "uuid"; // 고유 ID 생성용

export default function TextPasteAnalyzer() {
  const [rawText, setRawText] = useState("");
  const [transactions, setTransactions] = useState<DragTransaction[]>([]);

  console.log("transactions ", transactions);

  const handleAnalyze = () => {
    const parsed = parseTextTransactions(rawText);

    const categorized = parsed.map(
      (t): DragTransaction => ({
        ...t,
        id: uuidv4(),
        category: categorize(t.place, t.amount),
      })
    );
    setTransactions(categorized);
  };

  return (
    <div className="space-y-6">
      <textarea
        rows={10}
        placeholder="여기에 거래 내역 복사해서 붙여넣으세요"
        className="w-full p-2 border rounded"
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        분석하기
      </button>

      {transactions.length > 0 && (
        <CategoryBoard initialTransactions={transactions} />
      )}
    </div>
  );
}
