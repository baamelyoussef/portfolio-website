import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    onEnter: () => void;
    videoSrc?: string;
};

const MIN_W = 260;
const MAX_W = 700;

const FloatingPreview: React.FC<Props> = ({ onEnter, videoSrc }) => {
    const [visible, setVisible] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null); // null = use default CSS bottom-left
    const [width, setWidth] = useState(420);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, w: 0 });
    const ref = useRef<HTMLDivElement>(null);

    // drag
    const onDragMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        // on first drag, convert bottom-left CSS position to top-left coords
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

    // resize
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
            const leftEdge = pos ? pos.x : 24;
            const clamped = Math.min(newW, window.innerWidth - leftEdge);
            setWidth(clamped);
        };
        const onUp = () => setResizing(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resizing, pos]);

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div
            ref={ref}
            style={{
                position: 'fixed',
                zIndex: 10000,
                width,
                left: pos ? pos.x : 24,
                top: pos ? pos.y : 'auto',
                bottom: pos ? 'auto' : 24,
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
            {/* blurred video layer — sits behind header & footer */}
            {videoSrc && videoReady && (
                <video
                    src={videoSrc}
                    style={s.blurredBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            )}

            {/* header — drag handle */}
            <div style={s.header} onMouseDown={onDragMouseDown}>
                <span style={s.headerLabel}>◆ Immersive Preview</span>
                <button
                    style={s.dismiss}
                    onClick={(e) => { e.stopPropagation(); setVisible(false); }}
                    title="Close"
                >
                    ✕
                </button>
            </div>

            {/* video */}
            <div style={s.videoWrap}>
                {!videoReady && (
                    <div style={s.videoPlaceholder}>
                        <VideoLoader />
                    </div>
                )}
                {videoSrc && (
                    <video
                        src={videoSrc}
                        style={{ ...s.video, opacity: videoReady ? 1 : 0 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlay={() => setVideoReady(true)}
                    />
                )}
            </div>

            {/* footer — CTA */}
            <div style={s.footer}>
                <span style={s.footerLabel}>3D desk experience</span>
                <button style={s.cta} onClick={onEnter}>
                    Enter →
                </button>
            </div>

            {/* resize — invisible hit area */}
            <div
                style={s.resizeHandle}
                onMouseDown={onResizeMouseDown}
            />
        </div>,
        document.body
    );
};

const VideoLoader: React.FC = () => {
    const [dots, setDots] = useState('');
    useEffect(() => {
        const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400);
        return () => clearInterval(id);
    }, []);
    return (
        <div style={loader.wrap}>
            <span style={loader.line}>[ LOADING PREVIEW{dots.padEnd(3, ' ')} ]</span>
            <div style={loader.bar}>
                <div style={loader.barFill} />
            </div>
        </div>
    );
};

const loader: { [key: string]: React.CSSProperties } = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
    },
    line: {
        fontFamily: 'monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.45)',
    },
    bar: {
        width: '120px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        width: '40%',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '2px',
        animation: 'scan 1.2s ease-in-out infinite alternate',
    },
};

const s: { [key: string]: React.CSSProperties } = {
    blurredBg: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(32px)',
        transform: 'scale(1.1)', // prevents blur edge artifacts
        zIndex: 0,
        opacity: 0.5,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        cursor: 'grab',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent',
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
        flexShrink: 0,
    },
    videoWrap: {
        position: 'relative',
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexShrink: 0,
        zIndex: 1,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    videoPlaceholder: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent',
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
    cta: {
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '6px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        padding: '7px 16px',
        cursor: 'pointer',
        transition: 'background 0.15s',
    },
    resizeHandle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '24px',
        height: '24px',
        cursor: 'ew-resize',
    },
};

export default FloatingPreview;
