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
    const [pos, setPos] = useState({ x: 24, y: -1 });
    const [width, setWidth] = useState(420);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, w: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const h = ref.current.offsetHeight;
            setPos({ x: 24, y: window.innerHeight - h - 24 });
        }
    }, []);

    // drag
    const onDragMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
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
            const clamped = Math.min(newW, window.innerWidth - pos.x);
            setWidth(clamped);
        };
        const onUp = () => setResizing(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resizing, pos.x]);

    if (!visible) return null;

    return ReactDOM.createPortal(
        <div
            ref={ref}
            style={{
                position: 'fixed',
                zIndex: 10000,
                width,
                left: pos.x,
                top: pos.y >= 0 ? pos.y : 'auto',
                bottom: pos.y < 0 ? 24 : 'auto',
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
                {videoSrc ? (
                    <video
                        src={videoSrc}
                        style={s.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <div style={s.videoPlaceholder}>
                        <span style={s.placeholderText}>Video coming soon</span>
                    </div>
                )}
            </div>

            {/* footer — CTA */}
            <div style={s.footer}>
                <span style={s.footerLabel}>3D desk experience</span>
                <button style={s.cta} onClick={onEnter}>
                    Enter →
                </button>
            </div>

            {/* resize grip */}
            <div
                style={s.resizeHandle}
                onMouseDown={onResizeMouseDown}
                title="Resize"
            />
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
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(0,0,0,0.5)',
        flexShrink: 0,
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
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexShrink: 0,
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    videoPlaceholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '168px',
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
        borderTop: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(0,0,0,0.5)',
        flexShrink: 0,
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
        bottom: 4,
        right: 4,
        width: '16px',
        height: '16px',
        cursor: 'ew-resize',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        backgroundPosition: '1px 1px',
        backgroundRepeat: 'repeat',
        opacity: 0.7,
    },
};

export default FloatingPreview;
