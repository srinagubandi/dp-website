import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "./api";
import {
  DEFAULT_CONTENT,
  DEFAULT_SECTIONS,
  DEFAULT_SEO,
  type PublicRoute,
} from "../../shared/site";

type PublicConfig = { content: any[]; sections: any[]; seo: any[] };
type SiteContextValue = {
  text: (
    route: PublicRoute,
    section: string,
    key: string,
    fallback?: string
  ) => string;
  sectionEnabled: (route: PublicRoute, slug: string) => boolean;
  seoFor: (route: PublicRoute) => any;
  loading: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PublicConfig>({
    content: DEFAULT_CONTENT,
    sections: DEFAULT_SECTIONS,
    seo: DEFAULT_SEO,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api<PublicConfig>("/api/public/config")
      .then(data => {
        if (!active) return;
        setConfig({
          content: data.content.length ? data.content : DEFAULT_CONTENT,
          sections: data.sections.length ? data.sections : DEFAULT_SECTIONS,
          seo: data.seo.length ? data.seo : DEFAULT_SEO,
        });
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);
  const value = useMemo<SiteContextValue>(
    () => ({
      loading,
      text: (route, section, key, fallback = "") =>
        config.content.find(
          item =>
            item.route === route && item.section === section && item.key === key
        )?.value ?? fallback,
      sectionEnabled: (route, slug) =>
        config.sections.find(item => item.route === route && item.slug === slug)
          ?.enabled ?? true,
      seoFor: route =>
        config.seo.find(item => item.route === route) ??
        DEFAULT_SEO.find(item => item.route === route)!,
    }),
    [config, loading]
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
