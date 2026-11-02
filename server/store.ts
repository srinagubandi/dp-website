import type { NewLead } from "../drizzle/schema";
import type { ContentSeed, SectionSeed, SeoSeed } from "../shared/site";
import { createLead, getAllContent, getAllSections, getAllSeo, getPublicConfig, leadCounts, listLeads, putSeo, updateContent, updateLead, updateSection, type Database, type LeadFilter } from "./db";

export type StoredContent = ContentSeed & { id: number; createdAt?: Date; updatedAt?: Date };
export type StoredSection = SectionSeed & { id: number; createdAt?: Date; updatedAt?: Date };
export type StoredSeo = Omit<SeoSeed, "schemaJson"> & { schemaJson: unknown; createdAt?: Date; updatedAt?: Date };

export interface AppStore {
  createLead(value: NewLead): Promise<unknown>;
  listLeads(filter: LeadFilter): Promise<any[]>;
  updateLead(id: number, patch: { status?: string; notes?: string | null }): Promise<any | null>;
  leadCounts(): Promise<Record<string, number>>;
  publicConfig(): Promise<{ content: any[]; sections: any[]; seo: any[] }>;
  getContent(): Promise<any[]>;
  updateContent(id: number, patch: any): Promise<any | null>;
  getSections(): Promise<any[]>;
  updateSection(id: number, patch: any): Promise<any | null>;
  getSeo(): Promise<any[]>;
  putSeo(route: string, value: any): Promise<any>;
}

export function postgresStore(db: Database): AppStore {
  return {
    createLead: value => createLead(db, value),
    listLeads: filter => listLeads(db, filter),
    updateLead: (id, patch) => updateLead(db, id, patch),
    leadCounts: () => leadCounts(db),
    publicConfig: () => getPublicConfig(db),
    getContent: () => getAllContent(db),
    updateContent: (id, patch) => updateContent(db, id, patch),
    getSections: () => getAllSections(db),
    updateSection: (id, patch) => updateSection(db, id, patch),
    getSeo: () => getAllSeo(db),
    putSeo: (route, value) => putSeo(db, { ...value, route }),
  };
}
