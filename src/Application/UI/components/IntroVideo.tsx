import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    videoSrc?: string;
    isMobile?: boolean;
};

const MIN_W = 260;
const MAX_W = 700;

const IntroVideo: React.FC<Props> = ({ videoSrc, isMobile }) => {
    const [open, setOpen] = useState(true);
    const [animating, setAnimating] = useState(false);
    const [muted, setMuted] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    // desktop-only
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [width, setWidth] = useState(420);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, w: 0 });
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    // ── Desktop drag ────────────────────────────────────────────────────────
    const onDragMouseDown = (e: React.MouseEvent) => {
        if (isMobile) return;
        e.preventDefault();
        if (!pos && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPos({ x: rect.left, y: rect.top });
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        } else if (pos) {
            dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }
        setDragging(true);
    };

    useEffect(() => {
        if (!dragging) return;
        const onMove = (e: MouseEvent) => {
            const el = ref.current;
            const w = el ? el.offsetWidth : width;
            const h = el ? el.offsetHeight : 200;
            setPos({
                x: Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth - w),
                y: Math.min(Math.max(0, e.clientY - dragOffset.current.y), window.innerHeight - h),
            });
        };
        const onUp = () => setDragging(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    }, [dragging]);

    const onResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        setResizing(true);
        resizeStart.current = { x: e.clientX, w: width };
    };

    useEffect(() => {
        if (!resizing) return;
        const onMove = (e: MouseEvent) => {
            const newW = Math.min(MAX_W, Math.max(MIN_W, resizeStart.current.w + (e.clientX - resizeStart.current.x)));
            setWidth(newW);
        };
        const onUp = () => setResizing(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    }, [resizing]);

    // ── Mobile: shrink/expand ────────────────────────────────────────────────
    const handleClose = () => {
        setAnimating(true);
        setTimeout(() => { setOpen(false); setAnimating(false); }, 350);
    };

    const handleReopen = () => {
        setOpen(true);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 350);
    };

    // ── Shared video block ──────────────────────────────────────────────────
    const videoBlock = (
        <div style={s.videoWrap}>
            {(!videoSrc || !videoReady) && (
                <div style={s.placeholder}>
                    <span style={s.placeholderIcon}>🎥</span>
                    <span style={s.placeholderText}>Intro coming soon</span>
                </div>
            )}
            {videoSrc && (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    style={{ ...s.video, opacity: videoReady ? 1 : 0 }}
                    autoPlay
                    muted={muted}
                    playsInline
                    onCanPlay={() => setVideoReady(true)}
                />
            )}
        </div>
    );

    // ── MOBILE ──────────────────────────────────────────────────────────────
    if (isMobile) {
        return ReactDOM.createPortal(
            <>
                {/* Full widget — visible when open or mid-animation */}
                {(open || animating) && (
                    <div style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 16,
                        left: 16,
                        zIndex: 10001,
                        background: 'rgba(15,15,25,0.85)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderRadius: '14px',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                        overflow: 'hidden',
                        transformOrigin: 'bottom right',
                        transform: open && !animating ? 'scale(1)' : animating && open ? 'scale(1)' : 'scale(0)',
                        opacity: open ? 1 : 0,
                        transition: 'transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease, border-radius 0.35s ease',
                    }}>
                        <div style={s.header} onMouseDown={onDragMouseDown}>
                            <span style={s.headerLabel}>◆ Intro</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button style={s.iconBtn} onClick={() => setMuted(m => !m)} title={muted ? 'Unmute' : 'Mute'}>
                                    {muted ? '🔇' : '🔊'}
                                </button>
                                <button style={s.dismiss} onClick={handleClose} title="Minimise">✕</button>
                            </div>
                        </div>
                        {videoBlock}
                        <div style={s.footer}>
                            <span style={s.footerLabel}>Youssef Baamel</span>
                        </div>
                    </div>
                )}

                {/* Floating button when minimised */}
                {!open && !animating && (
                    <button
                        onClick={handleReopen}
                        style={{
                            position: 'fixed',
                            bottom: 24,
                            right: 16,
                            zIndex: 10001,
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            background: 'rgba(15,15,25,0.9)',
                            border: '1px solid rgba(255,255,255,0.22)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3rem',
                            animation: 'pulseBtn 2.5s ease-in-out infinite',
                        }}
                        title="Open intro"
                    >
                        🎥
                    </button>
                )}
            </>,
            document.body
        );
    }

    // ── DESKTOP ─────────────────────────────────────────────────────────────
    return ReactDOM.createPortal(
        <div
            ref={ref}
            style={{
                position: 'fixed',
                zIndex: 10000,
                width,
                ...(pos ? { left: pos.x, top: pos.y } : { right: 24, bottom: 24 }),
                background: 'rgba(15,15,25,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '14px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                userSelect: 'none',
                cursor: dragging ? 'grabbing' : 'default',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={s.header} onMouseDown={onDragMouseDown}>
                <span style={s.headerLabel}>◆ Intro</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button style={s.iconBtn} onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }} title={muted ? 'Unmute' : 'Mute'}>
                        {muted ? '🔇' : '🔊'}
                    </button>
                    <button style={s.dismiss} onClick={(e) => { e.stopPropagation(); /* desktop just stays */ }} title="Close">✕</button>
                </div>
            </div>
            {videoBlock}
            <div style={s.footer}>
                <span style={s.footerLabel}>Youssef Baamel</span>
            </div>
            <div style={s.resizeHandle} onMouseDown={onResizeMouseDown} />
        </div>,
        document.body
    );
};

const s: { [key: string]: React.CSSProperties } = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        cursor: 'grab',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
    },
    headerLabel: {
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.85)',
    },
    iconBtn: {
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '50%',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.7rem',
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    dismiss: {
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50%',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.7rem',
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: 0,
    },
    videoWrap: {
        position: 'relative',
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexShrink: 0,
        zIndex: 1,
    },
    video: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    placeholder: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    placeholderIcon: { fontSize: '1.8rem', opacity: 0.4 },
    placeholderText: {
        fontFamily: 'monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
    },
    footerLabel: {
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
    },
    resizeHandle: {
        position: 'absolute',
        bottom: 0, right: 0,
        width: '24px', height: '24px',
        cursor: 'ew-resize',
    },
};

export default IntroVideo;
