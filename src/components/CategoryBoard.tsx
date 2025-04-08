// components/CategoryBoard.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type Dragtransaction = {
  id: string; // 고유값 필요 (예: uuid)
  date: string;
  place: string;
  amount: string;
  category: string;
};

type Props = {
  initialTransactions: Dragtransaction[];
};

const allCategories = [
  "식비",
  "교통",
  "구독",
  "공과금",
  "의류",
  "의료",
  "여가",
  "간편결제",
  "기타",
];

export default function CategoryBoard({ initialTransactions }: Props) {
  const [dragTransactions, setDragTransactions] =
    useState<Dragtransaction[]>(initialTransactions);

  // Prop이 바뀔 경우에도 반영되도록
  useEffect(() => {
    setDragTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // 드롭 대상이 항목이 아닌 컬럼이면 over.id는 string (카테고리 이름)
    const isDroppingOnCategory = allCategories.includes(overId);

    if (isDroppingOnCategory) {
      const newCategory = String(over.id);
      setDragTransactions((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, category: newCategory } : t
        )
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCategories.map((category) => {
          const items = dragTransactions.filter((t) => t.category === category);
          const total = items.reduce((sum, t) => {
            const raw = t.amount.replace(/,/g, "");
            const value = parseInt(raw, 10);
            return sum + (isNaN(value) ? 0 : value);
          }, 0);

          return (
            <CategoryColumn
              key={category}
              id={category}
              items={items}
              total={total}
            />
          );
        })}
      </div>
    </DndContext>
  );
}

function CategoryColumn({
  id,
  items,
  total,
}: {
  id: string;
  items: Dragtransaction[];
  total: number;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded transition-all min-h-[120px] flex flex-col relative ${
        isOver ? "bg-blue-100 border-blue-400" : "bg-gray-50"
      }`}
    >
      <h3 className="font-bold mb-2">
        📁 {id}: {total.toLocaleString()}원
      </h3>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        {/* ✅ 항상 drop 가능한 전체 영역 확보 + 마지막 항목 아래에 공간 추가 */}
        <div className="space-y-4 flex-1 w-full min-h-[96px] pb-16">
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function DraggableItem({ item }: { item: Dragtransaction }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-3 rounded shadow cursor-move"
    >
      {item.date} - {item.place} - {item.amount}원
    </div>
  );
}
