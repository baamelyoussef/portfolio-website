import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    videoSrc?: string;
};

const MIN_W = 260;
const MAX_W = 700;

const IntroVideo: React.FC<Props> = ({ videoSrc }) => {
    const [visible, setVisible] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const [muted, setMuted] = useState(false);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [width, setWidth] = useState(380);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, w: 0 });
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    const onDragMouseDown = (e: React.MouseEvent) => {
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
            const x = Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth - w);
            const y = Math.min(Math.max(0, e.clientY - dragOffset.current.y), window.innerHeight - h);
            setPos({ x, y });
        };
        const onUp = () => setDragging(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [dragging]);

    const onResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setResizing(true);
        resizeStart.current = { x: e.clientX, w: width };
    };

    useEffect(() => {
        if (!resizing) return;
        const onMove = (e: MouseEvent) => {
            const delta = e.clientX - resizeStart.current.x;
            const newW = Math.min(MAX_W, Math.max(MIN_W, resizeStart.current.w + delta));
            setWidth(newW);
        };
        const onUp = () => setResizing(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resizing]);

    if (!visible) return null;

    const rightDefault = 24;

    return ReactDOM.createPortal(
        <div
            ref={ref}
            style={{
                position: 'fixed',
                zIndex: 10000,
                width,
                ...(pos
                    ? { left: pos.x, top: pos.y }
                    : { right: rightDefault, bottom: 24 }),
                background: 'rgba(15, 15, 25, 0.75)',
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
            {/* drag handle header */}
            <div style={s.header} onMouseDown={onDragMouseDown}>
                <span style={s.headerLabel}>◆ Intro</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button
                        style={s.iconBtn}
                        onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }}
                        title={muted ? 'Unmute' : 'Mute'}
                    >
                        {muted ? '🔇' : '🔊'}
                    </button>
                    <button
                        style={s.dismiss}
                        onClick={(e) => { e.stopPropagation(); setVisible(false); }}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* video */}
            <div style={s.videoWrap}>
                {!videoSrc || !videoReady ? (
                    <div style={s.placeholder}>
                        <span style={s.placeholderIcon}>🎥</span>
                        <span style={s.placeholderText}>Intro coming soon</span>
                    </div>
                ) : null}
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
        paddingBottom: '56.25%',
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
    placeholderIcon: {
        fontSize: '1.8rem',
        opacity: 0.4,
    },
    placeholderText: {
        fontFamily: 'monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.3)',
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
