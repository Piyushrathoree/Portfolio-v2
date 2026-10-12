import { Fragment } from "react";
import { ContactForm } from "./ContactForm";
import { SocialPreview } from "./SocialLinks";
import type { SocialProfile } from "@/data/socials";

type ContactOption = {
  title: string;
  detail: string;
  href: string;
  external: boolean;
  /** When set, hovering the row shows a profile preview card. */
  profile?: SocialProfile;
};

export function ContactLayouts({ options, available }: {
  options: ContactOption[];
  available: boolean;
}) {
  return (
    <div className="contact-design">
      <div className="contact-heading">
        <h1>Let&apos;s talk.</h1>
        <p>Roles, collaborations, or a question about something I built — drop a line.</p>
        {available && (
          <span className="contact-availability">
            <span aria-hidden="true" /> Available for work
          </span>
        )}
      </div>
      <div className="contact-content">
        <div className="contact-methods">
          {options.map((option) => {
            const row = (
              <a
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noreferrer" : undefined}
                className="contact-method"
              >
                <span className="contact-method-title">{option.title}</span>
                <span className="contact-method-detail">{option.detail}</span>
              </a>
            );
            return option.profile ? (
              <SocialPreview
                key={option.title}
                profile={option.profile}
                className="min-w-0"
              >
                {row}
              </SocialPreview>
            ) : (
              <Fragment key={option.title}>{row}</Fragment>
            );
          })}
        </div>
        <ContactForm className="contact-form space-y-5" />
      </div>
    </div>
  );
}
