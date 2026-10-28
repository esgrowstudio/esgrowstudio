import { Link, useLocation } from "react-router-dom";
import InquiryForm from "../components/InquiryForm.jsx";
import ParallaxImage from "../components/ParallaxImage.jsx";
import { contact } from "../data/contact.js";
export default function ContactPage() {
  const { search } = useLocation();
  return (
    <div className="premium-contact">
      <section className="pc-heading page-wrap">
        <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
        <h1>
          Your next chapter.
          <br />
          <em>Let’s talk it through.</em>
        </h1>
        <div className="pc-heading-bottom">
          <p>
            A new idea, a website that needs more care, or marketing that isn’t
            connecting. Wherever you are, we’re ready to listen.
          </p>
          <a className="text-link" href="#project-inquiry">
            Tell us what you have in mind ↓
          </a>
        </div>
      </section>
      <section
        className="pc-contact-grid page-wrap"
        aria-label="Ways to contact the studio"
      >
        {[
          [
            "01 / WRITE TO US",
            contact.email,
            contact.emailHref,
            "Share the idea, the challenge, or just say hello.",
          ],
          [
            "02 / CALL THE STUDIO",
            contact.phone,
            contact.phoneHref,
            "Prefer to talk? Let’s start with your questions.",
          ],
          [
            "03 / WHATSAPP BUSINESS",
            "Start a conversation",
            contact.whatsappHref,
            "A simple way to share what you’re working on.",
          ],
        ].map(([label, title, url, text]) => (
          <a
            className="pc-contact-card reveal"
            key={label}
            href={url}
            {...(url.startsWith("https")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <p className="eyebrow">{label}</p>
            <h2>
              {title}
              <span aria-hidden="true">↗</span>
            </h2>
            <p>{text}</p>
          </a>
        ))}
      </section>
      <section className="pc-main page-wrap" id="project-inquiry">
        <div className="pc-story">
          <ParallaxImage
            name="conversation-space"
            priority
            caption="SPACE FOR YOUR NEXT BIG IDEA"
          />
          <div className="pc-story-copy reveal">
            <p className="eyebrow">NO PERFECT BRIEF NEEDED</p>
            <h2>
              Bring the questions.
              <br />
              <em>We’ll bring the thinking.</em>
            </h2>
            <p>
              Tell us about your business in your own words. What’s working?
              What feels stuck? What would you love to do next? A useful
              conversation starts there.
            </p>
          </div>
          <div className="pc-next reveal">
            <p className="eyebrow">WHAT HAPPENS NEXT</p>
            {[
              [
                "We understand the context",
                "We review your message and the challenge you’re trying to solve.",
              ],
              [
                "We talk about possibilities",
                "We clarify your priorities, scope and the support you need.",
              ],
              [
                "We agree on a next step",
                "You get a clear direction before deciding how to move forward.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pc-form">
          <p className="eyebrow">YOUR IDEA STARTS HERE</p>
          <h2>
            Tell us a little
            <br />
            about your business.
          </h2>
          <p>Share what you can. We’ll work through the details together.</p>
          <InquiryForm key={search} />
        </div>
      </section>
      <section className="pc-faq page-wrap">
        <div className="reveal">
          <p className="eyebrow">BEFORE YOU SAY HELLO</p>
          <h2>
            A little clarity.
            <br />
            <em>Less second-guessing.</em>
          </h2>
          <Link className="text-link" to="/faq">
            More useful answers ↗
          </Link>
        </div>
        <div>
          {[
            [
              "What if I don’t know which service I need?",
              "That’s completely fine. Tell us the challenge—fewer enquiries, an outdated website, or an upcoming launch. We can discuss the options together.",
            ],
            [
              "Can you improve my existing website?",
              "Yes, we can review the existing experience and discuss practical improvements. We’ll agree what can be improved and whether a larger rebuild is appropriate.",
            ],
            [
              "Should I have a budget or timeline ready?",
              "A rough range helps us suggest a realistic scope. If you’re still exploring, say so in your message and we can talk through priorities.",
            ],
            [
              "How can I send you a project brief?",
              "Use the form to share the essentials, or email your brief to esgrowstudio@gmail.com. The form’s download option saves a local copy; it does not send your enquiry.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
