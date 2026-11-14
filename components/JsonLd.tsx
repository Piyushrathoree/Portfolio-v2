import { PROFILE, SOCIALS } from "@/data/profile";
import {
  absoluteUrl,
  ALTERNATE_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ROLE,
} from "@/lib/site";

export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

const PERSON_ID = `${absoluteUrl()}#person`;

/** Compact author/publisher reference that resolves to the site-wide Person. */
export const PERSON_REF = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: absoluteUrl(),
} as const;

export function personSchema() {
  const [givenName, ...rest] = SITE_NAME.split(" ");
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    givenName,
    familyName: rest.join(" "),
    alternateName: [...ALTERNATE_NAMES],
    url: absoluteUrl(),
    jobTitle: SITE_ROLE,
    description: SITE_DESCRIPTION,
    image: absoluteUrl("/opengraph-image"),
    sameAs: SOCIALS.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    email: PROFILE.email,
    homeLocation: { "@type": "Country", name: PROFILE.location },
    knowsAbout: [
      "Software Engineering",
      "Full-stack Development",
      "Backend Development",
      "TypeScript",
      "Node.js",
      "Next.js",
      "PostgreSQL",
    ],
  };
}

/** Site-wide: who the site is about, and the site itself. */
export function JsonLd() {
  const website = {
    "@type": "WebSite",
    "@id": `${absoluteUrl()}#website`,
    name: SITE_NAME,
    alternateName: [...ALTERNATE_NAMES, "piyush.social"],
    url: absoluteUrl(),
    description: SITE_DESCRIPTION,
    author: { "@id": PERSON_ID },
  };

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [personSchema(), website],
      }}
    />
  );
}

/** Home page only: marks it as Piyush's profile page (Google ProfilePage). */
export function ProfilePageJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${absoluteUrl()}#profile`,
        url: absoluteUrl(),
        name: `${SITE_NAME} · Portfolio`,
        mainEntity: personSchema(),
      }}
    />
  );
}
