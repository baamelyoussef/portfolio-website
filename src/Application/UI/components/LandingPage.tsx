import React, { useState, useEffect } from 'react';
import FloatingPreview from './FloatingPreview';

type Props = { onEnter: () => void };

const experience = [
    {
        role: 'Front End Engineer',
        company: 'BTECHNOLOGIE · Bouygues Telecom x Accenture',
        period: 'Jan 2025 — Present',
        desc: 'Building client-facing web & mobile applications with React, Next.js, and TypeScript for Bouygues Telecom. Manage a partials system driven by a Directus headless CMS, and use AWS for backend services and asset processing.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bouygues_Telecom_%28alt_logo%29.svg/1280px-Bouygues_Telecom_%28alt_logo%29.svg.png',
    },
    {
        role: 'Full Stack Engineer',
        company: '1450 Factory · Blink Pharma',
        period: 'Sep 2023 — Sep 2024',
        desc: 'Developed web and mobile applications across the full stack for clients in pharmaceuticals. Key role on blinkpharma.ma — built the original Python backend and contributed to the later migration to a Next.js fullstack architecture.',
        logo: 'https://dharab.com/wp-content/uploads/2023/12/blinkpharma-square.png',
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
    {
        title: 'Heald — Put Yourself First',
        tags: 'React Native · iOS · Health & Fitness',
        year: '2025',
        bg: '/images/heald-preview.png',
        link: 'https://apps.apple.com/us/app/heald-put-yourself-first/id6756617487',
        github: null,
    },
    {
        title: 'Blink Premium',
        tags: 'React Native · iOS · Medical',
        year: '2024',
        bg: '/images/blink-premium-preview.png',
        link: 'https://apps.apple.com/ma/app/blink-premium/id1482286159',
        github: null,
    },
    {
        title: 'Debrief',
        tags: 'React · Node.js · Whisper · GPT-4o mini · PostgreSQL · Redis · Docker',
        year: '2026',
        bg: '/images/debrief-preview.png',
        link: 'https://usedbrief.vercel.app/',
        github: 'https://github.com/baamelyoussef/debrief',
    },
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
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

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
                                        <a href="#experience" style={s.navLink} onClick={scrollTo('experience')}>Experience</a>
                                        <a href="#work" style={s.navLink} onClick={scrollTo('work')}>Projects</a>
                                        <a href="#contact" style={s.navLink} onClick={scrollTo('contact')}>Contact</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span style={s.navName}>Youssef Baamel</span>
                                    <div style={{ ...s.navLinks, gap: '28px' }}>
                                        <a href="#experience" style={s.navLink} onClick={scrollTo('experience')}>Experience</a>
                                        <a href="#work" style={s.navLink} onClick={scrollTo('work')}>Projects</a>
                                        <a href="#contact" style={s.navLink} onClick={scrollTo('contact')}>Contact</a>
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
                            <div style={s.labelRow}><p style={s.label}>Projects</p></div>
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
                                        Visit Project ↗
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a href={selectedProject.github} target="_blank" rel="noreferrer" style={s.modalBtnSecondary}>
                                        GitHub ↗
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
    wipBadge: {
        fontSize: '0.6rem',
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        color: '#fff',
        background: '#111',
        borderRadius: '4px',
        padding: '2px 7px',
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
};

export default LandingPage;
