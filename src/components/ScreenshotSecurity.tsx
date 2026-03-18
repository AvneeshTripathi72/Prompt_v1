"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";

export const ScreenshotSecurity = ({ children }: { children: React.ReactNode }) => {
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.error("Security Policy: Right-click is restricted on this platform.", {
        icon: <ShieldAlert className="w-4 h-4" />,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        try {
          navigator.clipboard.writeText("");
        } catch (err) {
          console.warn("Clipboard access denied");
        }
        setIsRestricted(true);
        toast.error("Security Breach: Screenshots are prohibited.");
      }

      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's' || e.key === 'P' || e.key === 'p')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
        toast.warning("Security Policy: Restricted Action.");
        return false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsRestricted(true);
        try {
          navigator.clipboard.writeText("");
        } catch (err) {
          // Ignore clipboard errors when window is hidden
        }
      } else {
        setTimeout(() => setIsRestricted(false), 300);
      }
    };

    const handleMouseLeave = () => setIsRestricted(true);
    const handleMouseEnter = () => setIsRestricted(false);
    const handleWindowBlur = () => {
      setIsRestricted(true);
      try {
        navigator.clipboard.writeText("");
      } catch (err) {
        // Ignore clipboard errors on blur
      }
    };
    const handleWindowFocus = () => setIsRestricted(false);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div className="relative min-h-screen select-none overflow-x-hidden">
      <div 
        className={`transition-all duration-300 ease-in-out ${isRestricted ? "blur-[80px] pointer-events-none opacity-0 scale-[0.95]" : "blur-0 opacity-100"}`}
      >
        {children}
      </div>

      <div className="fixed inset-0 z-[9998] pointer-events-none bg-transparent touch-none" aria-hidden="true" />

      {isRestricted && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200 bg-background/50 backdrop-blur-3xl">
          <div className="bg-card border border-primary/20 p-10 rounded-[3rem] shadow-2xl max-w-sm scale-110">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-foreground mb-3">System Locked</h2>
            <p className="text-xs text-muted-foreground font-bold leading-relaxed uppercase tracking-widest opacity-70">
              Content protected by Vault Protocol 2.0. Focus the window to reveal.
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        img {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }

        @media print {
          html, body {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
