import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));


const LogoLoop = memo(
	({
		logos,
		speed = 120,
		direction = 'left',
		width = '100%',
		logoHeight = 28,
		gap = 32,
		pauseOnHover,
		hoverSpeed,
		fadeOut = false,
		fadeOutColor,
		scaleOnHover = false,
		renderItem,
		ariaLabel = 'Partner logos',
		className,
		style,
		repeatCount = 2
	}) => {
		const containerRef = useRef(null);
		const trackRef = useRef(null);
		const seqRef = useRef(null);

		const [seqWidth, setSeqWidth] = useState(0);
		const [seqHeight, setSeqHeight] = useState(0);
		const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
		const [isHovered, setIsHovered] = useState(false);

		const effectiveHoverSpeed = useMemo(() => {
			if (hoverSpeed !== undefined) return hoverSpeed;
			if (pauseOnHover === true) return 0;
			if (pauseOnHover === false) return undefined;
			return 0;
		}, [hoverSpeed, pauseOnHover]);

		const isVertical = direction === 'up' || direction === 'down';

		const targetVelocity = useMemo(() => {
			const magnitude = Math.abs(speed);
			let directionMultiplier;
			if (isVertical) {
				directionMultiplier = direction === 'up' ? 1 : -1;
			} else {
				directionMultiplier = direction === 'left' ? 1 : -1;
			}
			const speedMultiplier = speed < 0 ? -1 : 1;
			return magnitude * directionMultiplier * speedMultiplier;
		}, [speed, direction, isVertical]);

		// ...existing hooks: useResizeObserver, useImageLoader, useAnimationLoop...

		// Animación horizontal basada en tiempo (deltaTime)
		const [offset, setOffset] = useState(0);
		const lastTimeRef = useRef(null);
		const [trackWidth, setTrackWidth] = useState(0);

		useEffect(() => {
			if (trackRef.current) {
				setTrackWidth(trackRef.current.scrollWidth);
			}
		}, [logos]);

		useEffect(() => {
			let animationId;
			const animate = (timestamp) => {
				if (lastTimeRef.current === null) {
					lastTimeRef.current = timestamp;
					animationId = requestAnimationFrame(animate);
					return;
				}

				const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Convertir a segundos
				lastTimeRef.current = timestamp;

				// Speed en pixels por segundo
				const speedPerSecond = typeof speed === 'number' ? speed * 50 : 60; // 50px base por unidad de speed
				const movement = speedPerSecond * deltaTime;

				setOffset(prev => {
					const newOffset = prev + movement;
					// Cuando todo el track se fue a la izquierda, reinicia desde la derecha
					if (newOffset >= trackWidth) return 0;
					return newOffset;
				});

				animationId = requestAnimationFrame(animate);
			};

			animationId = requestAnimationFrame(animate);
			return () => {
				cancelAnimationFrame(animationId);
				lastTimeRef.current = null;
			};
		}, [trackWidth, speed]);

		// Duplicar logos para efecto seamless, configurable
		// Usar el prop repeatCount, o valor por defecto
		const effectiveRepeatCount = typeof repeatCount === 'number' ? repeatCount : 2;
		const loopLogos = Array(effectiveRepeatCount).fill(logos).flat();

		return (
			<div ref={containerRef} className="logoloop logoloop--horizontal" style={{ width: '100%', overflow: 'hidden', position: 'relative' }} role="region" aria-label={ariaLabel}>
				<div
					className="logoloop__track"
					ref={trackRef}
					style={{
						display: 'flex',
						transform: `translateX(-${offset}px)`,
						transition: 'transform 0.1s linear',
						width: trackWidth ? trackWidth * effectiveRepeatCount : 'auto',
					}}
				>
					{loopLogos.map((item, idx) => (
						<div className="logoloop__item" key={idx} style={{ minWidth: logoHeight, marginRight: gap }}>
							<img src={item.src} alt={item.alt} style={{ height: logoHeight }} />
						</div>
					))}
				</div>
			</div>
		);

		// Cierre del componente
	}
);

export default LogoLoop;
