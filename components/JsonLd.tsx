import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SOCIAL } from "@/lib/site";

export default function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: absoluteUrl(),
    jobTitle: "Software Engineer",
    description: SITE_DESCRIPTION,
    image: absoluteUrl("/assets/erwin.jpg"),
    sameAs: [SOCIAL.twitter, SOCIAL.github, SOCIAL.linkedin],
    email: "01piyush008@gmail.com",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(),
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
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
