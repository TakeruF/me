"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const storageKey = "takeru-theme";
const normalize = (value: string | null | undefined): Theme =>
  value === "light" || value === "dark" ? value : "system";
const getSnapshot = () => normalize(document.documentElement.dataset.theme);
const getServerSnapshot = (): Theme => "system";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      document.documentElement.dataset.theme = normalize(event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeSwitcher({ labels }: {
  labels: { label: string; system: string; light: string; dark: string };
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const details = useRef<HTMLDetailsElement>(null);
  const icons = { system: Monitor, light: Sun, dark: Moon };
  const CurrentIcon = icons[theme];

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !details.current?.contains(event.target) && details.current) {
        details.current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      ref={details}
      className="language-switcher theme-switcher"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label={`${labels.label}: ${labels[theme]}`}>
        <CurrentIcon size={16} aria-hidden="true" />
        <span>{labels[theme]}</span>
      </summary>
      <div className="language-menu theme-menu" role="group" aria-label={labels.label}>
        {(["system", "light", "dark"] as const).map((preference) => {
          const Icon = icons[preference];
          return (
            <button
              type="button"
              key={preference}
              aria-pressed={theme === preference}
              onClick={() => {
                document.documentElement.dataset.theme = preference;
                try {
                  localStorage.setItem(storageKey, preference);
                } catch {
                  // Keep the selection working when browser storage is unavailable.
                }
                if (details.current) {
                  details.current.open = false;
                  details.current.querySelector("summary")?.focus();
                }
              }}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{labels[preference]}</span>
              {theme === preference && <Check className="theme-check" size={15} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </details>
  );
}
