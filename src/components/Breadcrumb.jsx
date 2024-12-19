import Link from "next/link";

export default function Breadcrumb({ paths }) {
  return (
    <div className="mb-4 text-sm">
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && " -> "}
          {path.href ? <Link className="capitalize" href={path.href}>{path.name}</Link> : path.name}
        </span>
      ))}
    </div>
  );
}
