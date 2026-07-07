import React, { useEffect } from 'react';
import { Lang, experience, skills, UI } from '../data';

interface Props {
  lang: Lang;
  onClose: () => void;
}

const ResumeView: React.FC<Props> = ({ lang, onClose }) => {
  const t = UI[lang];
  const exp = experience[lang];
  const sk = skills[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div style={s.backdrop} onClick={onClose}>
      {/* Toolbar — hidden on print via .no-print class */}
      <div className="no-print" style={s.toolbar}>
        <button style={s.printBtn} onClick={() => window.print()}>
          {t.resumeUI.print}
        </button>
        <button style={s.closeBtn} onClick={onClose}>{t.resumeUI.close}</button>
      </div>

      {/* Paper */}
      <div id="resume-print-root" style={s.paper} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={s.header}>
          <h1 style={s.name}>Youssef Baamel</h1>
          <div style={s.contactLine}>
            <a href="mailto:hi@youssefbaamel.com" style={s.contactLink}>hi@youssefbaamel.com</a>
            <span style={s.dot}>·</span>
            <a href="https://youssefbaamel.com" style={s.contactLink}>youssefbaamel.com</a>
            <span style={s.dot}>·</span>
            <a href="https://linkedin.com/in/baamelyoussef" style={s.contactLink}>linkedin/baamelyoussef</a>
            <span style={s.dot}>·</span>
            <a href="https://github.com/baamelyoussef" style={s.contactLink}>github/baamelyoussef</a>
          </div>
        </div>

        {/* Experience */}
        <section style={s.section}>
          <h2 style={s.sectionHeading}>{t.resumeUI.experience}</h2>
          <hr style={s.rule} />
          {exp.map((e) => (
            <div key={e.company} style={s.entry}>
              <div style={s.entryHeader}>
                <span style={s.entryCompany}>{e.company}</span>
                <span style={s.entryPeriod}>{e.period}</span>
              </div>
              <div style={s.entryRole}>{e.role}</div>
              <ul style={s.bullets}>
                {e.bullets.map((b, i) => (
                  <li key={i} style={s.bullet}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Technical Skills */}
        <section style={s.section}>
          <h2 style={s.sectionHeading}>{t.resumeUI.skills}</h2>
          <hr style={s.rule} />
          <table style={s.skillsTable}>
            <tbody>
              {sk.map((row) => (
                <tr key={row.cat}>
                  <td style={s.skillCat}>{row.cat}</td>
                  <td style={s.skillItems}>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
};

const s: { [k: string]: React.CSSProperties } = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 999999,
    overflowY: 'auto',
    paddingBottom: '40px',
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  printBtn: {
    background: '#fff',
    color: '#111',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 24px',
    fontFamily: 'monospace',
    fontSize: '0.82rem',
    cursor: 'pointer',
    letterSpacing: '0.03em',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '10px 18px',
    fontFamily: 'monospace',
    fontSize: '0.82rem',
    cursor: 'pointer',
  },
  paper: {
    background: '#fff',
    maxWidth: '720px',
    margin: '24px auto 0',
    padding: '48px 52px',
    boxSizing: 'border-box',
    fontFamily: '"Georgia", "Times New Roman", serif',
    color: '#111',
    lineHeight: 1.45,
    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  name: {
    fontSize: '1.9rem',
    fontWeight: 700,
    fontFamily: '"Georgia", serif',
    letterSpacing: '0.02em',
    margin: '0 0 6px',
    color: '#000',
  },
  contactLine: {
    fontSize: '0.78rem',
    color: '#333',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '6px',
    alignItems: 'center',
  },
  contactLink: {
    color: '#1a1a8c',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontSize: '0.75rem',
  },
  dot: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: '0.75rem',
  },
  section: {
    marginTop: '16px',
  },
  sectionHeading: {
    fontSize: '0.88rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: '0 0 3px',
    fontFamily: '"Georgia", serif',
    color: '#000',
  },
  rule: {
    border: 'none',
    borderTop: '1.5px solid #111',
    margin: '0 0 10px',
  },
  entry: {
    marginBottom: '12px',
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
  },
  entryCompany: {
    fontWeight: 700,
    fontSize: '0.88rem',
    color: '#000',
    fontFamily: '"Georgia", serif',
  },
  entryPeriod: {
    fontSize: '0.76rem',
    color: '#444',
    fontFamily: 'monospace',
    flexShrink: 0,
  },
  entryRole: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: '4px',
    fontFamily: '"Georgia", serif',
  },
  bullets: {
    paddingLeft: '18px',
    margin: 0,
  },
  bullet: {
    fontSize: '0.8rem',
    color: '#222',
    lineHeight: 1.5,
    marginBottom: '2px',
    fontFamily: '"Georgia", serif',
  },
  skillsTable: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  skillCat: {
    fontWeight: 700,
    fontSize: '0.8rem',
    paddingRight: '12px',
    paddingBottom: '3px',
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    fontFamily: '"Georgia", serif',
    color: '#000',
  },
  skillItems: {
    fontSize: '0.8rem',
    color: '#222',
    paddingBottom: '3px',
    fontFamily: '"Georgia", serif',
  },
};

export default ResumeView;
