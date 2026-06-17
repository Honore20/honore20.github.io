import { useState, useEffect, useRef } from "react";

const ACCENT = "#00e5a0";
const ACCENT_DIM = "rgba(0,229,160,0.15)";
const BG_DARK = "#0a0e17";
const BG_CARD = "#111827";
const TEXT_PRIMARY = "#e2e8f0";
const TEXT_SECONDARY = "#94a3b8";
const BORDER = "rgba(0,229,160,0.2)";

const skills = [
  {
    icon: "🛡️",
    title: "Sécurité & SOC",
    items: ["SIEM Wazuh (XDR)", "Détection d'intrusion", "Analyse de logs & FIM", "EBIOS RM / MITRE ATT&CK"],
  },
  {
    icon: "🌐",
    title: "Réseau & Firewalling",
    items: ["TCP/IP, VLAN, ACL", "VPN (OpenVPN / WireGuard)", "PfSense / OPNSense", "DNS, DHCP, Routage"],
  },
  {
    icon: "🖥️",
    title: "Admin. Systèmes",
    items: ["Linux (Ubuntu/Debian)", "Windows Server & AD (GPO)", "Docker & Virtualisation", "Supervision (Syslog)"],
  },
  {
    icon: "⚙️",
    title: "Scripting & Outils",
    items: ["Python & Bash", "SQL (MySQL/PostgreSQL)", "Git / GitHub, CI/CD", "Postman, Agile / Scrum"],
  },
];

const projects = [
  {
    tag: "PROJET PHARE — SOC",
    title: "SentinelWatch",
    description:
      "Dashboard SOC temps réel pour la détection d'attaques brute-force SSH. Architecture de surveillance avec Wazuh (SIEM/XDR), monitoring FIM, alertes automatisées et bannissement d'IPs.",
    tech: ["Wazuh", "Docker", "SIEM/XDR", "Python"],
    link: "https://sentinelwatch.netlify.app/",
    linkLabel: "Voir la démo live",
  },
  {
  tag: "THREAT INTELLIGENCE",
  title: "VulnScope",
  description:
    "Dashboard d'intelligence en vulnérabilités. Interroge la base CVE du NIST en temps réel pour identifier les failles critiques affectant une stack technique. Scoring CVSS, rapport de sévérité et presets rapides.",
  tech: ["FastAPI", "NVD/NIST API", "React", "CVSS"],
  link: "https://vulnscope.netlify.app",
  linkLabel: "Voir la démo live",
},
  {
    tag: "INFRASTRUCTURE",
    title: "NAS Sécurisé",
    description:
      "Conception d'une infrastructure de stockage résiliente : volumes logiques RAID, segmentation VLAN, firewalling (PfSense/OPNSense) et accès distant sécurisé via OpenVPN et WireGuard.",
    tech: ["PfSense", "VLAN", "RAID", "OpenVPN"],
    link: null,
    linkLabel: null,
  },
  {
    tag: "DÉVELOPPEMENT & IA",
    title: "CV Magic AI",
    description:
      "Plateforme SaaS de génération de CV optimisés ATS via IA. Architecture complète : backend Flask, API Gemini 2.0, scraping sémantique et tunnel de paiement Stripe.",
    tech: ["Python/Flask", "Gemini API", "Stripe", "SQLite"],
    link: "https://cv-magic-ai.onrender.com",
    linkLabel: "Tester l'application",
  },
];

const experiences = [
  {
    period: "Jan. — Mars 2026",
    title: "Ingénieur Infrastructure & IA",
    company: "ED&DISCE",
    type: "Stage",
    points: [
      "Déploiement et sécurisation d'une infrastructure backend FastAPI (Python)",
      "Intégration sécurisée d'API LLM (Mistral AI / OpenAI)",
      "Sécurisation des endpoints : authentification, validation, gestion des tokens",
    ],
  },
  {
    period: "Juin — Août 2025",
    title: "Intégration & Sécurisation d'API",
    company: "JENEE",
    type: "Stage",
    points: [
      "Sécurisation de flux de données API REST en environnement Agile",
      "Administration de bases de données MySQL/PostgreSQL (accès conditionnels)",
      "Automatisation des tâches d'administration via scripts Python",
    ],
  },
  {
    period: "Juil. — Août 2024",
    title: "Administration Réseau",
    company: "Creative Internet Solutions",
    type: "Stage",
    points: [
      "Architecture et sécurisation de réseaux LAN/WAN (VoIP/Data)",
      "Routage inter-VLAN, DHCP/DNS, règles Pare-feu (ACL)",
      "Déploiement de serveurs Syslog et FTP sous Docker",
    ],
  },
  {
    period: "Juin — Août 2023",
    title: "Assistant IT",
    company: "Coris Bank",
    type: "Stage",
    points: [
      "Administration Active Directory (droits/GPO), support N1/N2",
      "Déploiement d'une solution de ticketing ITSM",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: ACCENT, letterSpacing: "0.1em" }}>
        {label}.
      </span>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: TEXT_PRIMARY, margin: "6px 0 0" }}>
        {title}
      </h2>
    </div>
  );
}

function Nav({ activeSection }) {
  const links = [
    { id: "hero", label: "Accueil" },
    { id: "about", label: "Profil" },
    { id: "skills", label: "Compétences" },
    { id: "projects", label: "Projets" },
    { id: "experience", label: "Parcours" },
    { id: "contact", label: "Contact" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(10,14,23,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "0 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: ACCENT, fontWeight: 700, fontSize: 18, letterSpacing: "0.04em" }}>
          H.AVEKOR
        </span>
        <div className="nav-desktop" style={{ display: "flex", gap: 28 }}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} style={{ color: activeSection === l.id ? ACCENT : TEXT_SECONDARY, textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.3s", borderBottom: activeSection === l.id ? `2px solid ${ACCENT}` : "2px solid transparent", paddingBottom: 2 }}>
              {l.label}
            </a>
          ))}
        </div>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: ACCENT, fontSize: 24, cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 24px 24px", background: "rgba(10,14,23,0.98)" }}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} style={{ color: activeSection === l.id ? ACCENT : TEXT_SECONDARY, textDecoration: "none", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const fullText = "Cybersécurité & Infrastructure";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.3, maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", background: ACCENT_DIM, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "6px 18px", marginBottom: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Disponible en alternance — Sept. 2026
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.1, margin: "0 0 16px" }}>
          Honoré Avekor
        </h1>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(16px, 2.5vw, 24px)", color: ACCENT, marginBottom: 32, minHeight: 36 }}>
          <span>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", marginLeft: 2 }}>_</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", color: TEXT_SECONDARY, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
          J'analyse, je sécurise, je protège. Étudiant en Bachelor à l'EPSI Toulouse, je construis des architectures résilientes et je détecte les menaces avant qu'elles ne frappent.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={{ background: ACCENT, color: BG_DARK, padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,229,160,0.3)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
            Me contacter
          </a>
          <a href="#projects" style={{ background: "transparent", color: ACCENT, padding: "14px 32px", borderRadius: 8, border: `1px solid ${ACCENT}`, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, letterSpacing: "0.04em", transition: "background 0.3s" }}
            onMouseEnter={(e) => (e.target.style.background = ACCENT_DIM)}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}>
            Voir mes projets
          </a>
          <a href="/cv.pdf"
  download
  style={{
    background: "transparent",
    color: "#00e5a0",
    padding: "14px 32px",
    borderRadius: 8,
    border: "1px solid rgba(0,229,160,0.4)",
    textDecoration: "none",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.04em",
  }}
>
  ⬇ Télécharger mon CV
</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: 800, margin: "0 auto" }}>
      <FadeIn>
        <SectionTitle label="01" title="Profil" />
        <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "clamp(24px, 4vw, 48px)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: TEXT_SECONDARY, lineHeight: 1.85, margin: 0 }}>
            Passionné par la sécurité des systèmes d'information, je combine une formation en systèmes & réseaux avec une expérience terrain en déploiement SIEM, sécurisation d'API et administration d'infrastructures.{" "}
            <span style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Mon approche : comprendre l'attaquant pour mieux défendre.</span>{" "}
            Du firewalling au SOC, je recherche une alternance de 12 mois pour mettre mes compétences au service d'une équipe sécurité.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT }}>
            <span>📍 Toulouse, France</span>
            <span>🎓 EPSI — Bachelor SIN2</span>
            <span>📜 CCNA · Security+ (en cours)</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn><SectionTitle label="02" title="Compétences" /></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {skills.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.1}>
            <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28, height: "100%", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 14 }}>{s.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {s.items.map((item) => (
                  <li key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: TEXT_SECONDARY, padding: "5px 0", borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                    <span style={{ color: ACCENT, marginRight: 8, fontSize: 10 }}>▸</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn><SectionTitle label="03" title="Projets" /></FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.12}>
            <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.3s", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}>
              {i === 0 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${ACCENT}, #06b6d4)` }} />}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: i === 0 ? ACCENT : TEXT_SECONDARY, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>{p.tag}</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: TEXT_PRIMARY, margin: 0 }}>{p.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: TEXT_SECONDARY, lineHeight: 1.7, margin: 0, maxWidth: 700 }}>{p.description}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                {p.tech.map((t) => (
                  <span key={t} style={{ background: ACCENT_DIM, color: ACCENT, padding: "4px 12px", borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6, transition: "gap 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}>
                  {p.linkLabel} →
                </a>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn><SectionTitle label="04" title="Parcours" /></FadeIn>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${ACCENT}, ${BORDER})`, borderRadius: 2 }} />
        {experiences.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.1}>
            <div style={{ marginBottom: 36, position: "relative" }}>
              <div style={{ position: "absolute", left: -28, top: 6, width: 12, height: 12, borderRadius: "50%", background: i === 0 ? ACCENT : BG_CARD, border: `2px solid ${ACCENT}` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: TEXT_PRIMARY, margin: 0 }}>{exp.title}</h4>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: ACCENT, fontWeight: 500 }}>{exp.company}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEXT_SECONDARY, marginLeft: 10, background: ACCENT_DIM, padding: "2px 8px", borderRadius: 4 }}>{exp.type}</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEXT_SECONDARY, whiteSpace: "nowrap" }}>{exp.period}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {exp.points.map((pt, j) => (
                  <li key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.7, padding: "3px 0" }}>
                    <span style={{ color: ACCENT, marginRight: 8, fontSize: 9 }}>●</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "80px 24px 100px", maxWidth: 700, margin: "0 auto" }}>
      <FadeIn>
        <SectionTitle label="05" title="Contact" />
        <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "clamp(28px, 4vw, 48px)", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: TEXT_SECONDARY, lineHeight: 1.7, marginBottom: 36 }}>
            Disponible pour une alternance de 12 mois à partir de septembre 2026.<br />
            Rythme : 2 semaines en entreprise / 1 semaine en formation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
            <a href="mailto:avekorm@gmail.com" style={{ color: ACCENT, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "12px 28px", border: `1px solid ${BORDER}`, borderRadius: 10, transition: "background 0.3s, border-color 0.3s", width: "fit-content" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT_DIM; e.currentTarget.style.borderColor = ACCENT; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = BORDER; }}>
              ✉️ avekorm@gmail.com
            </a>
            <a href="tel:+33751479681" style={{ color: TEXT_SECONDARY, textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              📞 07 51 47 96 81
            </a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 32 }}>
            {[
              { label: "GitHub", href: "https://github.com/Honore20" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/honor%C3%A9-avekor-264449362/" },
            ].map((lnk) => (
              <a key={lnk.label} href={lnk.href} target="_blank" rel="noopener noreferrer"
                style={{ color: TEXT_SECONDARY, textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", padding: "8px 16px", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, transition: "color 0.3s, border-color 0.3s" }}
                onMouseEnter={(e) => { e.target.style.color = ACCENT; e.target.style.borderColor = ACCENT; }}
                onMouseLeave={(e) => { e.target.style.color = TEXT_SECONDARY; e.target.style.borderColor = "rgba(148,163,184,0.15)"; }}>
                {lnk.label}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-60px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: BG_DARK, minHeight: "100vh", color: TEXT_PRIMARY, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 70px; }
        body { background: ${BG_DARK}; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG_DARK}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${ACCENT}; }
        ::selection { background: ${ACCENT}; color: ${BG_DARK}; }
      `}</style>
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <Contact />
      <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${BORDER}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEXT_SECONDARY }}>
        © 2026 Honoré Avekor — Conçu pour sécuriser.
      </footer>
    </div>
  );
}
