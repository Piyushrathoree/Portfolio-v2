import { PROFILE, SOCIALS } from "@/data/profile";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
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
    name: SITE_NAME,
    url: absoluteUrl(),
    description: SITE_DESCRIPTION,
    author: { "@type": "Person", name: SITE_NAME },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
