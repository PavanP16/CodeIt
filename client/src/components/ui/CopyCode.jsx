import { Snippet } from "@nextui-org/react";

export default function CopyCode({ value, size, className }) {
  return (
    <Snippet className={className} hideSymbol size={size}>
      <span>{value}</span>
    </Snippet>
  );
}
