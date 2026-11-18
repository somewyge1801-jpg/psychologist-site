import { useState, useEffect, useCallback, useRef } from 'react'
import {
  site,
  hero,
  topics,
  about,
  process,
  terms,
  faq,
  contact,
  footer,
  demoNotice,
} from './data/site'
import './App.css'

function DemoModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const focusables = ref.current?.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    )
    const first = focusables?.[0]
    first?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="modal__panel"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow">Демонстрационный режим</p>
        <h3 className="modal__title" id="modal-title">
          Контакт ещё не настроен
        </h3>
        <p className="modal__text">
          В этой версии сайта кнопка связи ведёт на пояснение, а не на реальный
          мессенджер или почту. Действующий способ записи появится после того,
          как специалист подтвердит контакты и условия.
        </p>
        <button type="button" className="btn btn--primary" onClick={onClose}>
          Понятно, закрыть
        </button>
        <p className="modal__hint">Нажмите Esc, чтобы закрыть окно</p>
      </div>
    </div>
  )
}

function DemoBanner() {
  return (
    <div className="demo-banner" role="note">
      <span className="demo-banner__dot" aria-hidden="true"></span>
      <p className="demo-banner__text">{demoNotice}</p>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__brand" onClick={close}>
          <span className="header__brand-name">{site.name}</span>
          <span className="header__brand-note">психолог · онлайн</span>
        </a>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="header__toggle-line" aria-hidden="true"></span>
          <span className="header__toggle-line" aria-hidden="true"></span>
        </button>

        <nav
          id="nav-menu"
          className={`header__nav${open ? ' is-open' : ''}`}
          aria-label="Основная навигация"
        >
          <ul className="header__links">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="header__link" onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#svyaz" className="btn btn--primary header__nav-cta" onClick={close}>
            {hero.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="container hero__inner">
        <div className="hero__visual" aria-hidden="true">
          <span className="hero__monogram">В</span>
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">{site.role}</p>
          <h1 className="hero__title">{hero.title.split('\n').map((line, i) => (
            <span key={i} className="hero__title-line">{line}</span>
          ))}</h1>
          <p className="hero__intro">{hero.intro}</p>
          <div className="hero__actions">
            <a href={hero.ctaHref} className="btn btn--primary">
              {hero.cta}
            </a>
            <a href={hero.secondaryHref} className="btn btn--ghost">
              {hero.secondary}
            </a>
          </div>
          <p className="hero__note">{hero.note}</p>
        </div>
      </div>
    </section>
  )
}

function Topics() {
  return (
    <section id="zaprosy" className="section topics">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{topics.eyebrow}</p>
          <h2 className="section-head__title">{topics.title}</h2>
          <p className="section-head__text">{topics.text}</p>
        </div>

        <ul className="topics__list">
          {topics.items.map((item, i) => (
            <li key={item.title} className="topic">
              <span className="topic__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="topic__title">{item.title}</h3>
              <p className="topic__text">{item.text}</p>
            </li>
          ))}
        </ul>

        <p className="topics__boundary">{topics.boundary}</p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="obo-mne" className="section about">
      <div className="container">
        <div className="about__grid">
          <div className="about__aside">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="about__title">{about.title}</h2>
            <div className="about__photo" aria-hidden="true">
              <div className="about__photo-placeholder">
                <span className="about__photo-hint">Место для фотографии специалиста</span>
              </div>
            </div>
          </div>

          <div className="about__body">
            {about.paragraphs.map((p) => (
              <p key={p} className="about__lead">{p}</p>
            ))}

            <h3 className="about__principles-title">{about.principlesTitle}</h3>
            <ul className="about__principles">
              {about.principles.map((item) => (
                <li key={item} className="about__principle">{item}</li>
              ))}
            </ul>

            <p className="about__qualifications">{about.qualificationsPlaceholder}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="kak" className="section process">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="section-head__title">{process.title}</h2>
        </div>

        <ol className="process__steps">
          {process.steps.map((step) => (
            <li key={step.num} className="process__step">
              <span className="process__step-num" aria-hidden="true">{step.num}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-text">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="process__note">{process.note}</p>
      </div>
    </section>
  )
}

function Terms() {
  return (
    <section id="usloviya" className="section terms">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{terms.eyebrow}</p>
          <h2 className="section-head__title">{terms.title}</h2>
        </div>

        <div className="terms__grid">
          {terms.items.map((item) => (
            <div key={item.title} className="term">
              <h3 className="term__title">{item.title}</h3>
              <p className="term__text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="terms__contact">
          <h3 className="terms__contact-title">{terms.contactTitle}</h3>
          <p className="terms__contact-text">{terms.contactText}</p>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="voprosy" className="section faq">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="section-head__title">{faq.title}</h2>
        </div>

        <div className="faq__list">
          {faq.items.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3 className="faq-item__q">
                  <button
                    type="button"
                    className="faq-item__btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-item__icon" aria-hidden="true"></span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    className="faq-item__a"
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <section id="svyaz" className="section contact">
      <div className="container">
        <div className="contact__panel">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="contact__title">{contact.title}</h2>
          <p className="contact__text">{contact.text}</p>
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={() => setModalOpen(true)}
          >
            {contact.cta}
          </button>
          <p className="contact__after">{contact.after}</p>
        </div>
      </div>
      <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <p className="footer__brand">
            {site.name} · <span className="footer__brand-note">психолог онлайн</span>
          </p>
          <p className="footer__rights">{footer.rights}</p>
        </div>

        <nav className="footer__nav" aria-label={footer.navLabel}>
          <ul className="footer__links">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer__link">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <Topics />
        <About />
        <Process />
        <Terms />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}