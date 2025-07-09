
export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border border-collapse">{children}</table>;
}
export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}
export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>;
}
export function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="text-left p-2">{children}</th>;
}
export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}
export function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-2">{children}</td>;
}
