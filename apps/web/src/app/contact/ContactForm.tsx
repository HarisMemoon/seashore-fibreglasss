import { SharedContactForm } from "@/components/SharedContactForm";

/**
 * Contact page form — now a thin wrapper around the shared form
 * component (light variant), so the contact page and the home page
 * use exactly the same form implementation.
 */
export function ContactForm() {
  return (
    <SharedContactForm
      variant="light"
      source="contact"
      idPrefix="contact"
      formId="contact-form"
      heading="Send a message"
      subheading="We reply the same day or next morning."
    />
  );
}
