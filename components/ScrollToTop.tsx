"use client";

import { useEffect, useState } from "react";

/**
 * Floating bottom-right "back to top" button.
 * Appears after the user scrolls past ~400px.
 * Click → smooth-scroll to top.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-30 w-10 h-10 border border-ink bg-paper text-ink hover:bg-ink hover:text-paper transition-all duration-200 flex items-center justify-center shadow-sm ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 13 V1 M2 6 L7 1 L12 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </button>
  );
}
