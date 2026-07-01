import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Privacy.css'

const CONTACT_EMAIL = 'Ohitiin@gmail.com'
const BRAND_NAME = 'A Colorful Tale'

function PolicySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="privacy-section">
      <h2 className="privacy-section-title">{title}</h2>
      <div className="privacy-section-body">{children}</div>
    </section>
  )
}

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="privacy-link">
      {children}
    </a>
  )
}

export default function Privacy() {
  useEffect(() => {
    document.title = `Privacy Policy | ${BRAND_NAME}`

    const description = `Privacy Policy for ${BRAND_NAME}, including Instagram and Meta-related services.`
    let meta = document.querySelector('meta[name="description"]')

    if (meta instanceof HTMLMetaElement) {
      meta.content = description
    } else {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      meta.setAttribute('content', description)
      document.head.appendChild(meta)
    }

    return () => {
      document.title = 'A Colorful Tale — A Film Written by Ohitiin'
    }
  }, [])

  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="privacy-header-inner">
          <p className="privacy-brand">{BRAND_NAME}</p>
          <Link to="/" className="privacy-back-link">
            Back to site
          </Link>
        </div>
      </header>

      <main className="privacy-main">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: July 1, 2026</p>

        <p className="privacy-intro">
          This Privacy Policy describes how {BRAND_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) collects, uses, discloses, and protects information when you use our
          website, related digital experiences, and optional Instagram-related features we operate in
          connection with a Meta / Instagram Business integration (including automated messaging or
          lead workflows). By using our services, you agree to this policy. If you do not agree,
          please do not use our services.
        </p>

        <PolicySection id="meta" title="Meta and Instagram platform use">
          <p>
            Where our services interact with Instagram or other Meta products, our use of Meta
            technologies is also subject to Meta&rsquo;s applicable terms, policies, and product
            documentation. For convenience, you may review Meta&rsquo;s and Instagram&rsquo;s public
            policies here:{' '}
            <ExternalLink href="https://www.facebook.com/privacy/policy">
              Meta Privacy Policy
            </ExternalLink>
            ,{' '}
            <ExternalLink href="https://privacycenter.instagram.com/policy/">
              Instagram Data Policy
            </ExternalLink>
            ,{' '}
            <ExternalLink href="https://www.facebook.com/legal/terms">
              Meta Terms of Service
            </ExternalLink>
            , and{' '}
            <ExternalLink href="https://developers.facebook.com/terms/">
              Meta Platform Terms for Developers
            </ExternalLink>
            . We use Instagram / Meta APIs and related features only as permitted for our app
            configuration, approved permissions, and documented use cases, and we do not sell your
            personal information.
          </p>
        </PolicySection>

        <PolicySection id="collect" title="Information we collect">
          <p>
            <span className="privacy-emphasis">You provide directly:</span> for example, messages
            you send us, information you submit through forms, or account details you provide for
            authorized administrative access.
          </p>
          <p>
            <span className="privacy-emphasis">Automatically:</span> for example, basic technical
            data such as device/browser type, general location derived from IP (if available),
            timestamps, and diagnostic logs needed to operate and secure the service.
          </p>
          <p>
            <span className="privacy-emphasis">From Instagram / Meta (when enabled):</span>{' '}
            depending on the permissions granted to our integration, this may include Instagram
            Business account identifiers, messaging metadata, message content in conversations with
            our Page or connected experience, participant identifiers (such as Instagram-scoped IDs
            where applicable), and profile fields made available through the APIs we use. We only
            request and retain data that is reasonably necessary to provide the features you interact
            with (for example, responding to messages, routing inquiries, and measuring basic
            engagement for operational purposes).
          </p>
        </PolicySection>

        <PolicySection id="use" title="How we use information">
          <ul className="privacy-list">
            <li>Provide, maintain, improve, and secure our website and related services.</li>
            <li>
              Operate Instagram messaging, automation, or lead-handling features you initiate or
              consent to.
            </li>
            <li>Communicate with you about the service, respond to requests, and provide support.</li>
            <li>
              Detect, investigate, and help prevent fraud, abuse, security issues, or violations of
              law or policy.
            </li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>
        </PolicySection>

        <PolicySection id="legal-bases" title="Legal bases (where applicable)">
          <p>
            If data protection laws such as the GDPR apply, we may rely on one or more of the
            following legal bases: performance of a contract, legitimate interests (for example
            securing our systems and improving reliability, balanced against your rights), consent
            where required, and compliance with legal obligations.
          </p>
        </PolicySection>

        <PolicySection id="share" title="How we share information">
          <p>
            We may share information with service providers who process data on our behalf under
            appropriate safeguards (for example hosting, infrastructure, analytics, or communications
            vendors). We may also share information when required by law, to protect rights and
            safety, or in connection with a business transfer subject to safeguards.
          </p>
          <p>
            Information processed through Meta / Instagram is also subject to Meta&rsquo;s
            infrastructure and policies. Meta may process certain data as described in Meta&rsquo;s
            policies linked above.
          </p>
        </PolicySection>

        <PolicySection id="retention" title="Retention">
          <p>
            We retain information only as long as needed for the purposes described in this policy,
            unless a longer retention period is required or permitted by law. Retention periods can
            vary based on the nature of the data and operational needs (for example security logs,
            message history for support, or legal holds).
          </p>
        </PolicySection>

        <PolicySection id="security" title="Security">
          <p>
            We implement reasonable administrative, technical, and organizational measures designed
            to protect personal information. No method of transmission or storage is completely
            secure; we cannot guarantee absolute security.
          </p>
        </PolicySection>

        <PolicySection id="rights" title="Your choices and rights">
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict
            certain processing of your personal information, and to object to certain processing or
            request data portability. You may also have the right to lodge a complaint with a
            supervisory authority.
          </p>
          <p>
            For Meta / Instagram data, you can also review and adjust certain settings in your
            Instagram and Facebook accounts, including permissions granted to connected apps, as
            described in Meta&rsquo;s help documentation.
          </p>
          <p>
            To exercise privacy rights related to our processing, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="privacy-link">
              {CONTACT_EMAIL}
            </a>
            . We may need to verify your request before responding.
          </p>
        </PolicySection>

        <PolicySection id="children" title="Children">
          <p>
            Our services are not directed to children under 13 (or the minimum age required in your
            jurisdiction), and we do not knowingly collect personal information from children. If
            you believe we have collected information from a child, please contact us and we will
            take appropriate steps to investigate and delete it where required.
          </p>
        </PolicySection>

        <PolicySection id="international" title="International transfers">
          <p>
            We may process and store information in countries other than where you live. Where
            required, we use appropriate safeguards for cross-border transfers consistent with
            applicable law.
          </p>
        </PolicySection>

        <PolicySection id="changes" title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. We will post the updated version on
            this page and update the &ldquo;Last updated&rdquo; date. If changes are material, we
            will provide additional notice as required by law.
          </p>
        </PolicySection>

        <PolicySection id="contact" title="Contact">
          <p>
            Questions about this Privacy Policy:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="privacy-link">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </PolicySection>

        <p className="privacy-disclaimer">
          This policy is intended to support common app review and platform disclosure requirements,
          but it does not constitute legal advice. You should have qualified counsel review your
          final policy and practices, especially if you change data processing, permissions, or
          regions you serve.
        </p>
      </main>
    </div>
  )
}
