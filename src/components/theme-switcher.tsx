"use client";

import { Moon, Sun } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
const storageKey = "takeru-theme";
const themeChangeEvent = "takeru-theme-change";
const normalize = (value: string | null | undefined) =>
  value === "light" || value === "dark" ? value : "system";
const getSnapshot = (): Theme => {
  const preference = normalize(document.documentElement.dataset.theme);
  return preference === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : preference;
};
const getServerSnapshot = (): Theme => "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      document.documentElement.dataset.theme = normalize(event.newValue);
    }
  };
  media.addEventListener("change", onChange);
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeSwitcher({ labels }: {
  labels: { label: string; light: string; dark: string };
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const activeTransition = useRef<ViewTransition | null>(null);
  const themeRequest = useRef(0);
  const CurrentIcon = theme === "dark" ? Moon : Sun;
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `${labels.label}: ${labels[nextTheme]}`;

  return (
    <button
      type="button"
      className="theme-switcher"
      aria-label={label}
      title={label}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
        const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
        const request = ++themeRequest.current;
        activeTransition.current?.skipTransition();
        const root = document.documentElement;
        const applyTheme = () => {
          if (request !== themeRequest.current) return;
          // Commit the icon with the theme so both appear in the new snapshot.
          flushSync(() => {
            root.dataset.theme = nextTheme;
            window.dispatchEvent(new Event(themeChangeEvent));
          });
          try {
            localStorage.setItem(storageKey, nextTheme);
          } catch {
            // Keep the toggle working when browser storage is unavailable.
          }
        };

        if (!document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          applyTheme();
          return;
        }

        // Match ninan.cloud: percentage coordinates also work at zoom / HiDPI.
        const origin = `${(x / innerWidth * 100).toFixed(2)}% ${(y / innerHeight * 100).toFixed(2)}%`;
        root.dataset.themeTransition = "";
        const transition = document.startViewTransition(applyTheme);
        activeTransition.current = transition;
        void transition.ready.then(() => {
          root.animate(
            { clipPath: [`circle(0% at ${origin})`, `circle(150% at ${origin})`] },
            {
              duration: 600,
              easing: "cubic-bezier(0.2, 0.7, 0, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        }).catch(() => {
          // Skipping the animation still applies the theme through its callback.
          transition.skipTransition();
        });
        void transition.finished.catch(() => {}).then(() => {
          if (activeTransition.current === transition) {
            activeTransition.current = null;
            delete root.dataset.themeTransition;
          }
        });
      }}
    >
      <CurrentIcon size={18} aria-hidden="true" />
    </button>
  );
}
