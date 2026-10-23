import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface TextScrollAnimationProps {
  heading?: string;
  highlightWords?: string[];
  subheading?: string;
  badge?: string;
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
  // Calculate subtle initial spread based on character index relative to center
  const center = totalChars / 2;
  const distanceFromCenter = index - center;
  const initialX = Math.sign(distanceFromCenter) * Math.min(Math.abs(distanceFromCenter) * 3, 28);
  const initialY = (index % 2 === 0 ? -1 : 1) * 12;
  const initialRotate = (index % 2 === 0 ? -1 : 1) * 8;

  // Stagger activation window based on index
  const startWindow = 0.05 + (index / totalChars) * 0.25;
  const endWindow = Math.min(startWindow + 0.45, 0.95);

  const x = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialX, initialX * 0.5, 0]);
  const y = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialY, initialY * 0.4, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, startWindow, endWindow], [initialRotate, initialRotate * 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, startWindow, endWindow], [0.86, 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, startWindow, endWindow], [0.25, 0.65, 1]);

  if (reducedMotion) {
    return (
      <span className={`text-scroll-char ${isHighlight ? 'highlight' : ''}`}>
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
      className={`text-scroll-char ${isHighlight ? 'highlight' : ''}`}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
};

export const TextScrollAnimation: React.FC<TextScrollAnimationProps> = ({
  heading = "LET'S BUILD SOMETHING INTELLIGENT.",
  highlightWords = ['SOMETHING', 'INTELLIGENT.'],
  subheading = "Interested in AI, Generative AI, intelligent agents, and impactful software? Let's connect, exchange ideas, and explore opportunities to build something meaningful.",
  badge = 'DIRECT ENGAGEMENT & PROFILE ECOSYSTEM',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'start 0.35'],
  });

  // Supporting text fade in
  const subOpacity = useTransform(scrollYProgress, [0.35, 0.85], [0.4, 1]);
  const subY = useTransform(scrollYProgress, [0.35, 0.85], [16, 0]);

  // Break heading into words, then characters
  const words = heading.split(' ');
  let charCounter = 0;
  const totalChars = heading.replace(/\s+/g, '').length;

  return (
    <div
      ref={containerRef}
      className={`text-scroll-hero-wrapper ${className}`}
    >
      {/* Eyebrow Badge */}
      {badge && (
        <div className="text-scroll-badge">
          <span className="text-scroll-pulse-dot" />
          <span>{badge}</span>
        </div>
      )}

      {/* Accessible Hidden Full Text for Screen Readers */}
      <h2 className="sr-only">{heading}</h2>

      {/* Animated Visual Typography */}
      <div className="text-scroll-display" aria-hidden="true">
        {words.map((word, wordIdx) => {
          const isHighlight = highlightWords.some(
            (hw) => hw.toUpperCase() === word.toUpperCase()
          );

          const wordChars = word.split('');

          return (
            <React.Fragment key={`word-frag-${wordIdx}`}>
              <span className="text-scroll-word">
                {wordChars.map((char) => {
                  const charIdx = charCounter++;
                  return (
                    <AnimatedCharacter
                      key={`char-${charIdx}-${char}`}
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
      </div>

      {/* Supporting Copy */}
      {subheading && (
        <motion.p
          style={
            mounted && !shouldReduceMotion
              ? { opacity: subOpacity, y: subY }
              : { opacity: 1, y: 0 }
          }
          className="text-scroll-subheading"
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
};
