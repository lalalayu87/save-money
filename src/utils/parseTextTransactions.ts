export type Transaction = {
  date: string;
  place: string;
  amount: string;
};

export function parseTextTransactions(rawText: string): Transaction[] {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d{2}\.\d{2}/.test(line)); // 날짜로 시작하는 줄만 필터링

  const results: Transaction[] = [];

  for (const line of lines) {
    const parts = line.split(/\s{2,}|\t+/); // 공백 2칸 이상 or 탭으로 분할

    const date = parts[0];
    const place = parts[2];
    const amount = parts[3];

    if (date && place && amount) {
      results.push({ date, place, amount });
    }
  }

  return results;
}
