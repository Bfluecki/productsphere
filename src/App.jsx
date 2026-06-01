import { useState, useEffect } from 'react'
import './App.css'

const NAV_LINKS = [
  { label: 'Lösung', href: '#solution' },
  { label: 'Funktionen', href: '#features' },
  { label: 'Standards', href: '#standards' },
  { label: 'Validierung', href: '#validation' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Kontakt', href: '#contact' },
]

const STATS = [
  { value: '3', label: 'Standards parallel' },
  { value: '1.7M+', label: 'klassifizierbare Knoten' },
  { value: '0', label: 'Trainingsläufe nötig' },
  { value: '100%', label: 'nachvollziehbar' },
]

const PAIN_POINTS = [
  'Manuelle Klassifikation ist teuer und langsam',
  'Bestehende Klassifikationen sind oft nicht überprüft',
  'Datenqualität ist schwer messbar',
  'Standards ändern sich laufend',
  'GDSN und DPP erhöhen die Anforderungen zusätzlich',
]

const FEATURES = [
  { icon: '📄', title: 'Versteht jedes Format', text: 'Text, PDF, Bilder und Produkt-URLs werden automatisch analysiert.' },
  { icon: '⚡', title: 'Mehrere Standards parallel', text: 'Ein Produkt kann gleichzeitig mehreren Standards zugeordnet werden.' },
  { icon: '🔍', title: 'Gläserne Pipeline', text: 'Jeder Schritt wird sichtbar dokumentiert: Aufnahme, Normalisierung, Retrieval, Bewertung und Ergebnis.' },
  { icon: '✅', title: 'Konfidenz & Review', text: 'Unsichere Fälle werden markiert und zur Prüfung weitergeleitet.' },
  { icon: '🕓', title: 'Versionierung', text: 'Produkte, Quellen, Läufe und Ergebnisse bleiben historisiert und reproduzierbar.' },
  { icon: '🌐', title: 'GDSN Readiness', text: 'Produktdaten werden auf Vollständigkeit und GDSN-Tauglichkeit geprüft.' },
  { icon: '🪪', title: 'DPP Readiness', text: 'Vorbereitung auf den Digital Product Passport durch strukturierte Produktinformationen.' },
  { icon: '🔗', title: 'API Integration', text: 'Anbindung an SAP, ERP, PIM, E-Commerce oder individuelle Systeme.' },
]

const STANDARDS = [
  { name: 'GS1 GPC', color: '#2563eb', text: 'Global Product Classification für Stammdaten, GDSN, E-Commerce und Lieferanten-Onboarding.', tag: 'Live' },
  { name: 'MIGEL', color: '#0891b2', text: 'Schweizer Mittel- und Gegenständeliste für Vergütung, Abrechnung und Gesundheitsprozesse.', tag: 'Live' },
  { name: 'FEDAS', color: '#7c3aed', text: 'Warengruppenschlüssel für Sporthandel, Sortimentssteuerung und Reporting.', tag: 'Live' },
  { name: 'Weitere Standards', color: '#059669', text: 'eClass, ETIM, UNSPSC, NPK oder kundenspezifische Taxonomien können ohne Modelltraining eingebunden werden.', tag: 'Roadmap' },
]

const VALIDATION_SERVICES = [
  'Prüfung bestehender Klassifikationen',
  'Erkennung falscher oder veralteter Zuordnungen',
  'Analyse fehlender Pflichtattribute',
  'Data Quality Score',
  'GDSN Readiness Check',
  'DPP Readiness Check',
  'Korrekturvorschläge und Reklassifikation',
  'Management Report mit Handlungsempfehlungen',
]

const PORTFOLIO = [
  { icon: '🖥️', title: 'Webportal', text: 'Nutzung über das browserbasierte Studio für Fachanwender, Stammdatenverantwortliche und Produktmanager.' },
  { icon: '⚙️', title: 'API & Integration', text: 'Einbindung in bestehende Kundensysteme, Produktanlageprozesse, ERP, SAP, PIM oder E-Commerce.' },
  { icon: '📊', title: 'Validation as a Service', text: 'Einmalige Analyse und Validierung grosser Produktdatenmengen inklusive Bericht, Qualitätskennzahlen und Verbesserungsvorschlägen.' },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Produktdaten bereitstellen', text: 'Text, Datei, Bild, URL oder Datenexport.' },
  { num: '02', title: 'KI analysiert und normalisiert', text: 'Die Plattform extrahiert relevante Merkmale und Attribute.' },
  { num: '03', title: 'Standards werden abgeglichen', text: 'Semantische Suche findet passende Katalogknoten.' },
  { num: '04', title: 'Ergebnis wird bewertet', text: 'Top-Treffer, Kandidatenliste, Konfidenz und Begründung.' },
  { num: '05', title: 'Daten werden exportiert', text: 'JSON, CSV, PDF, GDSN-Profil oder API-Rückgabe.' },
]

const BENEFITS = [
  'Schnellere Klassifikation',
  'Weniger manuelle Recherche',
  'Höhere Datenqualität',
  'Nachvollziehbare Entscheidungen',
  'Auditierbare Ergebnisse',
  'Bessere Vorbereitung auf GDSN und DPP',
  'Skalierbar für grosse Datenmengen',
  'Offen für neue Standards',
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* NAV */}
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => scrollTo('#hero')}>
            <span className="logo-dot" />
            ProductSphere
          </button>
          <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button onClick={() => scrollTo(l.href)}>{l.label}</button>
              </li>
            ))}
            <li>
              <button className="btn btn--sm btn--primary" onClick={() => scrollTo('#contact')}>
                Demo anfragen
              </button>
            </li>
          </ul>
          <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <div className="hero__badge">Product Intelligence Platform</div>
          <h1 className="hero__title">
            Product<span className="accent">Sphere</span>
          </h1>
          <p className="hero__sub">The Product Intelligence Platform</p>
          <p className="hero__text">
            Vom Produktdatenblatt zur normgerechten Klassifikation – in Sekunden, nachvollziehbar und mehrsprachig.
            ProductSphere liest Texte, PDFs, Bilder und Produkt-URLs, versteht den Inhalt und ordnet Produkte parallel
            mehreren internationalen Klassifikationsstandards zu – darunter GS1 GPC, MIGEL, FEDAS und künftig weitere
            Standards wie eClass, ETIM oder kundenspezifische Taxonomien.
          </p>
          <div className="hero__ctas">
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('#contact')}>Demo anfragen</button>
            <button className="btn btn--outline btn--lg" onClick={() => scrollTo('#portfolio')}>Leistungsportfolio ansehen</button>
          </div>
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__scroll-hint"><span /></div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--red">Herausforderung</div>
            <h2>Produktdaten werden immer komplexer</h2>
            <p className="section__lead">
              Unternehmen verfügen über grosse Mengen an Produktdaten. Diese Daten sind oft unvollständig, uneinheitlich
              oder nicht korrekt klassifiziert. Gleichzeitig steigen die Anforderungen an Standards, Stammdatenaustausch,
              GDSN, Compliance und digitale Produktpässe.
            </p>
          </div>
          <ul className="pain-list">
            {PAIN_POINTS.map((p) => (
              <li key={p} className="pain-item">
                <span className="pain-icon">✗</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--blue">Die Lösung</div>
            <h2>Eine Plattform für Klassifikation, Validierung und Produktintelligenz</h2>
            <p className="section__lead">
              ProductSphere kombiniert semantische Suche, Retrieval-Augmented Generation, KI-gestützte Bewertung und
              transparente Validierung. Die Plattform analysiert Produktinformationen, schlägt passende Klassifikationen
              vor, prüft bestehende Daten und macht jeden Entscheidungsschritt nachvollziehbar.
            </p>
          </div>
          <div className="modules">
            {[
              { num: '01', title: 'Classification Engine', text: 'Automatische Zuordnung zu Standards wie GS1 GPC, MIGEL und FEDAS.' },
              { num: '02', title: 'Data Validation Services', text: 'Einmalige oder wiederkehrende Prüfung grosser Produktdatenbestände auf Qualität, Vollständigkeit und Standardkonformität.' },
              { num: '03', title: 'Product Data Integration', text: 'Integration in Kundensysteme über API, Batch-Verarbeitung oder Exportformate wie JSON, CSV, PDF und GDSN-Profile.' },
            ].map((m) => (
              <div key={m.num} className="module-card">
                <span className="module-card__num">{m.num}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--violet">Funktionen</div>
            <h2>Was die Plattform leistet</h2>
          </div>
          <div className="cards-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-card__icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section id="standards" className="section section--gradient">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--teal">Standards</div>
            <h2>Drei Standards heute – offen für weitere</h2>
          </div>
          <div className="standards-grid">
            {STANDARDS.map((s) => (
              <div key={s.name} className="standard-card" style={{ '--accent': s.color }}>
                <div className="standard-card__top">
                  <span className="standard-card__name">{s.name}</span>
                  <span className={`tag tag--${s.tag === 'Live' ? 'green' : 'amber'}`}>{s.tag}</span>
                </div>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALIDATION */}
      <section id="validation" className="section section--light">
        <div className="container validation-layout">
          <div className="validation-text">
            <div className="pill pill--red">Validierungsservice</div>
            <h2>Bestehende Produktdaten prüfen und verbessern</h2>
            <p>
              Viele Unternehmen haben bereits grosse Produktdatenbestände, wissen aber nicht, ob diese den geforderten
              Klassifikations- und Datenqualitätsvorgaben entsprechen. ProductSphere kann diese Bestände einmalig als
              Service validieren und konkrete Verbesserungsmassnahmen aufzeigen.
            </p>
            <button className="btn btn--primary" onClick={() => scrollTo('#contact')}>Datenbestand prüfen lassen</button>
          </div>
          <ul className="check-list">
            {VALIDATION_SERVICES.map((v) => (
              <li key={v}>
                <span className="check-icon">✓</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--blue">Portfolio</div>
            <h2>So können Kunden ProductSphere nutzen</h2>
          </div>
          <div className="portfolio-grid">
            {PORTFOLIO.map((p) => (
              <div key={p.title} className="portfolio-card">
                <span className="portfolio-card__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--violet">Prozess</div>
            <h2>So funktioniert es</h2>
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.num} className="process-step">
                <div className="process-step__left">
                  <div className="process-step__num">{s.num}</div>
                  {i < PROCESS_STEPS.length - 1 && <div className="process-step__line" />}
                </div>
                <div className="process-step__body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="section section--gradient">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--teal">Nutzen</div>
            <h2>Vom Engpass zur skalierbaren Datenqualität</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b) => (
              <div key={b} className="benefit-item">
                <span className="benefit-arrow">→</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="section section--cta">
        <div className="container cta-content">
          <h2>Bereit für die nächste Generation von Produktdaten?</h2>
          <p>
            Erfahren Sie, wie ProductSphere Ihre Produktdaten klassifiziert, validiert und für GDSN, DPP und
            zukünftige Standards vorbereitet.
          </p>
          <div className="cta-buttons">
            <a className="btn btn--primary btn--lg" href="mailto:info@productsphere.io">Demo anfragen</a>
            <a className="btn btn--outline-light btn--lg" href="mailto:info@productsphere.io">Validierungsservice besprechen</a>
          </div>
          <p className="cta-hint">Wir melden uns innerhalb von 24 Stunden.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="nav__logo" style={{ cursor: 'default' }}>
            <span className="logo-dot" />
            ProductSphere
          </span>
          <p>© 2025 ProductSphere. The Product Intelligence Platform.</p>
        </div>
      </footer>
    </div>
  )
}
