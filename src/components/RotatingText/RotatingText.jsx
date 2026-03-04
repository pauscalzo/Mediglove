import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./RotatingText.module.css";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = [],
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName = "",
    splitLevelClassName = "",
    elementLevelClassName = "",
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text) => {
    // Esto es un plus vs tu versión: respeta emojis / acentos / ligaduras
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("es", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (seg) => seg.segment);
    }
    return Array.from(text);
  };

  const currentText = texts?.[currentTextIndex] ?? "";

  const elements = useMemo(() => {
    if (!currentText) return [];

    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }

    if (splitBy === "words") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: [word],
        needsSpace: i !== words.length - 1,
      }));
    }

    if (splitBy === "lines") {
      const lines = currentText.split("\n");
      return lines.map((line, i) => ({
        characters: [line],
        needsSpace: i !== lines.length - 1,
      }));
    }

    // splitBy custom
    const parts = currentText.split(splitBy);
    return parts.map((part, i) => ({
      characters: [part],
      needsSpace: i !== parts.length - 1,
    }));
  }, [currentText, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars || 0;
      if (!staggerDuration) return 0;

      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;

      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }

      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }

      // si pasan un número
      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }

      return index * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    if (!texts?.length) return;
    const last = texts.length - 1;
    const nextIndex =
      currentTextIndex === last ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts, loop, handleIndexChange]);

  const previous = useCallback(() => {
    if (!texts?.length) return;
    const prevIndex =
      currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      if (!texts?.length) return;
      const valid = Math.max(0, Math.min(index, texts.length - 1));
      if (valid !== currentTextIndex) handleIndexChange(valid);
    },
    [texts, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next,
    previous,
    jumpTo,
    reset,
  ]);

  useEffect(() => {
    if (!auto || texts.length <= 1) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [auto, texts.length, next, rotationInterval]);

  const totalChars = useMemo(
    () => elements.reduce((sum, w) => sum + w.characters.length, 0),
    [elements]
  );

  return (
    <motion.span
      className={cx(styles.root, mainClassName)}
      {...rest}
      layout="size"
      transition={transition}
    >
      <span className={styles.srOnly}>{currentText}</span>

      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cx(splitBy === "lines" ? styles.lines : styles.track)}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0);

            return (
              <span
                key={wordIndex}
                className={cx(styles.word, splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(previousCharsCount + charIndex, totalChars),
                    }}
                    className={cx(styles.element, elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}

                {wordObj.needsSpace && <span className={styles.space}> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;

