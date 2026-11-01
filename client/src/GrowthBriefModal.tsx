import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import LeadForm from "./LeadForm";

type GrowthBriefModalContextValue = {
  openGrowthBrief: (trigger?: HTMLElement | null) => void;
};

const GrowthBriefModalContext =
  createContext<GrowthBriefModalContextValue | null>(null);

export function useGrowthBriefModal() {
  const context = useContext(GrowthBriefModalContext);
  if (!context) {
    throw new Error("GrowthBriefModalProvider is required for modal triggers.");
  }
  return context;
}

export function GrowthBriefModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openGrowthBrief = (trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setOpen(true);
  };

  const closeGrowthBrief = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("growth-brief-modal-open");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);

    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGrowthBrief();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("growth-brief-modal-open");
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <GrowthBriefModalContext.Provider value={{ openGrowthBrief }}>
      {children}
      {open && (
        <div
          className="growth-brief-backdrop"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeGrowthBrief();
          }}
        >
          <div
            ref={dialogRef}
            className="growth-brief-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="growth-brief-modal-title"
            aria-describedby="growth-brief-modal-description"
          >
            <div className="growth-brief-modal-header">
              <div>
                <p className="eyebrow">Growth Brief</p>
                <h2 id="growth-brief-modal-title">
                  Start with the details that matter.
                </h2>
                <p id="growth-brief-modal-description">
                  Share practice-level context only. We will review your request
                  without pressure.
                </p>
              </div>
              <button
                ref={closeRef}
                className="growth-brief-modal-close"
                type="button"
                onClick={closeGrowthBrief}
                aria-label="Close Growth Brief form"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <LeadForm idPrefix="growth-brief-modal" />
          </div>
        </div>
      )}
    </GrowthBriefModalContext.Provider>
  );
}

type GrowthBriefTriggerProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function GrowthBriefTrigger({
  children,
  onClick,
  href = "/contact#growth-brief",
  ...props
}: GrowthBriefTriggerProps) {
  const { openGrowthBrief } = useGrowthBriefModal();

  return (
    <a
      {...props}
      href={href}
      aria-haspopup="dialog"
      onClick={event => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        openGrowthBrief(event.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
