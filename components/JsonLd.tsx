import { PROFILE, SOCIALS } from "@/data/profile";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl()}#person`,
    name: SITE_NAME,
    url: absoluteUrl(),
    jobTitle: "Software Engineer",
    description: SITE_DESCRIPTION,
    image: absoluteUrl("/opengraph-image"),
    sameAs: SOCIALS.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    email: PROFILE.email,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl()}#website`,
    name: SITE_NAME,
    url: absoluteUrl(),
    description: SITE_DESCRIPTION,
    author: { "@id": `${absoluteUrl()}#person` },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl()}#profile`,
    url: absoluteUrl(),
    name: `${SITE_NAME} — Software Engineer`,
    isPartOf: { "@id": `${absoluteUrl()}#website` },
    mainEntity: { "@id": `${absoluteUrl()}#person` },
  };

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [person, website, profilePage],
      }}
    />
  );
}
