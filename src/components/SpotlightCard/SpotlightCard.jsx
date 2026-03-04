import { useRef, useCallback } from "react";
import styles from "./SpotlightCard.module.css";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 229, 255, 0.16)", // cyan suave como el mock
}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ref.current.style.setProperty("--mouse-x", `${x}px`);
      ref.current.style.setProperty("--mouse-y", `${y}px`);
      ref.current.style.setProperty("--spotlight-color", spotlightColor);
    },
    [spotlightColor]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`${styles.cardSpotlight} ${className}`}
    >
      {children}
    </div>
  );
}
