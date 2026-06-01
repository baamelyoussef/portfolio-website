import React, { useState } from 'react';
import FloatingPreview from './FloatingPreview';

type Props = { onEnter: () => void };

const experience = [
    {
        role: 'Software Engineer',
        company: 'Company Name',
        period: '2024 — Present',
        desc: 'Short description of what you did and built here.',
    },
    {
        role: 'Frontend Developer',
        company: 'Another Company',
        period: '2022 — 2024',
        desc: 'Short description of what you did and built here.',
    },
    {
        role: 'Junior Developer',
        company: 'First Company',
        period: '2021 — 2022',
        desc: 'Short description of what you did and built here.',
    },
];

const projects = [
    { title: 'BaamelOS', tags: 'React · TypeScript · Design', year: '2024' },
    { title: 'Immersive Portfolio', tags: 'Three.js · WebGL · 3D', year: '2024' },
    { title: 'Project Three', tags: 'Node.js · API', year: '2023' },
    { title: 'Project Four', tags: 'React · UI/UX', year: '2023' },
];

const LandingPage: React.FC<Props> = ({ onEnter }) => {
    const [top, setTop] = useState(0);

    const advance = () => setTop((t) => (t + 1) % experience.length);

    return (
        <>
            <div style={s.root}>
                <div style={s.scroll}>

                    {/* NAV */}
                    <nav style={s.nav}><div style={s.innerFlex}>
                        <span style={s.navName}>Youssef Baamel</span>
                        <div style={s.navLinks}>
                            <a href="#experience" style={s.navLink}>Experience</a>
                            <a href="#work" style={s.navLink}>Work</a>
                            <a href="#contact" style={s.navLink}>Contact</a>
                        </div>
                    </div></nav>

                    <div style={s.inner}>
                    {/* HERO */}
                    <section style={s.hero}>
                        <p style={s.heroIntro}>
                            Youssef is a software engineer who builds performant,
                            visually compelling things for the web — from polished UIs
                            to immersive 3D experiences.
                        </p>
                        <p style={s.heroStatus}>Open to full-time roles</p>
                    </section>

                    {/* EXPERIENCE */}
                    <section id="experience" style={s.section}>
                        <div style={s.labelRow}>
                            <p style={s.label}>Experience</p>
                            <a href="/resume.pdf" download style={s.resumeBtn}>Download Resume ↓</a>
                        </div>
                        <div style={s.stackWrap} onClick={advance}>
                            {[...experience].map((exp, i) => {
                                const pos = (i - top + experience.length) % experience.length;
                                return (
                                    <div
                                        key={exp.company}
                                        style={{
                                            ...s.card,
                                            transform: pos === 0
                                                ? 'translateX(0px) translateY(0px) rotate(0deg)'
                                                : pos === 1
                                                ? 'translateX(10px) translateY(-10px) rotate(1.5deg)'
                                                : 'translateX(20px) translateY(-20px) rotate(3deg)',
                                            opacity: pos === 0 ? 1 : pos === 1 ? 0.6 : 0.3,
                                            zIndex: experience.length - pos,
                                        }}
                                    >
                                        <div style={s.cardTop}>
                                            <span style={s.cardRole}>{exp.role}</span>
                                            <span style={s.cardPeriod}>{exp.period}</span>
                                        </div>
                                        <span style={s.cardCompany}>{exp.company}</span>
                                        <p style={s.cardDesc}>{exp.desc}</p>
                                        {pos === 0 && (
                                            <span style={s.cardHint}>click to cycle ↓</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* PROJECTS */}
                    <section id="work" style={s.section}>
                        <p style={s.label}>Work</p>
                        <div style={s.grid}>
                            {projects.map((p) => (
                                <div key={p.title} style={s.projectCard}>
                                    <div style={s.projectTop}>
                                        <span style={s.projectTitle}>{p.title}</span>
                                        <span style={s.projectYear}>{p.year}</span>
                                    </div>
                                    <span style={s.projectTags}>{p.tags}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section id="contact" style={s.section}>
                        <p style={s.label}>Contact</p>
                        <a href="mailto:hi@youssefbaamel.com" style={s.email}>
                            hi@youssefbaamel.com
                        </a>
                    </section>

                    {/* FOOTER */}
                    <footer style={s.footer}>
                        <span style={s.footerCopy}>© {new Date().getFullYear()} Youssef Baamel</span>
                        <div style={s.footerLinks}>
                            <a href="https://github.com/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">GitHub</a>
                            <a href="https://linkedin.com/in/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>
                    </footer>
                    </div>

                </div>
            </div>

            <FloatingPreview onEnter={onEnter} videoSrc="/videos/preview-ix.mp4" />
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
        padding: '0 32px',
        width: '100%',
        boxSizing: 'border-box',
    },
    innerFlex: {
        maxWidth: '780px',
        margin: '0 auto',
        padding: '0 32px',
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
        gap: '28px',
    },
    navLink: {
        color: 'rgba(0,0,0,0.4)',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontFamily: 'monospace',
        letterSpacing: '0.03em',
    },
    hero: {
        padding: '80px 0 64px',
        maxWidth: '680px',
    },
    heroIntro: {
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        lineHeight: 1.4,
        color: '#111',
        fontFamily: 'monospace',
        fontWeight: 400,
        margin: '0 0 20px',
    },
    heroStatus: {
        fontSize: '0.8rem',
        color: 'rgba(0,0,0,0.35)',
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: 0,
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
    },
    stackWrap: {
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        height: '160px',
        cursor: 'pointer',
    },
    card: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '10px',
        padding: '24px 28px',
        boxSizing: 'border-box',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    cardRole: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#111',
        fontFamily: 'monospace',
    },
    cardPeriod: {
        fontSize: '0.72rem',
        color: 'rgba(0,0,0,0.35)',
        fontFamily: 'monospace',
    },
    cardCompany: {
        fontSize: '0.8rem',
        color: 'rgba(0,0,0,0.5)',
        fontFamily: 'monospace',
    },
    cardDesc: {
        fontSize: '0.78rem',
        color: 'rgba(0,0,0,0.4)',
        fontFamily: 'monospace',
        margin: 0,
        lineHeight: 1.5,
    },
    cardHint: {
        fontSize: '0.65rem',
        color: 'rgba(0,0,0,0.2)',
        fontFamily: 'monospace',
        marginTop: '4px',
        letterSpacing: '0.05em',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1px',
        background: 'rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    projectCard: {
        background: '#f9f9f7',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: 'pointer',
        boxSizing: 'border-box',
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
        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
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
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
};

export default LandingPage;
