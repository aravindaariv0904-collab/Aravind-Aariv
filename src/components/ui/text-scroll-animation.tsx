import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface TextScrollHeadingProps {
  heading?: string;
  highlightWords?: string[];
  className?: string;
}

interface AnimatedCharacterProps {
  char: string;
  index: number;
  totalChars: number;
  isHighlight: boolean;
  scrollYProgress: any;
  reducedMotion: boolean;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  char,
  index,
  totalChars,
  isHighlight,
  scrollYProgress,
  reducedMotion,
}) => {
  // Subtle initial spread based on character position
  const center = totalChars / 2;
  const distanceFromCenter = index - center;
  const initialX = Math.sign(distanceFromCenter) * Math.min(Math.abs(distanceFromCenter) * 2.5, 20);
  const initialY = (index % 2 === 0 ? -1 : 1) * 8;
  const initialRotate = (index % 2 === 0 ? -1 : 1) * 6;

  // Stagger window based on index
  const startWindow = 0.05 + (index / totalChars) * 0.25;
  const endWindow = Math.min(startWindow + 0.45, 0.92);

  const x = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialX, initialX * 0.4, 0]);
  const y = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialY, initialY * 0.3, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialRotate, initialRotate * 0.25, 0]);
  const scale = useTransform(scrollYProgress, [0, startWindow, endWindow], [0.9, 0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, startWindow, endWindow], [0.35, 0.7, 1]);

  if (reducedMotion) {
    return (
      <span className={isHighlight ? 'text-lime' : ''}>
        {char}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        x,
        y,
        rotateZ,
        scale,
        opacity,
        display: 'inline-block',
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      }}
      className={isHighlight ? 'text-lime' : ''}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
};

export const TextScrollHeading: React.FC<TextScrollHeadingProps> = ({
  heading = "LET'S BUILD SOMETHING INTELLIGENT.",
  highlightWords = ['SOMETHING', 'INTELLIGENT.'],
  className = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.45'],
  });

  const words = heading.split(' ');
  let charCounter = 0;
  const totalChars = heading.replace(/\s+/g, '').length;

  return (
    <h2
      ref={containerRef}
      className={`section-heading-text ${className}`}
      style={{ overflow: 'hidden' }}
      aria-label={heading}
    >
      {/* Visual character reveal */}
      <span style={{ display: 'inline' }}>
        {words.map((word, wordIdx) => {
          const isHighlight = highlightWords.some(
            (hw) => hw.toUpperCase() === word.toUpperCase()
          );

          const wordChars = word.split('');

          return (
            <React.Fragment key={`scroll-word-${wordIdx}`}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {wordChars.map((char) => {
                  const charIdx = charCounter++;
                  return (
                    <AnimatedCharacter
                      key={`scroll-char-${charIdx}-${char}`}
                      char={char}
                      index={charIdx}
                      totalChars={totalChars}
                      isHighlight={isHighlight}
                      scrollYProgress={scrollYProgress}
                      reducedMotion={!mounted || !!shouldReduceMotion}
                    />
                  );
                })}
              </span>
              {wordIdx < words.length - 1 && ' '}
            </React.Fragment>
          );
        })}
      </span>
    </h2>
  );
};

export const TextScrollAnimation = TextScrollHeading;
