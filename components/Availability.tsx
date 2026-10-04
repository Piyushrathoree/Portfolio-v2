import Link from "next/link";

export function Availability() {
  return (
    <div>
      <Link href="/contact" className="availability">
        <span className="availability-signal" aria-hidden="true" />
        <span className="availability-copy">Actively looking for opportunities</span>
      </Link>
    </div>
  );
}
