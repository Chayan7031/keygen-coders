"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { galleryItems } from "@/app/utils/GalleryItems";
import "./gallery-grid.css";

// Configuration
const NUM_ROWS = 7;
const ITEMS_PER_ROW = 9;
const TOTAL_ITEMS = NUM_ROWS * ITEMS_PER_ROW;

// Unique image list for lightbox navigation
const uniqueImages = galleryItems.map((item) => item.imageNew);

// Duplicate images to fill all grid slots
const allImages = Array.from(
  { length: TOTAL_ITEMS },
  (_, i) => galleryItems[i % galleryItems.length].imageNew
);

// Split into rows
const rows = Array.from({ length: NUM_ROWS }, (_, rowIdx) =>
  allImages.slice(rowIdx * ITEMS_PER_ROW, (rowIdx + 1) * ITEMS_PER_ROW)
);

const MIDDLE_ROW = Math.floor(NUM_ROWS / 2);
const BASE_AMT = 0.1;
const MIN_AMT = 0.05;

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const GalleryImages = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | undefined>();
  const mousePos = useRef({ x: 0, y: 0 });
  const winSize = useRef({ w: 0, h: 0 });
  const gsapRef = useRef<typeof import("gsap").default | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Rendered styles per row (translateX only, no contrast/brightness)
  const renderedStyles = useRef(
    Array.from({ length: NUM_ROWS }, (_, index) => {
      const dist = Math.abs(index - MIDDLE_ROW);
      const amt = Math.max(BASE_AMT - dist * 0.03, MIN_AMT);
      return {
        amt,
        translateX: { previous: 0, current: 0 },
      };
    })
  );

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  // Keyboard: Escape to close, Arrow keys to navigate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((prev) => (prev !== null ? (prev + 1) % uniqueImages.length : null));
      if (e.key === "ArrowLeft") setLightboxIdx((prev) => (prev !== null ? (prev - 1 + uniqueImages.length) % uniqueImages.length : null));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  useEffect(() => {
    setMounted(true);

    // Dynamically import GSAP (client-only)
    const loadGsap = async () => {
      const gsapModule = await import("gsap");
      gsapRef.current = gsapModule.default;
    };
    loadGsap();

    winSize.current = { w: window.innerWidth, h: window.innerHeight };
    mousePos.current = { x: winSize.current.w / 2, y: winSize.current.h / 2 };

    const onResize = () => {
      winSize.current = { w: window.innerWidth, h: window.innerHeight };
    };
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mousePos.current = { x: touch.clientX, y: touch.clientY };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    // Render loop — mouse-tracking parallax (translateX only)
    const render = () => {
      const g = gsapRef.current;
      if (!g) {
        rafId.current = requestAnimationFrame(render);
        return;
      }

      const w = winSize.current.w || 1;
      const mx = mousePos.current.x;
      const mappedX = ((mx / w) * 2 - 1) * 40 * (w / 100);

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const style = renderedStyles.current[index];

        style.translateX.current = mappedX;
        style.translateX.previous = lerp(style.translateX.previous, style.translateX.current, style.amt);

        g.set(row, { x: style.translateX.previous });
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const openLightbox = useCallback((imgUrl: string) => {
    const idx = uniqueImages.indexOf(imgUrl);
    setLightboxIdx(idx >= 0 ? idx : 0);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIdx((prev) => (prev !== null ? (prev - 1 + uniqueImages.length) % uniqueImages.length : null));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIdx((prev) => (prev !== null ? (prev + 1) % uniqueImages.length : null));
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Section heading */}
      <div className="gallery-section">
        <span className="gallery-subtitle">glimpse of our</span>
        <h2 className="gallery-heading">Gallery</h2>
        <p className="gallery-description">
          Moments captured from our events, workshops, and hackathons — a journey of learning and building together.
        </p>
      </div>

      {/* Rotated parallax grid */}
      <section className="gallery-intro">
        <div className="gallery-grid" ref={gridRef}>
          {rows.map((rowImages, rowIdx) => (
            <div
              key={rowIdx}
              className="gallery-row"
              ref={(el) => { rowRefs.current[rowIdx] = el; }}
            >
              {rowImages.map((imgUrl, itemIdx) => (
                <div
                  key={`${rowIdx}-${itemIdx}`}
                  className="gallery-row__item"
                  onClick={() => openLightbox(imgUrl)}
                >
                  <div className="gallery-row__item-inner">
                    <div
                      className="gallery-row__item-img"
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox popup */}
      {lightboxIdx !== null && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button
            className="gallery-lightbox__close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            className="gallery-lightbox__arrow gallery-lightbox__arrow--left"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="gallery-lightbox__img"
            src={uniqueImages[lightboxIdx]}
            alt="Gallery preview"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="gallery-lightbox__arrow gallery-lightbox__arrow--right"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryImages;
