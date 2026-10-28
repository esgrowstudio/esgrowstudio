import { contact } from "../data/contact.js";

export default function ContactDetails({ compact = false }) {
  return (
    <address
      className={`studio-contact${compact ? " studio-contact-compact" : ""}`}
      aria-label="Esgrow Studio contact details"
    >
      <a href={contact.phoneHref}>
        <span>Call us</span>
        <strong>{contact.phone}</strong>
      </a>
      <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
        <span>WhatsApp Business ↗</span>
        <strong>{contact.phone}</strong>
      </a>
      <a href={contact.emailHref}>
        <span>Email us</span>
        <strong>{contact.email}</strong>
      </a>
    </address>
  );
}
