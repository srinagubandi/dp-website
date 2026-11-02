import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { api } from "./api";

export default function AdminLogin() {
  const [, navigate] = useLocation(); const [pending,setPending]=useState(false); const [error,setError]=useState(""); const heading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{ document.title="Admin sign in | DocPropel"; heading.current?.focus(); api("/api/admin/session").then(()=>navigate("/admin")).catch(()=>undefined); },[navigate]);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setPending(true);setError("");const form=new FormData(event.currentTarget);try{await api("/api/admin/login",{method:"POST",body:JSON.stringify({email:form.get("email"),password:form.get("password")})});navigate("/admin");}catch(reason){setError(reason instanceof Error?reason.message:"Sign in failed.");}finally{setPending(false);}}
  return <main className="auth-shell"><section className="auth-card"><Link href="/" aria-label="DocPropel home"><img src="/docpropel-logo-dark.svg" alt="DocPropel" width="180" height="36"/></Link><p className="eyebrow">Protected operations</p><h1 ref={heading} tabIndex={-1}>Admin sign in</h1><p>Use the administrator credentials configured in the deployment environment.</p><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label>{error&&<p role="alert" className="form-error">{error}</p>}<button className="button" disabled={pending}>{pending?"Signing in…":"Sign in"}</button></form><Link href="/" className="text-link">Return to public site</Link></section></main>;
}
