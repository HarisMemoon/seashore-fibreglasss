"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The chatbot is a heavy below-the-fold widget: load its code only when the
// browser goes idle (≤1.5s), or on the visitor's first scroll / pointer
// interaction — whichever comes first — so it stays out of the critical
// path but its launcher still appears promptly.
const ChatbotWidget = dynamic(
  () => import("./ChatbotWidget").then((m) => m.ChatbotWidget),
  { ssr: false },
);

export function ChatbotWidgetLazy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    let done = false;
    let idleId: number | undefined;
    let timerId: number | undefined;

    const cleanup = () => {
      window.removeEventListener("scroll", mount);
      window.removeEventListener("pointerdown", mount);
      const w = window as Window & {
        cancelIdleCallback?: (id: number) => void;
      };
      if (idleId !== undefined && w.cancelIdleCallback)
        w.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };

    function mount() {
      if (done) return;
      done = true;
      cleanup();
      setMounted(true);
    }

    window.addEventListener("scroll", mount, { passive: true });
    window.addEventListener("pointerdown", mount, { passive: true });

    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(mount, { timeout: 1500 });
    } else {
      timerId = window.setTimeout(mount, 1500);
    }

    return cleanup;
  }, [mounted]);

  if (!mounted) return null;
  return <ChatbotWidget />;
}
