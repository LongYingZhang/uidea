type Props = {
  className?: string;
};

/** Static brand mark — wordmark with bulb baked into the asset. */
export function BrandLogo({ className = "h-8 w-auto" }: Props) {
  return (
    <img
      src="uidea-logo.png?v=2"
      alt="Uidea"
      width={50}
      height={42}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
