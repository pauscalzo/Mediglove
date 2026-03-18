import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MagicCard.module.css";

const MOBILE_BREAKPOINT = 768;

function createParticleElement(x, y, glowColor) {
  const el = document.createElement("div");
  el.className = styles.particle;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--particle-color", glowColor);
  return el;
}

function useIsMobile() {
  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth <= MOBILE_BREAKPOINT;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileRef;
}

export default function MagicCard({
  children,
  glowColor = "126, 194, 192",
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  clickEffect = true,
  spotlightRadius = 180,
  particleCount = 12,
  disableAnimations = false,
  className = "",
}) {
  const cardRef = useRef(null);
  const timeoutsRef = useRef([]);
  const isHoverRef = useRef(false);
  const isMobileRef = useIsMobile();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const shouldDisable = disableAnimations || isMobileRef.current;

    el.style.setProperty("--glow-color", glowColor);
    el.style.setProperty("--glow-radius", `${spotlightRadius}px`);

    const clearParticles = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      const particles = el.querySelectorAll(`.${styles.particle}`);
      particles.forEach((p) => {
        gsap.to(p, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "back.in(1.7)",
          onComplete: () => p.remove(),
        });
      });
    };

    const spawnParticles = () => {
      if (!enableStars || shouldDisable) return;

      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      for (let i = 0; i < particleCount; i++) {
        const t = setTimeout(() => {
          if (!isHoverRef.current) return;

          const p = createParticleElement(Math.random() * w, Math.random() * h, glowColor);
          el.appendChild(p);

          gsap.fromTo(
            p,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" }
          );

          gsap.to(p, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });

          gsap.to(p, {
            opacity: 0.25,
            duration: 1.4,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          });
        }, i * 70);

        timeoutsRef.current.push(t);
      }
    };

    const updateGlow = (clientX, clientY, intensity) => {
      const rect = el.getBoundingClientRect();
      const rx = ((clientX - rect.left) / rect.width) * 100;
      const ry = ((clientY - rect.top) / rect.height) * 100;

      el.style.setProperty("--glow-x", `${rx}%`);
      el.style.setProperty("--glow-y", `${ry}%`);
      el.style.setProperty("--glow-intensity", `${intensity}`);
    };

    const onEnter = () => {
      isHoverRef.current = true;
      if (shouldDisable) return;

      if (enableSpotlight || enableBorderGlow) {
        el.style.setProperty("--glow-intensity", "1");
      }
      spawnParticles();
    };

    const onLeave = () => {
      isHoverRef.current = false;

      el.style.setProperty("--glow-intensity", "0");
      clearParticles();
    };

    const onMove = (e) => {
      if (shouldDisable) return;
      if (!enableSpotlight && !enableBorderGlow) return;

      updateGlow(e.clientX, e.clientY, 1);
    };

    const onClick = (e) => {
      if (!clickEffect || shouldDisable) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.className = styles.ripple;
      ripple.style.setProperty("--ripple-color", glowColor);
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;

      el.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);

    return () => {
      isHoverRef.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [
    glowColor,
    enableStars,
    enableSpotlight,
    enableBorderGlow,
    clickEffect,
    spotlightRadius,
    particleCount,
    disableAnimations,
    isMobileRef,
  ]);

  return (
    <div
      ref={cardRef}
      className={[
        styles.magicCard,
        enableBorderGlow ? styles.borderGlow : "",
        enableSpotlight ? styles.spotlightOn : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
