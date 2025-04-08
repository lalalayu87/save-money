// import ClusterCPU from "@/components/ClusterCPU";

// export default function DashboardPage() {
//   return (
//     <main className="p-6">
//       <ClusterCPU />
//     </main>
//   );
// }

"use client";

import TextPasteAnalyzer from "@/components/TextPasteAnalyzer";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">카드 명세서 분석기</h1>
      <TextPasteAnalyzer />
    </main>
  );
}
