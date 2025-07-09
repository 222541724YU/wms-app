
import React, { useState } from "react";

export function Tabs({ defaultValue, children }: any) {
  return <div>{children}</div>;
}

export function TabsList({ children }: any) {
  return <div className="flex gap-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children }: any) {
  return (
    <button data-value={value} className="px-3 py-1 border rounded bg-gray-100">
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: any) {
  return <div data-tab={value}>{children}</div>;
}
