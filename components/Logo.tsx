import Image from "next/image";

/** Square brand mark (company/product logo) on a white backing with a hairline border. */
export function Logo({
  src,
  alt,
  size = 20,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white ${className}`}
      style={{ width: size, height: size, padding: Math.round(size * 0.12) }}
    >
      <Image src={src} alt={alt} width={size} height={size} className="h-full w-full object-contain" />
    </span>
  );
}
