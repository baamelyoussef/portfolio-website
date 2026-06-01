import React, { useState, useEffect } from 'react';
import FloatingPreview from './FloatingPreview';

type Props = { onEnter: () => void };

const experience = [
    {
        role: 'Front End Engineer',
        company: 'BTECHNOLOGIE · Bouygues Telecom',
        period: 'Jan 2025 — Present',
        desc: 'Building client-facing web & mobile applications with React, Next.js, and TypeScript for Bouygues Telecom. Manage a partials system driven by a Directus headless CMS, and use AWS for backend services and asset processing.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bouygues_Telecom_%28alt_logo%29.svg/1280px-Bouygues_Telecom_%28alt_logo%29.svg.png',
    },
    {
        role: 'Full Stack Engineer',
        company: '1450 Factory',
        period: 'Sep 2023 — Sep 2024',
        desc: 'Developed web and mobile applications across the full stack for clients in pharmaceuticals. Key role on blinkpharma.ma — built the original Python backend and contributed to the later migration to a Next.js fullstack architecture.',
        logo: 'https://i.ibb.co/zWTvrR62/df0d16f8b3cb4a058cf2c0fa75f9d3f7.png',
    },
    {
        role: 'Full Stack Engineer',
        company: 'MEDIOT',
        period: 'Jun 2023 — Sep 2023',
        desc: 'Full-stack development of medical-sector applications using React.js and Node.js in an Agile environment, delivering features end to end.',
        logo: 'https://mediot.tech/wp-content/uploads/2024/05/MEDIOT_LOGO.png',
    },
    {
        role: 'Full Stack Engineer',
        company: 'Algo Consulting Group · ONCF',
        period: 'Jan 2022 — Mar 2023',
        desc: 'Full-stack development with React.js and Node.js for ONCF, Morocco\'s national railway. Enhanced the Supratours and ONCF Voyages train-ticket platforms, added RTL Arabic localization, and advised on UX for the merchant site redesign.',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeShVCtZHpRFBYcO32O89EmsabzU6voOFxA&s',
    },
    {
        role: 'Full Stack Developer',
        company: 'Freelance',
        period: 'Feb 2020 — Dec 2021',
        desc: 'Delivered full-stack projects using Python (Django), Node.js, React.js, and Vue.js, working across front-end, backend, and CMS development for various clients.',
        logo: null,
    },
];

const projects = [
    { title: 'BaamelOS', tags: 'React · TypeScript · Design', year: '2024' },
    { title: 'Immersive Portfolio', tags: 'Three.js · WebGL · 3D', year: '2024' },
    { title: 'Project Three', tags: 'Node.js · API', year: '2023' },
    { title: 'Project Four', tags: 'React · UI/UX', year: '2023' },
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

const LandingPage: React.FC<Props> = ({ onEnter }) => {
    const isMobile = useIsMobile();

    return (
        <>
            <div style={s.root}>
                <div style={s.scroll}>

                    {/* NAV */}
                    <nav style={s.nav}>
                        <div style={{ ...s.innerFlex, padding: isMobile ? '0 16px' : '0 32px' }}>
                            {isMobile ? (
                                <>
                                    <button className="spin-btn" onClick={onEnter}>
                                        <span className="spin-btn-inner">✦ Try Immersive</span>
                                    </button>
                                    <div style={{ ...s.navLinks, gap: '16px' }}>
                                        <a href="#experience" style={s.navLink}>Experience</a>
                                        <a href="#work" style={s.navLink}>Work</a>
                                        <a href="#contact" style={s.navLink}>Contact</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span style={s.navName}>Youssef Baamel</span>
                                    <div style={{ ...s.navLinks, gap: '28px' }}>
                                        <a href="#experience" style={s.navLink}>Experience</a>
                                        <a href="#work" style={s.navLink}>Work</a>
                                        <a href="#contact" style={s.navLink}>Contact</a>
                                    </div>
                                </>
                            )}
                        </div>
                    </nav>

                    <div style={{ ...s.inner, padding: isMobile ? '0 16px' : '0 32px' }}>

                        {/* HERO */}
                        <section style={{ ...s.hero, padding: isMobile ? '40px 0 32px' : '80px 0 64px' }}>
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
                            <div style={s.expList}>
                                {experience.map((exp) => (
                                    <div key={exp.company} style={s.expCard}>
                                        <div style={s.expLogoWrap}>
                                            {exp.logo ? (
                                                <img src={exp.logo} alt={exp.company} style={s.expLogo} />
                                            ) : (
                                                <div style={s.expLogoFallback}>
                                                    <span style={s.expLogoInitial}>F</span>
                                                </div>
                                            )}
                                        </div>
                                        <div style={s.expBody}>
                                            <div style={s.expTop}>
                                                <span style={s.cardRole}>{exp.role}</span>
                                                <span style={s.cardPeriod}>{exp.period}</span>
                                            </div>
                                            <span style={s.cardCompany}>{exp.company}</span>
                                            <p style={s.cardDesc}>{exp.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* PROJECTS */}
                        <section id="work" style={s.section}>
                            <p style={s.label}>Work</p>
                            <div style={{ ...s.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))' }}>
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
                            <a href="mailto:hi@youssefbaamel.com" style={{ ...s.email, fontSize: isMobile ? '1rem' : 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                                hi@youssefbaamel.com
                            </a>
                        </section>

                        {/* FOOTER */}
                        <footer style={{ ...s.footer, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '0', alignItems: isMobile ? 'flex-start' : 'center' }}>
                            <span style={s.footerCopy}>© {new Date().getFullYear()} Youssef Baamel</span>
                            <div style={s.footerLinks}>
                                <a href="https://github.com/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">GitHub</a>
                                <a href="https://linkedin.com/in/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </footer>

                    </div>
                </div>
            </div>

            {!isMobile && <FloatingPreview onEnter={onEnter} videoSrc="/videos/preview-ix.mp4" />}
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
    },
    navLink: {
        color: 'rgba(0,0,0,0.4)',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontFamily: 'monospace',
        letterSpacing: '0.03em',
    },
    hero: {
        maxWidth: '680px',
    },
    heroIntro: {
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
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
    expList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    expCard: {
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        boxSizing: 'border-box',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    },
    expLogoWrap: {
        width: '120px',
        height: '120px',
        borderRadius: '10px',
        flexShrink: 0,
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        boxSizing: 'border-box',
    },
    expLogo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
    },
    expLogoFallback: {
        width: '100%',
        height: '100%',
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
        flex: 1,
        minWidth: 0,
    },
    expTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        gap: '4px',
    },
    cardRole: {
        fontWeight: 700,
        fontSize: '0.9rem',
        color: '#111',
        fontFamily: 'monospace',
    },
    cardPeriod: {
        fontSize: '0.7rem',
        color: 'rgba(0,0,0,0.35)',
        fontFamily: 'monospace',
        flexShrink: 0,
    },
    cardCompany: {
        fontSize: '0.78rem',
        color: 'rgba(0,0,0,0.5)',
        fontFamily: 'monospace',
    },
    cardDesc: {
        fontSize: '0.76rem',
        color: 'rgba(0,0,0,0.4)',
        fontFamily: 'monospace',
        margin: '4px 0 0',
        lineHeight: 1.6,
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
};

export default LandingPage;
