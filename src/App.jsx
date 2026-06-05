import { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import {
  SlidersHorizontal, FlaskConical, PenLine,
  Target, Scale, ShieldCheck,
  Bot, MessageSquare, Gauge, SearchCode,
  Globe, Package, Wrench, FileText, Braces, Table2, Zap,
  Fingerprint, LayoutTemplate, Link2, History,
  Pin, PlayCircle, Tag,
  Monitor, Smartphone, Share2,
  MonitorCheck, Plug2, ClipboardCheck
} from 'lucide-react'
import './App.css'

const APP_URL = 'https://classifier-studio-production.up.railway.app/'

const NAV_LINKS = [
  { label: 'Idee', href: '#idea' },
  { label: 'Studios', href: '#studios' },
  { label: 'Standards', href: '#standards' },
  { label: 'Sphere Services', href: '#portfolio' },
  { label: 'Kontakt', href: '#contact' },
]

const STATS = [
  { value: '5', label: 'Standards parallel' },
  { value: '4+', label: 'Zielformate' },
  { value: '0', label: 'Trainingsläufe nötig' },
  { value: '100%', label: 'nachvollziehbar' },
]

const STUDIOS = [
  {
    Icon: SlidersHorizontal,
    name: 'Product Studio',
    role: 'Das Cockpit & der Orchestrator',
    text: 'Produkt anlegen, Quellen verwalten, den Produkt-Agenten fahren lassen und die ganze Pipeline überwachen. Versionsliste mit Replay, offene Rückfragen, Lebenslauf.',
  },
  {
    Icon: FlaskConical,
    name: 'Classifier Studio',
    role: 'Klassifikation im Detail',
    text: 'Standards & Versionen wählen, die gläserne Tool-Trace live verfolgen, Top-3-Kandidaten prüfen und jeden Lauf aus der History exakt wieder abspielen.',
  },
  {
    Icon: PenLine,
    name: 'Refinement Studio',
    role: 'Validierung & Anreicherung',
    text: 'Gegen das aufgelöste Zielprofil validieren und aus den Quellen anreichern — mit Provenienz je Feld (geprüft/befüllt/abgeleitet/fehlend) und Validierungs-Report.',
  },
]

const STANDARDS = [
  {
    name: 'GS1 GPC',
    color: '#00CFFF',
    text: 'Global Product Classification — Weltweiter GS1-Standard für Stammdaten, GDSN, E-Commerce und Lieferanten-Onboarding.',
    process: 'Basis für GDSN-Datenaustausch, E-Commerce und PIM/ERP. Universell für jedes Produkt.',
    tag: 'Live',
  },
  {
    name: 'MIGEL',
    color: '#CC00EE',
    text: 'Mittel- und Gegenständeliste (CH) — Schweizer Positionsliste für Vergütung durch die Grundversicherung.',
    process: 'Steuert Abrechnung & Rückerstattung: Apotheken, Spitäler, Sanitätshäuser, Versicherer.',
    tag: 'Live',
  },
  {
    name: 'FEDAS',
    color: '#FF8C00',
    text: 'Warengruppenschlüssel Sport — Branchenstandard des Sportfachhandels zur einheitlichen Warengruppierung.',
    process: 'Sortiments- und Abverkaufssteuerung im Sporthandel: Warenwirtschaft, Beschaffung, Reporting.',
    tag: 'Live',
  },
  {
    name: 'ETIM',
    color: '#00CFFF',
    text: 'Technische Merkmale — Internationaler Standard für technische Produkte (Elektro, Bau, Sanitär) mit Klassen und Merkmalen.',
    process: 'Treibt B2B-Kataloge (BMEcat/ETIM xChange) und technischen Grosshandel — merkmalsbasierte Suche.',
    tag: 'Live',
  },
  {
    name: 'UNSPSC',
    color: '#CC00EE',
    text: 'UN Standard Products & Services — Weltweite UN-Klassifikation mit hierarchischem Code.',
    process: 'Spend-Analyse, Beschaffung und Peppol/UBL-Belege — Brücke zwischen Einkauf und Buchhaltung.',
    tag: 'Live',
  },
  {
    name: 'eClass',
    color: '#64748b',
    text: 'Internationaler Standard für Produktklassifikation und Stammdaten in Industrie und Handel.',
    process: 'Anbindung ohne Modelltraining — Katalog einlesen, einbetten, produktiv.',
    tag: 'Bald',
  },
  {
    name: 'Ihr Standard',
    color: '#00CFFF',
    text: 'Verbands-Taxonomie, Hauskatalog, interne Warengruppen oder branchenspezifische Klassifikation — wir implementieren jeden Katalog als vollwertigen Standard in der Suite.',
    process: 'Katalog einreichen, Knoten einbetten, produktiv. Kein Training, keine Wartezeit — Ihr Standard verhält sich wie ein nativer.',
    tag: 'Anfrage',
    custom: true,
  },
]

const PIPELINE_STEPS = [
  {
    num: '01',
    title: 'Aufnahme',
    text: 'Text, PDF, Bild, CSV/XLSX/JSON oder URL einlesen. Vision/OCR und Dok-Extraktor gewinnen Titel, Marke, Attribute und Evidenz.',
  },
  {
    num: '02',
    title: 'Klassifikation',
    text: 'Gegen alle zutreffenden Standards: Normalisieren → Embedding → Retrieval → Scope-Richter → Rerank → begründeter Top-Treffer.',
  },
  {
    num: '03',
    title: 'Refinement',
    text: 'Zielprofil auflösen, Pflicht-/Optionalfelder aus den Quellen füllen, Lücken benennen — mit Provenienz und Validierungs-Report.',
  },
  {
    num: '04',
    title: 'Integration',
    text: 'Je Zielformat ein lieferfertiges Dokument aus dem angereicherten Profil rendern und zum Übergabe-Paket bündeln.',
  },
]

const AGENT_FEATURES = [
  { Icon: Bot, title: 'Orchestriert die Sub-Agenten', text: 'Treibt Klassifikation, Refinement und Integration headless bis zum Ziel — hält nur an, wo eine menschliche Entscheidung nötig ist.' },
  { Icon: MessageSquare, title: 'Stellt die richtigen Fragen', text: 'Alle offenen Entscheidungen erscheinen zentral als Rückfrage: erst der Weg (akzeptieren / Alternative / manuell), dann die konkrete Aktion.' },
  { Icon: Gauge, title: 'Automatisierungsgrad wählbar', text: 'Off (manuell), Assisted (autonom bis zum HITL-Gate) oder Auto. Unsichere Fälle landen in der Inbox statt still falsch zu laufen.' },
  { Icon: SearchCode, title: 'Treibt die Daten-Beschaffung', text: 'Fehlt etwas, beschafft der Agent es per Websuche oder fordert Quellen an, nimmt die Ergänzung auf und läuft automatisch weiter.' },
]

const OUTPUT_FORMATS = [
  { label: 'GDSN CH (JSON-LD)', Icon: Globe, text: 'GS1-Datenpool-Profil, Zielmarkt CH-756 — für den Stammdatenaustausch.' },
  { label: 'BMEcat 2005 (XML)', Icon: Package, text: 'B2B-Katalog mit Klassifikations-Referenz für technischen Grosshandel.' },
  { label: 'UNSPSC · Peppol/UBL', Icon: Link2, text: 'Klassifizierter Beleg-Baustein für elektronische Beschaffung und Rechnungsstellung.' },
  { label: 'SAP S/4HANA Materialstamm', Icon: Wrench, text: 'Materialstamm-konforme Ausgabe für den direkten ERP-Import.', soon: true },
  { label: 'Stammblatt (PDF)', Icon: FileText, text: 'Druckfertiges Klassifizierungs-Stammblatt mit Produktbildern und Texten.' },
  { label: 'Klassifikation (JSON)', Icon: Braces, text: 'Top-Treffer plus begründete Kandidatenliste — maschinenverarbeitbar.' },
  { label: 'ETIM xChange (JSON)', Icon: Zap, text: 'Technisches Austauschformat für ETIM-basierte B2B-Kataloge.' },
  { label: 'Kandidaten (CSV)', Icon: Table2, text: 'Tabellarischer Export für Tabellenkalkulation und Sichtprüfung.' },
]

const DPP_FEATURES = [
  { Icon: Fingerprint, title: 'Identität & Klassifikation', text: 'GTIN/SKU plus GPC/UNSPSC/ETIM — die eindeutige Produktidentität und Kategorie, auf der jeder Pass aufsetzt.' },
  { Icon: LayoutTemplate, title: 'Datenmodell als Zielprofil', text: 'Der Zielprofil-Mechanismus bildet ein DPP-Datenmodell je Produktgruppe ab — dieselbe Mechanik wie beim GS1 GDM.' },
  { Icon: Link2, title: 'Herkunftsnachweis je Feld', text: 'Jeder Wert trägt Status, Quellverweis und Konfidenz — die Nachweisbarkeit, die ein Produktpass regulatorisch verlangt.' },
  { Icon: History, title: 'Versioniert & auditierbar', text: 'Jeder Durchlauf ist eine eingefrorene, wieder-abspielbare Version — Grundlage für die Lebenszyklus-Nachvollziehbarkeit.' },
]

const BEFORE_AFTER = [
  { before: 'Fachkraft durchsucht manuell tausendseitige Kataloge', after: 'Vorschlag in Sekunden, Fachkraft prüft nur noch' },
  { before: 'Pflichtfelder je Zielformat von Hand zusammengesucht', after: 'Zielprofil löst sich auf, Felder werden belegt befüllt' },
  { before: 'Jeder Standard & jedes Zielsystem ein eigener Prozess', after: '5 Standards und mehrere Zielformate in einem Lauf' },
  { before: 'Entscheidungen bleiben undokumentiert im Kopf', after: 'Jeder Durchlauf versioniert und exakt wieder abspielbar' },
  { before: 'Neuer Katalog = Projekt über Monate', after: 'Neuer Katalog = einlesen, einbetten, fertig' },
]

const IMPACT_STATS = [
  { value: 'Minuten → Sekunden', label: 'Durchlaufzeit pro Produkt' },
  { value: 'Linear skalierbar', label: 'mehr Volumen ohne mehr Personal' },
  { value: 'Audit-ready', label: 'lückenlose Nachvollziehbarkeit' },
]

const ACCESS = [
  {
    Icon: Monitor,
    title: 'Studio (Desktop)',
    role: 'Das Kontrollzentrum',
    text: 'Drei-Spalten-Layout: Input · Agentenkommunikation · Klassifikation/Output. Versionierte History mit Replay, alle Zielformate und die Test Bench mit Analytics & LLM-Log.',
    tag: 'Live',
  },
  {
    Icon: Smartphone,
    title: 'Mobile (PWA)',
    role: 'Kamera-first, für unterwegs & Messe',
    text: 'Produkt oder Etikett fotografieren → sofort klassifizieren. Einspaltig, installierbar (Home-Screen, Vollbild). Vollständigkeitsprüfung mit Foto-Nachfrage bis das Profil komplett ist.',
    tag: 'Bald',
  },
]

const PORTFOLIO = [
  {
    id: 'portfolio-webportal',
    Icon: MonitorCheck,
    title: 'Webportal',
    subtitle: 'Für Stammdaten-Teams und Produktmanager',
    text: 'Das browserbasierte Studio ermöglicht Fachanwendern, einzelne Produkte oder ganze Sortimente direkt im Browser zu klassifizieren, anreichern und exportieren — ohne technisches Setup.',
    benefits: [
      'Sofort einsatzbereit ohne Installation',
      'Klassifikation per Texteingabe, PDF oder URL',
      'Ergebnisse mit Konfidenz und Begründung',
      'Export als JSON, CSV, PDF oder GDSN',
      'Ideal für Pilotprojekte und laufenden Betrieb',
    ],
  },
  {
    id: 'portfolio-api',
    Icon: Plug2,
    title: 'API & Integration',
    subtitle: 'Für Entwickler und Systemintegratoren',
    text: 'Die ProductSphere API lässt sich nahtlos in bestehende ERP-, PIM- oder E-Commerce-Systeme einbinden. Klassifikation und Validierung werden direkt im Produktanlageprozess ausgelöst — vollautomatisch.',
    benefits: [
      'REST API mit strukturierter JSON-Antwort',
      'Batch-Verarbeitung grosser Produktmengen',
      'Kompatibel mit SAP, Salesforce, Akeneo u.v.m.',
      'Webhook-Support für ereignisgesteuerte Prozesse',
      'SLA-fähig und skalierbar',
    ],
  },
  {
    id: 'portfolio-validation',
    Icon: ClipboardCheck,
    title: 'Validation as a Service',
    subtitle: 'Für einmalige Datenqualitäts-Projekte',
    text: 'Bestehende Produktdatenbestände werden einmalig analysiert, auf Klassifikationsqualität geprüft und mit einem Management-Report inklusive konkreter Handlungsempfehlungen geliefert.',
    benefits: [
      'Prüfung ohne eigene IT-Infrastruktur',
      'Data Quality Score pro Produkt und Kategorie',
      'GDSN- und DPP-Readiness-Check inklusive',
      'Korrekturvorschläge und Reklassifikation',
      'Management Report für Entscheidungsträger',
    ],
  },
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
            <img src={logo} alt="ProductSphere" className="nav__logo-img" />
          </button>
          <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button onClick={() => scrollTo(l.href)}>{l.label}</button>
              </li>
            ))}
            <li>
              <a className="btn btn--sm btn--primary" href={APP_URL} target="_blank" rel="noopener noreferrer">
                Plattform öffnen
              </a>
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
          <div className="hero__badge">Product Intelligence Suite</div>
          <h1 className="hero__title">
            Product<span className="accent">Sphere</span>
          </h1>
          <p className="hero__sub">Vom Rohprodukt zum lieferfertigen Datensatz</p>
          <p className="hero__text">
            Klassifiziert, angereichert, integriert. ProductSphere liest Texte, PDFs, Bilder, strukturierte Dateien und
            Produkt-URLs — und führt jedes Produkt durch eine durchgängige Pipeline: Klassifikation gegen mehrere
            internationale Standards, zielgetriebene Anreicherung und Integration in lieferfertige Zielformate.
            Ein orchestrierender Produkt-Agent treibt den Ablauf — jeder Schritt sichtbar, jede Entscheidung begründet,
            jeder Durchlauf versioniert.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href={APP_URL} target="_blank" rel="noopener noreferrer">Plattform starten</a>
            <button className="btn btn--outline btn--lg" onClick={() => scrollTo('#portfolio')}>Sphere Services ansehen</button>
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

      {/* DIE IDEE */}
      <section id="idea" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--violet">Die Idee</div>
            <h2>Klassifizieren ist erst der Anfang</h2>
            <p className="section__lead">
              Produktdaten normgerecht aufzubereiten ist heute teure Handarbeit: Fachleute durchsuchen tausendseitige Kataloge,
              raten fehlende Pflichtfelder zusammen und treffen Entscheidungen, die selten dokumentiert werden. Das Wissen steckt
              in Köpfen, nicht im System.
            </p>
          </div>
          <div className="idea-grid">
            <div className="idea-card">
              <Target className="idea-card__icon" size={32} strokeWidth={1.5} />
              <h3>Präzise statt Stichwort</h3>
              <p>Semantisches Verständnis erkennt „Medikamentenbecher 30 ml graduiert" auch dann, wenn der Katalog von „Dosierhilfen" spricht.</p>
            </div>
            <div className="idea-card">
              <Scale className="idea-card__icon" size={32} strokeWidth={1.5} />
              <h3>Mit Augenmass</h3>
              <p>Ein vorgeschalteter Richter prüft pro Standard, ob er überhaupt zutrifft — ein Sportschuh wird nicht in einen Medizinkatalog gepresst.</p>
            </div>
            <div className="idea-card">
              <ShieldCheck className="idea-card__icon" size={32} strokeWidth={1.5} />
              <h3>Auditierbar</h3>
              <p>Jeder Pipeline-Durchlauf wird mit Quellen, Kommunikation und Ergebnis als Version gespeichert und lässt sich exakt wieder ansehen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DREI STUDIOS */}
      <section id="studios" className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--teal">Eine Suite, drei Studios</div>
            <h2>Jede Aufgabe hat ihren Ort — über einem gemeinsamen Datenbestand</h2>
            <p className="section__lead">
              Das Produkt ist das Rückgrat. Drei spezialisierte Oberflächen teilen sich denselben Backend-Kern: Was im einen Studio passiert, ist im anderen sofort sichtbar.
            </p>
          </div>
          <div className="studios-grid">
            {STUDIOS.map((s) => (
              <div key={s.name} className="studio-card">
                <s.Icon className="studio-card__icon" size={32} strokeWidth={1.5} />
                <h3>{s.name}</h3>
                <p className="studio-card__role">{s.role}</p>
                <p>{s.text}</p>
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
            <h2>Fünf Standards — parallel, in einem Lauf</h2>
            <p className="section__lead">
              Dasselbe Produkt wird je nach Prozess unterschiedlich eingeordnet. ProductSphere bedient alle relevanten Standards parallel — kein separates Tool, kein Medienbruch.
            </p>
          </div>
          <div className="standards-grid">
            {STANDARDS.map((s) => (
              <div key={s.name} className={`standard-card${s.custom ? ' standard-card--custom' : ''}`} style={{ '--accent': s.color }}>
                <div className="standard-card__top">
                  <span className="standard-card__name">{s.name}</span>
                  <span className={`tag tag--${s.tag === 'Live' ? 'green' : s.tag === 'Anfrage' ? 'cyan' : 'amber'}`}>{s.tag}</span>
                </div>
                <p>{s.text}</p>
                <p className="standard-card__process">{s.process}</p>
                {s.custom && (
                  <a className="btn btn--primary btn--sm standard-card__cta" href="mailto:info@productsphere.io">
                    Standard anfragen
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="standards-why">
            <h3>Warum mehrere Standards gleichzeitig?</h3>
            <p>Ein einziges Medizinprodukt ist gleichzeitig ein GPC-Brick (Stammdaten), eine MIGEL-Position (Vergütung) und — bei einer Sportbandage — ein FEDAS-Schlüssel (Handel). Statt drei Silos zu pflegen, liefert ProductSphere alle relevanten Einordnungen aus einer Produktbeschreibung — konsistent, gleichzeitig und nachvollziehbar.</p>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--violet">So funktioniert es</div>
            <h2>Eine durchgängige Pipeline — von der Quelle bis zum Zielsystem</h2>
          </div>
          <div className="process-steps">
            {PIPELINE_STEPS.map((s, i) => (
              <div key={s.num} className="process-step">
                <div className="process-step__left">
                  <div className="process-step__num">{s.num}</div>
                  {i < PIPELINE_STEPS.length - 1 && <div className="process-step__line" />}
                </div>
                <div className="process-step__body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pipeline-note">
            <span className="pipeline-note__icon">🔍</span>
            <div>
              <strong>Gläsern in jedem Schritt</strong>
              <p>Jeder Teilschritt — Normalisierung, Embedding, Retrieval, Richter, Rerank, Anreicherung, Integration — wird live als Tool-Trace angezeigt. Keine Blackbox: Sie sehen genau, warum ein Treffer gewählt und ein Feld befüllt wurde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUKT-AGENT */}
      <section id="agent" className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--blue">Der Produkt-Agent</div>
            <h2>Ein dialogfähiger Orchestrator statt stummer Stapelverarbeitung</h2>
            <p className="section__lead">
              ProductSphere ist kein stummer Klassifikator, sondern ein steuernder Agent: Er liest die Quellen, leitet ab, was er kann, und meldet aktiv zurück, was fehlt.
            </p>
          </div>
          <div className="cards-grid">
            {AGENT_FEATURES.map((f) => (
              <div key={f.title} className="feature-card feature-card--dark">
                <f.Icon className="feature-card__icon" size={30} strokeWidth={1.5} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUT FORMATE */}
      <section id="outputs" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--violet">Ergebnisse</div>
            <h2>Lieferfertige Formate — kein Nacharbeiten</h2>
            <p className="section__lead">
              ProductSphere produziert die Artefakte, die nachgelagerte Systeme erwarten — vom GS1-Datenmodell bis zum SAP-Materialstamm.
            </p>
          </div>
          <div className="output-cards">
            {OUTPUT_FORMATS.map((f) => (
              <div key={f.label} className={`output-card${f.soon ? ' output-card--soon' : ''}`}>
                <f.Icon className="output-card__icon" size={22} strokeWidth={1.5} />
                <div>
                  <strong>{f.label}{f.soon && <span className="chip-soon" style={{marginLeft:'0.5rem'}}>Bald</span>}</strong>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DPP */}
      <section id="dpp" className="section section--gradient">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--teal">DPP-Enabler</div>
            <h2>Die Datengrundlage für den Digitalen Produktpass</h2>
            <p className="section__lead">
              Der EU Digital Product Passport (ESPR) verlangt ein vollständiges, maschinenlesbares und nachweisbares Attributset — genau die Disziplin, die ProductSphere beherrscht.
            </p>
          </div>
          <div className="dpp-grid">
            {DPP_FEATURES.map((f) => (
              <div key={f.title} className="dpp-card">
                <f.Icon className="dpp-card__icon" size={28} strokeWidth={1.5} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="dpp-note">
            <strong>Ehrlicher Scope: Enabler, nicht Pass-Register</strong>
            <p>ProductSphere bereitet die DPP-Daten vor und sichert ihre Qualität — ersetzt jedoch keine LCA/CO₂-Primärerhebung, keine Serialisierung auf Stück-/Chargenebene und kein Pass-Hosting mit Registry. Sie speist diese Systeme — transparent inklusive der Felder, die extern beschafft werden müssen.</p>
          </div>
        </div>
      </section>

      {/* VERSIONIERUNG */}
      <section id="versioning" className="section section--dark">
        <div className="container versioning-layout">
          <div className="versioning-text">
            <div className="pill pill--blue">Versionierung & Replay</div>
            <h2>Jeder Pipeline-Durchlauf ist eine eingefrorene, wieder-abspielbare Version</h2>
            <p>In regulierten Branchen zählt nicht nur das Ergebnis, sondern der Nachweis, wie und auf welcher Grundlage es entstand. ProductSphere liefert diesen Nachweis für jeden einzelnen Durchlauf — vollständig, eingefroren und jederzeit exakt wieder abspielbar.</p>
          </div>
          <div className="versioning-cards">
            {[
              { Icon: Pin, title: 'Version pro Durchlauf', text: 'Jeder vollständige Pass wird als unveränderliche Version v1, v2 … gespeichert. Die neueste ist aktiv, ältere bleiben eingefroren.' },
              { Icon: PlayCircle, title: 'Exakter Replay', text: 'Eine Version anklicken zeigt den ganzen Lauf wieder so, wie er live ablief — Agenten-Kommunikation, Dokumente, Quellen-Snapshot.' },
              { Icon: Tag, title: 'Standard-Versionen', text: 'Jede Klassifikation trägt das Versions-Label des Standards. Klar dokumentiert, gegen welchen Stand klassifiziert wurde.' },
            ].map((v) => (
              <div key={v.title} className="versioning-card">
                <v.Icon size={24} strokeWidth={1.5} style={{color:"#00CFFF",flexShrink:0}} />
                <div>
                  <strong>{v.title}</strong>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORHER / NACHHER */}
      <section id="impact" className="section section--light">
        <div className="container">
          <div className="section__header">
            <div className="pill pill--red">Wirkung</div>
            <h2>Was sich im Prozess ändert</h2>
          </div>
          <div className="before-after">
            <div className="ba-header">
              <span className="ba-label ba-label--before">Vorher</span>
              <span className="ba-label ba-label--after">Mit ProductSphere</span>
            </div>
            {BEFORE_AFTER.map((row) => (
              <div key={row.before} className="ba-row">
                <div className="ba-cell ba-cell--before">
                  <span className="ba-icon">✗</span>{row.before}
                </div>
                <div className="ba-cell ba-cell--after">
                  <span className="ba-icon">✓</span>{row.after}
                </div>
              </div>
            ))}
          </div>
          <div className="impact-stats">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="impact-stat">
                <span className="impact-stat__value">{s.value}</span>
                <span className="impact-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZUGÄNGE */}
      <section id="access" className="section section--gradient">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--teal">Zugänge</div>
            <h2>Desktop-Cockpit und Kamera-App — ein Datenbestand</h2>
          </div>
          <div className="access-grid">
            {ACCESS.map((a) => (
              <div key={a.title} className="access-card">
                <div className="access-card__top">
                  <a.Icon className="access-card__icon" size={28} strokeWidth={1.5} />
                  <span className={`tag tag--${a.tag === 'Live' ? 'green' : 'amber'}`}>{a.tag}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="access-card__role">{a.role}</p>
                <p>{a.text}</p>
              </div>
            ))}
            <div className="access-card access-card--note">
              <Share2 size={28} strokeWidth={1.5} style={{color:'#00CFFF', marginBottom:'1rem'}} />
              <h3>Ein Backend für beide</h3>
              <p>Beide Oberflächen teilen sich Pipeline und Datenbestand: Was am Handy fotografiert wird, erscheint sofort in der Studio-History — und umgekehrt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPHERE SERVICES / PORTFOLIO */}
      <section id="portfolio" className="section section--dark">
        <div className="container">
          <div className="section__header section__header--light">
            <div className="pill pill--blue">Sphere Services</div>
            <h2>So können Kunden ProductSphere nutzen</h2>
          </div>
          <div className="portfolio-grid">
            {PORTFOLIO.map((p) => (
              <div key={p.title} id={p.id} className="portfolio-card">
                <p.Icon className="portfolio-card__icon" size={32} strokeWidth={1.5} />
                <h3>{p.title}</h3>
                <p className="portfolio-card__subtitle">{p.subtitle}</p>
                <p className="portfolio-card__text">{p.text}</p>
                <ul className="portfolio-card__benefits">
                  {p.benefits.map((b) => (
                    <li key={b}>
                      <span className="portfolio-benefit-icon">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="section section--cta">
        <div className="container cta-content">
          <h2>Bereit für die nächste Generation von Produktdaten?</h2>
          <p>
            Erfahren Sie, wie ProductSphere Ihre Produktdaten klassifiziert, anreichert, validiert und für GDSN, DPP und zukünftige Standards vorbereitet.
          </p>
          <div className="cta-buttons">
            <a className="btn btn--primary btn--lg" href={APP_URL} target="_blank" rel="noopener noreferrer">Plattform starten</a>
            <a className="btn btn--outline-light btn--lg" href="mailto:info@productsphere.io">Kontakt aufnehmen</a>
          </div>
          <p className="cta-hint">Wir melden uns innerhalb von 24 Stunden.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <img src={logo} alt="ProductSphere" className="nav__logo-img" />
          <p>© 2025 ProductSphere. The Product Intelligence Suite.</p>
        </div>
      </footer>
    </div>
  )
}
