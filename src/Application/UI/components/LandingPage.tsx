import React, { useState } from 'react';
import FloatingPreview from './FloatingPreview';

type Props = {
    onEnter: () => void;
};

const projects = [
    {
        id: '01',
        title: 'BaamelOS',
        tags: ['React', 'TypeScript', 'Design'],
        description: 'A browser-based operating system experience.',
    },
    {
        id: '02',
        title: 'Immersive Portfolio',
        tags: ['Three.js', 'WebGL', '3D'],
        description: 'A 3D interactive portfolio built in the browser.',
    },
    {
        id: '03',
        title: 'Project Three',
        tags: ['Node.js', 'API'],
        description: 'Short description of the project goes here.',
    },
    {
        id: '04',
        title: 'Project Four',
        tags: ['React', 'UI/UX'],
        description: 'Short description of the project goes here.',
    },
];

const skills = [
    { label: 'Frontend Development', items: ['React', 'TypeScript', 'Three.js', 'WebGL', 'CSS'] },
    { label: 'Backend Development', items: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL'] },
    { label: 'Tools & Workflow', items: ['Git', 'Webpack', 'Figma', 'Docker'] },
];

const LandingPage: React.FC<Props> = ({ onEnter }) => {
    const [openSkill, setOpenSkill] = useState<number | null>(null);

    return (
        <>
            <div style={s.root}><div style={s.scroll}>

                {/* NAV */}
                <nav style={s.nav}>
                    <span style={s.navLogo}>YB</span>
                    <div style={s.navLinks}>
                        <a href="#work" style={s.navLink}>Work</a>
                        <a href="#skills" style={s.navLink}>Skills</a>
                        <a href="#about" style={s.navLink}>About</a>
                        <a href="#contact" style={s.navLink}>Contact</a>
                        <GlassButton onClick={onEnter}>Enter Experience →</GlassButton>
                    </div>
                </nav>

                {/* HERO */}
                <section style={s.hero}>
                    <p style={s.heroEyebrow}>Software Engineer — Open to full-time roles</p>
                    <h1 style={s.heroHeading}>
                        Hi, I'm{' '}
                        <span style={s.heroName}>Youssef Baamel</span> —<br />
                        I build things for the web.
                    </h1>
                    <p style={s.heroSub}>
                        I design and develop web experiences, from polished UIs
                        to immersive 3D environments in the browser.
                    </p>
                </section>

                {/* WORK */}
                <section id="work" style={s.section}>
                    <h2 style={s.sectionLabel}>Work</h2>
                    <div style={s.grid}>
                        {projects.map((p) => (
                            <div key={p.id} style={s.card}>
                                <span style={s.cardId}>{p.id}</span>
                                <h3 style={s.cardTitle}>{p.title}</h3>
                                <p style={s.cardDesc}>{p.description}</p>
                                <div style={s.tagRow}>
                                    {p.tags.map((t) => (
                                        <span key={t} style={s.tag}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS */}
                <section id="skills" style={s.section}>
                    <h2 style={s.sectionLabel}>Skills</h2>
                    <div style={s.skillList}>
                        {skills.map((sk, i) => (
                            <div key={sk.label} style={s.skillItem}>
                                <button
                                    style={s.skillToggle}
                                    onClick={() => setOpenSkill(openSkill === i ? null : i)}
                                >
                                    <span>{sk.label}</span>
                                    <span style={s.skillArrow}>{openSkill === i ? '▲' : '▼'}</span>
                                </button>
                                {openSkill === i && (
                                    <div style={s.skillTags}>
                                        {sk.items.map((item) => (
                                            <span key={item} style={s.tag}>{item}</span>
                                        ))}
                                    </div>
                                )}
                                <div style={s.divider} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" style={s.section}>
                    <h2 style={s.sectionLabel}>About</h2>
                    <div style={s.glassBox}>
                        <p style={s.aboutText}>
                            I'm a software engineer passionate about building performant and
                            visually compelling web experiences. I enjoy working across the
                            stack — from crafting pixel-perfect UIs to architecting scalable
                            backend systems.
                        </p>
                        <p style={{ ...s.aboutText, marginTop: '16px' }}>
                            When I'm not coding, I'm exploring 3D graphics, WebGL, and
                            interactive media — which led to building this site as an immersive
                            portfolio experience.
                        </p>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" style={s.sectionLast}>
                    <h2 style={s.sectionLabel}>Contact</h2>
                    <div style={s.glassBox}>
                        <p style={s.contactLine}>
                            Open to full-time opportunities and freelance projects.
                        </p>
                        <a href="mailto:imbaamelyoussef@gmail.com" style={s.email}>
                            imbaamelyoussef@gmail.com
                        </a>
                        <div style={s.contactLinks}>
                            <a href="https://github.com/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">GitHub ↗</a>
                            <a href="https://linkedin.com/in/baamelyoussef" style={s.navLink} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer style={s.footer}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} Youssef Baamel
                    </span>
                    <GlassButton onClick={onEnter}>Enter Experience →</GlassButton>
                </footer>
            </div></div>

            <FloatingPreview onEnter={onEnter} videoSrc="/videos/preview-ix.mp4" />
        </>
    );
};

/* Reusable glass button */
const GlassButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: hovered ? '#000' : '#fff',
                backgroundColor: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                padding: '8px 20px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'background-color 0.15s, color 0.15s',
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {children}
        </button>
    );
};

const s: { [key: string]: React.CSSProperties } = {
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0d14 0%, #12082a 40%, #0a1020 100%)',
        color: '#fff',
        fontFamily: 'monospace',
        zIndex: 9999,
        boxSizing: 'border-box',
    },
    scroll: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    nav: {
        position: 'sticky',
        top: 0,
        background: 'rgba(10,10,20,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 48px',
        height: '64px',
        zIndex: 100,
        boxSizing: 'border-box',
    },
    navLogo: {
        fontWeight: 700,
        fontSize: '1.1rem',
        letterSpacing: '0.1em',
        color: '#fff',
        fontFamily: 'monospace',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
    },
    navLink: {
        color: 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        fontSize: '0.85rem',
        letterSpacing: '0.05em',
        fontFamily: 'monospace',
    },
    hero: {
        padding: '100px 48px 80px',
        maxWidth: '900px',
    },
    heroEyebrow: {
        fontSize: '0.8rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        margin: '0 0 24px',
        fontFamily: 'monospace',
    },
    heroHeading: {
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.15,
        margin: '0 0 24px',
        color: '#fff',
        fontFamily: 'monospace',
    },
    heroName: {
        borderBottom: '3px solid rgba(255,255,255,0.6)',
        paddingBottom: '2px',
    },
    heroSub: {
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8,
        margin: 0,
        fontFamily: 'monospace',
    },
    section: {
        padding: '64px 48px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
    },
    sectionLast: {
        padding: '64px 48px 80px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
    },
    sectionLabel: {
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.3)',
        margin: '0 0 40px',
        fontWeight: 400,
        fontFamily: 'monospace',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '12px',
    },
    card: {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'background 0.2s, border-color 0.2s',
    },
    cardId: {
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
        fontFamily: 'monospace',
    },
    cardTitle: {
        fontSize: '1.05rem',
        fontWeight: 700,
        margin: 0,
        color: '#fff',
        fontFamily: 'monospace',
    },
    cardDesc: {
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.5)',
        margin: 0,
        lineHeight: 1.6,
        flex: 1,
        fontFamily: 'monospace',
    },
    tagRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '8px',
    },
    tag: {
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.6)',
        padding: '3px 10px',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    skillList: {
        maxWidth: '640px',
    },
    skillItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    skillToggle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '20px 0',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.8)',
        width: '100%',
        textAlign: 'left',
    },
    skillArrow: {
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.3)',
    },
    skillTags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        paddingBottom: '20px',
    },
    divider: {
        height: '1px',
        background: 'rgba(255,255,255,0.07)',
    },
    glassBox: {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '32px',
        maxWidth: '640px',
        boxSizing: 'border-box',
    },
    aboutText: {
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.8,
        margin: 0,
        fontFamily: 'monospace',
    },
    contactLine: {
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.5)',
        margin: '0 0 20px',
        fontFamily: 'monospace',
    },
    email: {
        display: 'block',
        fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'none',
        borderBottom: '2px solid rgba(255,255,255,0.3)',
        width: 'fit-content',
        marginBottom: '28px',
        paddingBottom: '4px',
        fontFamily: 'monospace',
    },
    contactLinks: {
        display: 'flex',
        gap: '24px',
    },
    footer: {
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
};

export default LandingPage;
