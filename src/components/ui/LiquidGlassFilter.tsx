import React from 'react';

/**
 * Hidden SVG Optical Filter Bank powering real DOM pixel refraction
 * in Chromium browsers (with automatic graceful blur fallback in Safari/Firefox).
 */
export const LiquidGlassFilter: React.FC = () => {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 h-0 w-0 opacity-0"
    >
      <defs>
        {/* Primary Liquid Glass Lens Distortion + Subtle Chromatic Fringe */}
        <filter id="liquid-glass-lens" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.016"
            numOctaves="2"
            seed="7"
            result="organicWave"
          />
          <feGaussianBlur in="organicWave" stdDeviation="6" result="smoothLens" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothLens"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>

        {/* Subtle Capsule Refraction for Navigation & Pills */}
        <filter id="liquid-glass-subtle" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="1"
            seed="3"
            result="microWave"
          />
          <feGaussianBlur in="microWave" stdDeviation="4" result="smoothMicro" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothMicro"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
};
