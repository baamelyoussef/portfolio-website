import React, { useState, useEffect } from 'react';
import FloatingPreview from './FloatingPreview';
import IntroVideo from './IntroVideo';
import ResumeView from './ResumeView';
import { Lang, experience, skills, projects, UI } from '../data';

const INTRO_VIDEO_SRC: string | undefined = undefined;

function detectLang(): Lang {
  const b = (navigator.language ?? '').toLowerCase();
  if (b.startsWith('fr')) return 'fr';
  return 'en';
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};

type Props = { onEnter: () => void };

const LandingPage: React.FC<Props> = ({ onEnter }) => {
  const isMobile = useIsMobile();
  const [lang, setLang] = useState<Lang>(detectLang);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const t = UI[lang];
  const exp = experience[lang];
  const sk = skills[lang];

  const switchLang = () => {
    setLang(lang === 'en' ? 'fr' : 'en');
  };

  const openModal = (p: typeof projects[0]) => {
    setSelectedProject(p);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div style={s.root}>
        <div style={{ ...s.scroll, paddingBottom: isMobile ? '56px' : 0 }}>

          {/* NAV */}
          <nav style={s.nav}>
            <div style={{ ...s.innerFlex, padding: isMobile ? '0 16px' : '0 32px' }}>
              <div style={{ ...s.navLinks, gap: isMobile ? '14px' : '24px' }}>
                <a href="#experience" style={{ ...s.navLink, fontSize: isMobile ? '0.68rem' : undefined }} onClick={scrollTo('experience')}>{t.nav.experience}</a>
                <a href="#work" style={{ ...s.navLink, fontSize: isMobile ? '0.68rem' : undefined }} onClick={scrollTo('work')}>{t.nav.projects}</a>
                <a href="#contact" style={{ ...s.navLink, fontSize: isMobile ? '0.68rem' : undefined }} onClick={scrollTo('contact')}>{t.nav.contact}</a>
              </div>
              <button style={s.langToggle} onClick={switchLang}>
                <span style={{ color: lang === 'en' ? '#111' : 'rgba(0,0,0,0.3)' }}>EN</span>
                <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: isMobile ? '0.55rem' : undefined }}>|</span>
                <span style={{ color: lang === 'fr' ? '#111' : 'rgba(0,0,0,0.3)' }}>FR</span>
              </button>
            </div>
          </nav>

          <div style={{ ...s.inner, padding: isMobile ? '0 16px' : '0 32px' }}>

            {/* EXPERIENCE */}
            <section id="experience" style={{ ...s.section, borderTop: 'none' }}>
              <div style={s.labelRow}>
                <p style={s.label}>{t.labels.experience}</p>
                <button style={s.resumeBtn} onClick={() => setShowResume(true)}>
                  {t.nav.resume}
                </button>
              </div>
              <div style={s.expList}>
                {exp.map((entry) => (
                  <div key={entry.company} style={s.expCard}>
                    {/* Logo header */}
                    <div style={s.expLogoWrap}>
                      {entry.logo ? (
                        <img
                          src={entry.logo}
                          alt={entry.company}
                          style={{
                            ...s.expLogo,
                            ...(entry.company.includes('MEDIOT') && { maxWidth: '210px', maxHeight: '72px' }),
                            ...(entry.company.includes('ONCF') && { maxWidth: '110px' }),
                          }}
                        />
                      ) : (
                        <div style={s.expLogoFallback}>
                          <span style={s.expLogoInitial}>F</span>
                        </div>
                      )}
                    </div>
                    {/* Meta + bullets */}
                    <div style={s.expBody}>
                      <div style={s.expTop}>
                        <span style={s.cardCompany}>{entry.company}</span>
                        <span style={s.cardPeriod}>{entry.period}</span>
                      </div>
                      <span style={s.cardRole}>{entry.role}</span>
                      <ul style={s.bulletList}>
                        {entry.bullets.map((b, i) => (
                          <li key={i} style={s.bulletItem}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" style={s.section}>
              <div style={s.labelRow}><p style={s.label}>{t.labels.skills}</p></div>
              <div style={s.skillsGrid}>
                {sk.map((row) => (
                  <div key={row.cat} style={s.skillRow}>
                    <span style={s.skillCat}>{row.cat}</span>
                    <span style={s.skillItems}>{row.items}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section id="work" style={s.section}>
              <div style={s.labelRow}><p style={s.label}>{t.labels.projects}</p></div>
              <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {projects.map((p) => (
                  <div key={p.title} style={s.projectCard} onClick={() => openModal(p)}>
                    {p.bg && (
                      <>
                        <img src={p.bg} alt={p.title} style={s.projectImg} />
                        <div style={s.projectOverlay} />
                      </>
                    )}
                    <div style={{ position: p.bg ? 'absolute' : 'relative', bottom: p.bg ? 0 : undefined, left: p.bg ? 0 : undefined, right: p.bg ? 0 : undefined, padding: '20px', zIndex: 1 }}>
                      <div style={s.projectTop}>
                        <span style={{ ...s.projectTitle, color: p.bg ? '#fff' : '#111' }}>{p.title}</span>
                        <span style={{ ...s.projectYear, color: p.bg ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)' }}>{p.year}</span>
                      </div>
                      <span style={{ ...s.projectTags, color: p.bg ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.4)' }}>{p.tags}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" style={s.section}>
              <p style={s.label}>{t.labels.contact}</p>
              <a href="mailto:hi@youssefbaamel.com" style={{ ...s.email, fontSize: isMobile ? '1rem' : 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                hi@youssefbaamel.com
              </a>
            </section>

            {/* FOOTER */}
            <footer style={{ ...s.footer, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '0', alignItems: isMobile ? 'flex-start' : 'center' }}>
              <span style={s.footerCopy}>{t.footerCopy(new Date().getFullYear())}</span>
              <div style={s.footerLinks}>
                <a href="https://github.com/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </footer>

          </div>
        </div>
      </div>

      {!isMobile && <FloatingPreview onEnter={onEnter} videoSrc="/videos/preview-ix.mp4" />}
      {INTRO_VIDEO_SRC && <IntroVideo isMobile={isMobile} videoSrc={INTRO_VIDEO_SRC} />}

      {/* Mobile immersive bar */}
      {isMobile && (
        <div className="immersive-bar-anim" style={s.immersiveBar}>
          <button style={s.immersiveBarAction} onClick={onEnter}>
            ✦&nbsp;&nbsp;Try Immersive
          </button>
        </div>
      )}

      {showResume && <ResumeView lang={lang} onClose={() => setShowResume(false)} />}

      {selectedProject && (
        <div style={{ ...s.modalBackdrop, opacity: modalVisible ? 1 : 0 }} onClick={closeModal}>
          <div
            style={{
              ...s.modalPanel,
              transform: modalVisible ? 'translateY(0)' : 'translateY(32px)',
              opacity: modalVisible ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={s.modalClose} onClick={closeModal}>✕</button>
            {selectedProject.bg && (
              <div style={s.modalImgWrap}>
                <img src={selectedProject.bg} alt={selectedProject.title} style={s.modalImg} />
              </div>
            )}
            <div style={s.modalBody}>
              <div style={s.modalTitleRow}>
                <span style={s.modalTitle}>{selectedProject.title}</span>
                <span style={s.modalYear}>{selectedProject.year}</span>
              </div>
              <p style={s.modalTags}>{selectedProject.tags}</p>
              <div style={s.modalActions}>
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" style={s.modalBtnPrimary}>
                    {t.visitProject}
                  </a>
                )}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" style={s.modalBtnSecondary}>
                    {t.github}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const s: { [key: string]: React.CSSProperties } = {
  root: {
    position: 'fixed',
    inset: 0,
    background: '#f9f9f7',
    color: '#111',
    fontFamily: 'monospace',
    overflow: 'hidden',
    zIndex: 9999,
  },
  scroll: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  inner: {
    maxWidth: '780px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  innerFlex: {
    maxWidth: '780px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(249,249,247,0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(0,0,0,0.07)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px',
    boxSizing: 'border-box',
  },
  navName: {
    fontSize: '0.85rem',
    fontFamily: 'monospace',
    color: '#111',
    letterSpacing: '0.03em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: 'rgba(0,0,0,0.4)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    letterSpacing: '0.03em',
  },
  langToggle: {
    background: 'none',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '6px',
    padding: '3px 8px',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    letterSpacing: '0.04em',
  },
  section: {
    padding: '48px 0',
    borderTop: '1px solid rgba(0,0,0,0.07)',
    width: '100%',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  label: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: 'rgba(0,0,0,0.25)',
    margin: 0,
    fontFamily: 'monospace',
  },
  resumeBtn: {
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    color: '#111',
    textDecoration: 'none',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '6px',
    padding: '6px 14px',
    letterSpacing: '0.03em',
    background: 'transparent',
    cursor: 'pointer',
  },
  expList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  expCard: {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.07)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  expLogoWrap: {
    width: '100%',
    height: '80px',
    background: '#fff',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  expLogo: {
    maxHeight: '100%',
    maxWidth: '160px',
    objectFit: 'contain',
    display: 'block',
  },
  expLogoFallback: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e8e8e6',
  },
  expLogoInitial: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'monospace',
  },
  expBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px 20px 20px',
  },
  expTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: '4px',
  },
  cardRole: {
    fontSize: '0.76rem',
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },
  cardPeriod: {
    fontSize: '0.68rem',
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'monospace',
    flexShrink: 0,
  },
  cardCompany: {
    fontWeight: 700,
    fontSize: '0.88rem',
    color: '#111',
    fontFamily: 'monospace',
  },
  bulletList: {
    margin: '6px 0 0',
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  bulletItem: {
    fontSize: '0.76rem',
    color: 'rgba(0,0,0,0.55)',
    fontFamily: 'monospace',
    lineHeight: 1.6,
  },
  skillsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skillRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'baseline',
  },
  skillCat: {
    fontSize: '0.72rem',
    fontFamily: 'monospace',
    color: '#111',
    fontWeight: 700,
    minWidth: '100px',
    flexShrink: 0,
    letterSpacing: '0.02em',
  },
  skillItems: {
    fontSize: '0.76rem',
    fontFamily: 'monospace',
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gap: '1px',
    background: 'rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.07)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  projectCard: {
    background: '#f9f9f7',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  projectImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  projectOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '45%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 0,
    WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
    maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
  },
  projectTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#111',
    fontFamily: 'monospace',
  },
  projectYear: {
    fontSize: '0.7rem',
    color: 'rgba(0,0,0,0.25)',
    fontFamily: 'monospace',
  },
  projectTags: {
    fontSize: '0.72rem',
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'monospace',
  },
  email: {
    fontWeight: 700,
    color: '#111',
    textDecoration: 'none',
    fontFamily: 'monospace',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    paddingBottom: '4px',
    display: 'inline-block',
  },
  footer: {
    borderTop: '1px solid rgba(0,0,0,0.07)',
    padding: '20px 0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
  },
  footerCopy: {
    fontSize: '0.75rem',
    color: 'rgba(0,0,0,0.25)',
    fontFamily: 'monospace',
  },
  footerLinks: {
    display: 'flex',
    gap: '20px',
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    boxSizing: 'border-box',
    transition: 'opacity 0.3s ease',
  },
  modalPanel: {
    background: '#fff',
    borderRadius: '14px',
    width: '100%',
    maxWidth: '520px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    background: 'rgba(0,0,0,0.06)',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '0.7rem',
    color: '#111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    fontFamily: 'monospace',
  },
  modalImgWrap: {
    width: '100%',
    maxHeight: '260px',
    overflow: 'hidden',
  },
  modalImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  modalBody: {
    padding: '24px',
  },
  modalTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '6px',
  },
  modalTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'monospace',
    color: '#111',
  },
  modalYear: {
    fontSize: '0.7rem',
    color: 'rgba(0,0,0,0.25)',
    fontFamily: 'monospace',
  },
  modalTags: {
    fontSize: '0.72rem',
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'monospace',
    margin: '0 0 20px',
    lineHeight: 1.6,
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
  },
  modalBtnPrimary: {
    background: '#111',
    color: '#fff',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    padding: '10px 20px',
    borderRadius: '8px',
    letterSpacing: '0.03em',
  },
  modalBtnSecondary: {
    background: 'transparent',
    color: '#111',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.15)',
    letterSpacing: '0.03em',
  },
  immersiveBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '56px',
    background: '#111',
    display: 'flex',
    alignItems: 'stretch',
    zIndex: 10000,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  immersiveBarAction: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    gap: '8px',
  },
};

export default LandingPage;
