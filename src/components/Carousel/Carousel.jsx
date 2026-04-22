import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import styles from "./Carousel.module.css";
import { getImageUrl } from "../../utils/imageHelper";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`${styles.carouselItem} ${round ? styles.round : ""}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      <img
        className={styles.carouselImage}
        src={item.src}
        alt={item.alt ?? `Slide ${index + 1}`}
        draggable={false}
      />
    </motion.div>
  );
}

export default function Carousel({
  items,
  // lo dejamos como fallback inicial (primer render antes de medir)
  baseWidth = 400,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  // defaults: 3 imágenes iguales
  const DEFAULT_ITEMS = useMemo(
    () => [
      { id: 1, src: getImageUrl('./img/img-01.png'), alt: "Imagen 1" },
      { id: 2, src: getImageUrl('./img/slider02.png'), alt: "Imagen 2" },
      { id: 3, src: getImageUrl('./img/slider03.png'), alt: "Imagen 3" },
    ],
    []
  );

  const resolvedItems = items?.length ? items : DEFAULT_ITEMS;

  const containerRef = useRef(null);

  // ✅ medir width real del contenedor (sin depender de baseWidth)
  const [containerWidth, setContainerWidth] = useState(baseWidth);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w > 0) setContainerWidth(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const containerPadding = 0;
  const itemWidth = Math.max(0, containerWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return resolvedItems;
    if (resolvedItems.length === 0) return [];
    return [resolvedItems[resolvedItems.length - 1], ...resolvedItems, resolvedItems[0]];
  }, [resolvedItems, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // hover
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  // autoplay
  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  // reset cuando cambian items / loop o cuando cambia el ancho (para mantener centrado)
  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [resolvedItems.length, loop, trackItemOffset, x]);

  // clamp cuando no hay loop
  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = resolvedItems.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;

    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    resolvedItems.length === 0
      ? 0
      : loop
      ? (position - 1 + resolvedItems.length) % resolvedItems.length
      : Math.min(position, resolvedItems.length - 1);

  return (
    <div
      ref={containerRef}
      className={`${styles.carouselContainer} ${round ? styles.roundContainer : ""}`}
      style={{
        width: "100%",
        ...(round && { height: `${containerWidth}px`, borderRadius: "50%" }),
      }}
      aria-label="Carousel"
    >
      <motion.div
        className={styles.carouselTrack}
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {resolvedItems.length > 1 && (
        <div className={`${styles.indicatorsContainer} ${round ? styles.roundIndicatorsContainer : ""}`}>
          <div className={styles.indicators}>
            {resolvedItems.map((_, index) => (
              <motion.button
                key={index}
                type="button"
                className={`${styles.indicator} ${
                  activeIndex === index ? styles.indicatorActive : styles.indicatorInactive
                }`}
                animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                onClick={() => setPosition(loop ? index + 1 : index)}
                transition={{ duration: 0.15 }}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




