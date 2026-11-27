import React, { useEffect, useRef } from 'react';

const TEXT = '#tamatar';
const GRID_COLS = 148;
const GRID_ROWS = 30;
const SUPERSAMPLE = 4;

// Pure 7-bit ASCII density ramp: fine edge -> mid stroke -> heavy stroke core
const TIERS = [
  ':;~-,.',
  '*+=?/XH0',
  '@#%&$WM8B',
] as const;

interface ActiveCell {
  index: number;
  tier: 0 | 1 | 2;
}

interface AsciiGrid {
  chars: string[];
  active: ActiveCell[];
  cols: number;
  rows: number;
  charRatio: number;
}

const buildAsciiGrid = (): AsciiGrid => {
  const measureCanvas = document.createElement('canvas');
  const measureCtx = measureCanvas.getContext('2d');
  let charRatio = 0.6;
  if (measureCtx) {
    measureCtx.font = 'italic 400 100px "Geist Mono", ui-monospace, SFMono-Regular, monospace';
    const sampleW = measureCtx.measureText('MMMMMMMMMMMMMMMMMMMM').width;
    if (sampleW > 0) {
      charRatio = sampleW / 2000;
    }
  }

  const canvasW = GRID_COLS * SUPERSAMPLE;
  const canvasH = Math.round(canvasW / ((GRID_COLS * charRatio) / GRID_ROWS));

  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    return { chars: [], active: [], cols: GRID_COLS, rows: GRID_ROWS, charRatio };
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const baseSize = 100;
  ctx.font = `italic 700 ${baseSize}px "Geist Sans", system-ui, -apple-system, sans-serif`;
  const measuredW = ctx.measureText(TEXT).width || baseSize * 5;
  const fitByWidth = ((canvasW * 0.94) / measuredW) * baseSize;
  const fitByHeight = canvasH * 0.92;
  const fontSize = Math.min(fitByWidth, fitByHeight);

  ctx.font = `italic 700 ${fontSize}px "Geist Sans", system-ui, -apple-system, sans-serif`;
  ctx.fillText(TEXT, canvasW / 2, canvasH * 0.52);

  const imageData = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const cellW = canvasW / GRID_COLS;
  const cellH = canvasH / GRID_ROWS;

  // Build raw density matrix so we can auto-trim empty border rows & columns
  const matrix: number[][] = [];
  let minRow = GRID_ROWS;
  let maxRow = -1;
  let minCol = GRID_COLS;
  let maxCol = -1;

  for (let row = 0; row < GRID_ROWS; row++) {
    const y0 = Math.floor(row * cellH);
    const y1 = Math.min(canvasH, Math.ceil((row + 1) * cellH));
    const rowDensities: number[] = [];

    for (let col = 0; col < GRID_COLS; col++) {
      const x0 = Math.floor(col * cellW);
      const x1 = Math.min(canvasW, Math.ceil((col + 1) * cellW));

      let alphaSum = 0;
      let samples = 0;

      for (let y = y0; y < y1; y++) {
        const rowOffset = y * canvasW * 4;
        for (let x = x0; x < x1; x++) {
          alphaSum += imageData[rowOffset + x * 4 + 3];
          samples++;
        }
      }

      const density = samples > 0 ? alphaSum / (samples * 255) : 0;
      rowDensities.push(density);

      if (density >= 0.14) {
        if (row < minRow) minRow = row;
        if (row > maxRow) maxRow = row;
        if (col < minCol) minCol = col;
        if (col > maxCol) maxCol = col;
      }
    }

    matrix.push(rowDensities);
  }

  if (maxRow < minRow || maxCol < minCol) {
    return { chars: [], active: [], cols: GRID_COLS, rows: GRID_ROWS, charRatio };
  }

  const trimmedRows = maxRow - minRow + 1;
  const trimmedCols = maxCol - minCol + 1;
  const chars: string[] = [];
  const active: ActiveCell[] = [];

  for (let r = 0; r < trimmedRows; r++) {
    const srcRow = minRow + r;
    for (let c = 0; c < trimmedCols; c++) {
      const srcCol = minCol + c;
      const density = matrix[srcRow][srcCol];
      const idx = chars.length;

      if (density >= 0.72) {
        const pool = TIERS[2];
        chars.push(pool[(c * 31 + r * 17) % pool.length]);
        active.push({ index: idx, tier: 2 });
      } else if (density >= 0.36) {
        const pool = TIERS[1];
        chars.push(pool[(c * 23 + r * 13) % pool.length]);
        active.push({ index: idx, tier: 1 });
      } else if (density >= 0.14) {
        const pool = TIERS[0];
        chars.push(pool[(c * 19 + r * 11) % pool.length]);
        active.push({ index: idx, tier: 0 });
      } else {
        chars.push(' ');
      }
    }

    if (r < trimmedRows - 1) {
      chars.push('\n');
    }
  }

  return { chars, active, cols: trimmedCols, rows: trimmedRows, charRatio };
};

export const TamatarAscii: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timerId: number | null = null;
    let isVisible = false;
    let grid: AsciiGrid | null = null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyFit = () => {
      if (!containerRef.current || !preRef.current || !grid || grid.cols === 0) return;
      const containerW = containerRef.current.clientWidth;
      if (containerW <= 0) return;

      // Exact edge-to-edge full-width font size accounting for slight italic overhang
      const fontSizePx = (containerW * 0.992) / (grid.cols * grid.charRatio);
      preRef.current.style.fontSize = `${fontSizePx.toFixed(3)}px`;
      preRef.current.style.marginBottom = `-${(grid.rows * 0.22).toFixed(2)}em`;
    };

    const startShimmer = () => {
      if (reduceMotion || timerId !== null || !grid || grid.active.length === 0) return;

      timerId = window.setInterval(() => {
        if (!isVisible || !preRef.current || !grid || grid.active.length === 0) return;

        const mutations = Math.max(8, Math.floor(grid.active.length * 0.035));
        for (let i = 0; i < mutations; i++) {
          const cell = grid.active[Math.floor(Math.random() * grid.active.length)];
          const pool = TIERS[cell.tier];
          grid.chars[cell.index] = pool[Math.floor(Math.random() * pool.length)];
        }
        preRef.current.textContent = grid.chars.join('');
      }, 200);
    };

    const stopShimmer = () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    const init = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Proceed with fallback metrics if font readiness fails.
      }

      if (cancelled || !preRef.current) return;

      grid = buildAsciiGrid();
      preRef.current.textContent = grid.chars.join('');
      applyFit();

      if (isVisible) {
        startShimmer();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startShimmer();
        } else {
          stopShimmer();
        }
      },
      { threshold: 0.05 }
    );

    let rafId = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyFit);
    });

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
      resizeObserver.observe(containerRef.current);
    }

    void init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      stopShimmer();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-8 flex w-full justify-center overflow-hidden select-none pointer-events-none md:mt-12"
      aria-hidden="true"
    >
      <pre
        ref={preRef}
        className="whitespace-pre font-mono italic leading-[1.0] text-text opacity-[0.22] dark:opacity-[0.24]"
      />
    </div>
  );
};
