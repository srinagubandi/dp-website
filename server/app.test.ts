import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app";
import type { AppStore } from "./store";
import { DEFAULT_CONTENT, DEFAULT_SECTIONS, DEFAULT_SEO } from "../shared/site";

function memoryStore(): AppStore {
  const leads:any[]=[];
  const content=DEFAULT_CONTENT.map((item,id)=>({...item,id:id+1}));
  const sections=DEFAULT_SECTIONS.map((item,id)=>({...item,id:id+1}));
  const seo=DEFAULT_SEO.map(item=>({...item,schemaJson:null}));
  return {
    async createLead(value){const lead={...value,id:leads.length+1,status:"new",notes:null,createdAt:new Date(),updatedAt:new Date()};leads.push(lead);return {id:lead.id,createdAt:lead.createdAt}},
    async listLeads(filter){return leads.filter(item=>(!filter.status||item.status===filter.status)&&(!filter.specialty||item.specialty===filter.specialty)&&(!filter.search||`${item.name} ${item.email} ${item.practiceName}`.toLowerCase().includes(filter.search.toLowerCase())))},
    async updateLead(id,patch){const item=leads.find(row=>row.id===id);if(!item)return null;Object.assign(item,patch,{updatedAt:new Date()});return item},
    async leadCounts(){return {all:leads.length,new:leads.filter(x=>x.status==="new").length,contacted:0,qualified:0,closed:0}},
    async publicConfig(){return {content,sections,seo}},
    async getContent(){return content},async updateContent(id,patch){const item=content.find(row=>row.id===id);if(!item)return null;Object.assign(item,patch);return item},
    async getSections(){return sections},async updateSection(id,patch){const item=sections.find(row=>row.id===id);if(!item)return null;Object.assign(item,patch);return item},
    async getSeo(){return seo},async putSeo(route,value){const index=seo.findIndex(row=>row.route===route);const item={...value,route};if(index>=0)seo[index]=item as any;else seo.push(item as any);return item},
  };
}
const env={adminEmail:"admin@example.com",adminPassword:"correct horse battery staple",sessionSecret:"a-very-long-test-secret-that-is-over-thirty-two-characters",production:false};
const validLead={name:"Alex Morgan",email:" ALEX@example.com ",practiceName:"Example Practice",specialty:"Dental Practice",consent:true,website:"",phone:"",location:"",monthlyPatients:"",message:"General growth planning only.",source:"/contact",utmSource:null,utmMedium:null,utmCampaign:null};
let store:AppStore;
beforeEach(()=>{store=memoryStore()});

async function loginAgent(){const agent=request.agent(createApp({store,env,databaseConfigured:true}));const response=await agent.post("/api/admin/login").send({email:env.adminEmail,password:env.adminPassword});return {agent,response};}

describe("DocPropel v6 REST API",()=>{
  it("validates, normalizes, and accepts a complete lead",async()=>{const result=await request(createApp({store,env,databaseConfigured:true})).post("/api/leads").send(validLead);expect(result.status).toBe(201);expect(result.body).toMatchObject({success:true,error:null,data:{id:1}});const items=await store.listLeads({});expect(items[0].email).toBe("alex@example.com")});
  it("rejects missing lead requirements and unexpected input",async()=>{const result=await request(createApp({store,env,databaseConfigured:true})).post("/api/leads").send({email:"bad",secret:"no"});expect(result.status).toBe(400);expect(result.body.success).toBe(false);expect(result.body.error.code).toBe("VALIDATION_ERROR")});
  it("blocks protected admin endpoints without a session",async()=>{const result=await request(createApp({store,env,databaseConfigured:true})).get("/api/admin/content");expect(result.status).toBe(401);expect(result.body.error.code).toBe("UNAUTHORIZED")});
  it("issues an eight-hour http-only strict session and clears it on logout",async()=>{const {agent,response}=await loginAgent();expect(response.status).toBe(200);const cookie=response.headers["set-cookie"]?.[0]??"";expect(cookie).toContain("HttpOnly");expect(cookie).toContain("SameSite=Strict");expect(cookie).toContain("Max-Age=28800");expect((await agent.get("/api/admin/session")).status).toBe(200);const logout=await agent.post("/api/admin/logout");expect(logout.status).toBe(200);expect(logout.headers["set-cookie"]?.[0]).toContain("Expires=")});
  it("rejects invalid login without setting a cookie",async()=>{const result=await request(createApp({store,env,databaseConfigured:true})).post("/api/admin/login").send({email:env.adminEmail,password:"wrong"});expect(result.status).toBe(401);expect(result.headers["set-cookie"]).toBeUndefined()});
  it("updates a public section visibility flag through the protected endpoint",async()=>{const {agent}=await loginAgent();const result=await agent.patch("/api/admin/sections/1").send({enabled:false,title:"Hero",sortOrder:0});expect(result.status).toBe(200);expect(result.body.data.enabled).toBe(false);const publicConfig=await request(createApp({store,env,databaseConfigured:true})).get("/api/public/config");expect(publicConfig.body.data.sections[0].enabled).toBe(false)});
  it("updates editable content and rejects malformed or unsupported JSON-LD",async()=>{const {agent}=await loginAgent();const content=await agent.put("/api/admin/content/1").send({value:"Approved edited copy"});expect(content.status).toBe(200);expect(content.body.data.value).toBe("Approved edited copy");const base={title:"A sufficiently clear page title",description:"A sufficiently detailed description of the visible page content.",canonicalPath:"/",noindex:false,ogTitle:"A sufficiently clear social title",ogDescription:"A sufficiently detailed social description of visible page content.",ogImage:"/og-image-1200x630.png",twitterImage:"/twitter-card-1200x630.png"};expect((await agent.put("/api/admin/seo/").send({...base,schemaJson:"{"})).status).toBe(400);expect((await agent.put("/api/admin/seo/").send({...base,schemaJson:JSON.stringify({"@context":"https://schema.org","@type":"Review"})})).status).toBe(400);const valid=await agent.put("/api/admin/seo/").send({...base,schemaJson:JSON.stringify({"@context":"https://schema.org","@type":"WebPage",name:"Visible title"})});expect(valid.status).toBe(200)});
});
