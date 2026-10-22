type Props = {
  color: string;
  ratio?: string;
  radius?: string;
  children?: React.ReactNode;
};

export function CoverBlock({
  color,
  ratio = "4 / 3",
  radius = "var(--radius-lg)",
  children,
}: Props) {
  return (
    <div
      style={{
        background: color,
        aspectRatio: ratio,
        borderRadius: radius,
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
        color: "#1a1a1a",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
