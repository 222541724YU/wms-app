
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="border rounded shadow-sm p-4 bg-white">{children}</div>;
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
