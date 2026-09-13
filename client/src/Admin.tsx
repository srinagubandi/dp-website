import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { api } from "./api";
import { LEAD_STATUSES, PUBLIC_ROUTES, SPECIALTIES } from "../../shared/site";

type Tab = "leads" | "content" | "sections" | "seo";
type LoadState = {
  leads: any[];
  counts: Record<string, number>;
  content: any[];
  sections: any[];
  seo: any[];
};
const initial: LoadState = {
  leads: [],
  counts: { all: 0, new: 0, contacted: 0, qualified: 0, closed: 0 },
  content: [],
  sections: [],
  seo: [],
};

export default function Admin() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("leads");
  const [state, setState] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [filters, setFilters] = useState({
    status: "",
    specialty: "",
    search: "",
  });
  const [routeFilter, setRouteFilter] = useState<string>("/");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await api("/api/admin/session");
      const query = new URLSearchParams(
        Object.entries(filters).filter(([, value]) => value)
      );
      const [leads, content, sections, seo] = await Promise.all([
        api<any>(`/api/admin/leads?${query}`),
        api<any[]>("/api/admin/content"),
        api<any[]>("/api/admin/sections"),
        api<any[]>("/api/admin/seo"),
      ]);
      setState({
        leads: leads.items,
        counts: leads.counts,
        content,
        sections,
        seo,
      });
    } catch (reason) {
      if ((reason as any).status === 401) {
        navigate("/admin/login");
        return;
      }
      setError(
        reason instanceof Error ? reason.message : "Could not load admin data."
      );
    } finally {
      setLoading(false);
    }
  }, [filters, navigate]);
  useEffect(() => {
    document.title = "Admin | DocPropel";
    void load();
  }, [load]);
  async function save(url: string, method: string, body: any) {
    setError("");
    setNotice("");
    try {
      const data = await api(url, { method, body: JSON.stringify(body) });
      setNotice("Changes saved.");
      await load();
      return data;
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Changes could not be saved."
      );
    }
  }
  async function logout() {
    await api("/api/admin/logout", { method: "POST" });
    navigate("/admin/login");
  }
  const exportUrl = `/api/admin/leads.csv?${new URLSearchParams(Object.entries(filters).filter(([, value]) => value))}`;
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" aria-label="DocPropel public site">
          <img
            src="/docpropel-logo-light.svg"
            alt="DocPropel"
            width="165"
            height="33"
          />
        </Link>
        <p>Content & SEO operations</p>
        <nav aria-label="Admin sections">
          {(["leads", "content", "sections", "seo"] as Tab[]).map(item => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer">
            View public site
          </a>
          <button onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow">DocPropel v6</p>
            <h1>{tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
          </div>
          <button
            className="admin-menu"
            onClick={() => document.body.classList.toggle("admin-nav-open")}
          >
            Menu
          </button>
        </header>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {loading ? (
          <p className="admin-loading" role="status">
            Loading workspace…
          </p>
        ) : (
          <>
            {tab === "leads" && (
              <section>
                <div className="count-grid">
                  {Object.entries(state.counts).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() =>
                        setFilters(f => ({
                          ...f,
                          status: key === "all" ? "" : key,
                        }))
                      }
                    >
                      <strong>{value}</strong>
                      <span>{key}</span>
                    </button>
                  ))}
                </div>
                <form
                  className="filter-bar"
                  onSubmit={e => {
                    e.preventDefault();
                    void load();
                  }}
                >
                  <label>
                    Search
                    <input
                      value={filters.search}
                      onChange={e =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      placeholder="Name, email, or practice"
                    />
                  </label>
                  <label>
                    Status
                    <select
                      value={filters.status}
                      onChange={e =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                    >
                      <option value="">All statuses</option>
                      {LEAD_STATUSES.map(item => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Specialty
                    <select
                      value={filters.specialty}
                      onChange={e =>
                        setFilters({ ...filters, specialty: e.target.value })
                      }
                    >
                      <option value="">All specialties</option>
                      {SPECIALTIES.map(item => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <button className="button small">Apply</button>
                  <a className="button small outline" href={exportUrl}>
                    Export CSV
                  </a>
                </form>
                {state.leads.length ? (
                  <div className="lead-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Practice</th>
                          <th>Specialty</th>
                          <th>Status</th>
                          <th>Received</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.leads.map(lead => (
                          <tr key={lead.id}>
                            <td>
                              <button
                                type="button"
                                className="lead-open"
                                onClick={() => setSelected(lead)}
                                aria-label={`Open lead details for ${lead.name}`}
                              >
                                <strong>{lead.name}</strong>
                                <small>{lead.email}</small>
                              </button>
                            </td>
                            <td>{lead.practiceName}</td>
                            <td>{lead.specialty}</td>
                            <td>
                              <span className={`status ${lead.status}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td>{new Date(lead.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="admin-empty">
                    <h2>No leads match this view.</h2>
                    <p>
                      Adjust the filters or wait for a Growth Brief submission.
                    </p>
                  </div>
                )}
                {selected && (
                  <LeadDrawer
                    lead={selected}
                    close={() => setSelected(null)}
                    save={async value => {
                      const updated = await save(
                        `/api/admin/leads/${selected.id}`,
                        "PATCH",
                        value
                      );
                      if (updated) setSelected(updated);
                    }}
                  />
                )}
              </section>
            )}
            {tab === "content" && (
              <section>
                <AdminRouteFilter
                  value={routeFilter}
                  setValue={setRouteFilter}
                />
                <p className="admin-help">
                  Copy below is loaded by the public site. Static, approved
                  fallback copy remains visible if the API is temporarily
                  unavailable.
                </p>
                <div className="editor-list">
                  {state.content
                    .filter(item => item.route === routeFilter)
                    .map(item => (
                      <ContentEditor
                        key={item.id}
                        item={item}
                        save={value =>
                          save(`/api/admin/content/${item.id}`, "PUT", value)
                        }
                      />
                    ))}
                </div>
              </section>
            )}
            {tab === "sections" && (
              <section>
                <AdminRouteFilter
                  value={routeFilter}
                  setValue={setRouteFilter}
                />
                <p className="admin-help">
                  Disabled sections are removed from the public route. Hero
                  visibility can also be controlled, but review navigation and
                  page context before release.
                </p>
                <div className="section-list">
                  {state.sections
                    .filter(item => item.route === routeFilter)
                    .map(item => (
                      <SectionEditor
                        key={item.id}
                        item={item}
                        save={value =>
                          save(`/api/admin/sections/${item.id}`, "PATCH", value)
                        }
                      />
                    ))}
                </div>
              </section>
            )}
            {tab === "seo" && (
              <section>
                <AdminRouteFilter
                  value={routeFilter}
                  setValue={setRouteFilter}
                />
                <p className="admin-help">
                  Structured data must describe visible page content. Only
                  reviewed page, organization, website, breadcrumb, collection,
                  and item-list types are accepted.
                </p>
                {state.seo
                  .filter(item => item.route === routeFilter)
                  .map(item => (
                    <SeoEditor
                      key={item.route}
                      item={item}
                      save={value =>
                        save(
                          `/api/admin/seo/${item.route.slice(1)}`,
                          "PUT",
                          value
                        )
                      }
                    />
                  ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
function AdminRouteFilter({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="route-filter">
      Public route
      <select value={value} onChange={e => setValue(e.target.value)}>
        {PUBLIC_ROUTES.map(route => (
          <option key={route}>{route}</option>
        ))}
      </select>
    </label>
  );
}
function LeadDrawer({
  lead,
  close,
  save,
}: {
  lead: any;
  close: () => void;
  save: (value: any) => Promise<void>;
}) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);
  return (
    <div
      className="drawer-backdrop"
      onMouseDown={event => event.target === event.currentTarget && close()}
    >
      <aside
        className="lead-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-heading"
      >
        <button
          className="drawer-close"
          onClick={close}
          aria-label="Close lead details"
        >
          ×
        </button>
        <p className="eyebrow">Lead #{lead.id}</p>
        <h2 id="lead-heading">{lead.name}</h2>
        <dl>
          {[
            ["Practice", lead.practiceName],
            ["Email", lead.email],
            ["Phone", lead.phone],
            ["Specialty", lead.specialty],
            ["Location", lead.location],
            ["Monthly patients", lead.monthlyPatients],
            ["Source", lead.source],
            ["UTM source", lead.utmSource],
            ["UTM medium", lead.utmMedium],
            ["UTM campaign", lead.utmCampaign],
            ["Message", lead.message],
          ].map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>
        <div className="drawer-actions">
          <a href={`mailto:${lead.email}`}>Email</a>
          {lead.phone && <a href={`tel:${lead.phone}`}>Call</a>}
        </div>
        <label>
          Status
          <select value={status} onChange={e => setStatus(e.target.value)}>
            {LEAD_STATUSES.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Internal notes
          <textarea
            rows={6}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </label>
        <button className="button" onClick={() => void save({ status, notes })}>
          Save lead
        </button>
      </aside>
    </div>
  );
}
function ContentEditor({
  item,
  save,
}: {
  item: any;
  save: (value: any) => Promise<unknown>;
}) {
  const [value, setValue] = useState(item.value);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    void save({
      value,
      label: item.label,
      contentType: item.contentType,
      sortOrder: item.sortOrder,
    });
  };
  return (
    <form className="editor-card" onSubmit={submit}>
      <div>
        <span>{item.section}</span>
        <h2>{item.label}</h2>
        <code>{item.key}</code>
      </div>
      <label className="sr-only" htmlFor={`content-${item.id}`}>
        {item.label}
      </label>
      {item.contentType === "textarea" ? (
        <textarea
          id={`content-${item.id}`}
          rows={5}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      ) : (
        <input
          id={`content-${item.id}`}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}
      <button className="button small">Save</button>
    </form>
  );
}
function SectionEditor({
  item,
  save,
}: {
  item: any;
  save: (value: any) => Promise<unknown>;
}) {
  const [title, setTitle] = useState(item.title);
  const [enabled, setEnabled] = useState(item.enabled);
  return (
    <form
      className="section-editor"
      onSubmit={e => {
        e.preventDefault();
        void save({ title, sortOrder: item.sortOrder, enabled });
      }}
    >
      <div>
        <code>{item.slug}</code>
        <label>
          Admin title
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </label>
      </div>
      <label className="toggle">
        <input
          type="checkbox"
          checked={enabled}
          onChange={e => setEnabled(e.target.checked)}
        />
        <span>{enabled ? "Enabled" : "Disabled"}</span>
      </label>
      <button className="button small">Save</button>
    </form>
  );
}
function SeoEditor({
  item,
  save,
}: {
  item: any;
  save: (value: any) => Promise<unknown>;
}) {
  const [form, setForm] = useState({
    ...item,
    schemaJson: item.schemaJson ? JSON.stringify(item.schemaJson, null, 2) : "",
  });
  const update = (key: string, value: any) =>
    setForm((current: any) => ({ ...current, [key]: value }));
  return (
    <form
      className="seo-editor"
      onSubmit={e => {
        e.preventDefault();
        void save({
          title: form.title,
          description: form.description,
          canonicalPath: form.canonicalPath,
          noindex: form.noindex,
          ogTitle: form.ogTitle,
          ogDescription: form.ogDescription,
          ogImage: form.ogImage,
          twitterImage: form.twitterImage,
          schemaJson: form.schemaJson,
        });
      }}
    >
      {[
        ["title", "Page title"],
        ["description", "Meta description"],
        ["canonicalPath", "Canonical path"],
        ["ogTitle", "Open Graph title"],
        ["ogDescription", "Open Graph description"],
        ["ogImage", "Open Graph image"],
        ["twitterImage", "Social image"],
      ].map(([key, label]) => (
        <label key={key}>
          {label}
          {key.includes("description") ? (
            <textarea
              rows={3}
              value={form[key] ?? ""}
              onChange={e => update(key, e.target.value)}
            />
          ) : (
            <input
              value={form[key] ?? ""}
              onChange={e => update(key, e.target.value)}
            />
          )}
        </label>
      ))}
      <label className="toggle">
        <input
          type="checkbox"
          checked={form.noindex}
          onChange={e => update("noindex", e.target.checked)}
        />
        <span>Noindex this route</span>
      </label>
      <label>
        Page-specific JSON-LD
        <textarea
          className="code-area"
          rows={12}
          value={form.schemaJson}
          onChange={e => update("schemaJson", e.target.value)}
          placeholder='{"@context":"https://schema.org","@type":"WebPage",...}'
        />
        <small>
          Markup must be accurate and visible on this page. Unsupported types
          and malformed JSON are rejected.
        </small>
      </label>
      <button className="button">Save SEO</button>
    </form>
  );
}
