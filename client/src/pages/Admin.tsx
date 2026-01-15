/**
 * =============================================================================
 * ADMIN.TSX - Admin Dashboard for Content Management
 * =============================================================================
 * 
 * This page allows administrators to:
 *   - View and manage site content (text, images, links)
 *   - View and manage lead submissions
 *   - Manage testimonials and case studies
 *   - Configure notification settings (Email, SMS, WhatsApp)
 * 
 * ACCESS: Requires admin login via /admin/login
 *         Uses token-based authentication stored in localStorage
 * 
 * RAILWAY DEPLOYMENT:
 *   Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables
 *   Default credentials: admin / DocPropel2024!
 * 
 * =============================================================================
 */

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Settings, 
  FileText, 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  ArrowLeft,
  Phone,
  Mail,
  Building,
  Loader2,
  MessageSquare,
  Bell,
  Star,
  Quote,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  
  // =============================================================================
  // ADMIN TOKEN AUTHENTICATION
  // =============================================================================
  
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for admin token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdminToken(token);
    } else {
      setIsVerifying(false);
    }
  }, []);
  
  // Verify token with server
  const { data: tokenVerification, isLoading: verifyLoading } = trpc.adminAuth.verify.useQuery(
    { token: adminToken || "" },
    { 
      enabled: !!adminToken,
      retry: false,
    }
  );
  
  // Update auth state based on verification
  useEffect(() => {
    if (adminToken && !verifyLoading) {
      if (tokenVerification?.valid) {
        setIsAuthenticated(true);
      } else {
        // Token invalid, clear it
        localStorage.removeItem("adminToken");
        setAdminToken(null);
      }
      setIsVerifying(false);
    }
  }, [adminToken, tokenVerification, verifyLoading]);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    setIsAuthenticated(false);
    setLocation("/admin/login");
  };
  
  // =============================================================================
  // DATA FETCHING (only when authenticated)
  // =============================================================================
  
  const { data: siteContent, isLoading: contentLoading } = trpc.admin.getAllContent.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: leads, isLoading: leadsLoading } = trpc.admin.getAllLeads.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: testimonials, isLoading: testimonialsLoading } = trpc.admin.getAllTestimonials.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: notificationSettings, isLoading: notificationsLoading } = trpc.admin.getNotificationSettings.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // =============================================================================
  // MUTATIONS
  // =============================================================================

  const upsertContent = trpc.admin.upsertContent.useMutation({
    onSuccess: () => {
      utils.admin.getAllContent.invalidate();
      toast.success("Content saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save content: " + error.message);
    },
  });

  const updateContent = trpc.admin.updateContent.useMutation({
    onSuccess: () => {
      utils.admin.getAllContent.invalidate();
      toast.success("Content updated");
    },
  });

  const deleteContent = trpc.admin.deleteContent.useMutation({
    onSuccess: () => {
      utils.admin.getAllContent.invalidate();
      toast.success("Content deleted");
    },
  });

  const updateLeadStatusMutation = trpc.admin.updateLeadStatus.useMutation({
    onSuccess: () => {
      utils.admin.getAllLeads.invalidate();
      toast.success("Lead status updated");
    },
  });

  const deleteLead = trpc.admin.deleteLead.useMutation({
    onSuccess: () => {
      utils.admin.getAllLeads.invalidate();
      toast.success("Lead deleted");
    },
  });

  const createTestimonialMutation = trpc.admin.createTestimonial.useMutation({
    onSuccess: () => {
      utils.admin.getAllTestimonials.invalidate();
      toast.success("Testimonial created");
      setNewTestimonial({
        clientName: "",
        practiceName: "",
        specialty: "",
        location: "",
        quote: "",
        growthPercent: undefined,
        newPatientsPerMonth: undefined,
        rating: 5,
      });
    },
    onError: (error) => {
      toast.error("Failed to create testimonial: " + error.message);
    },
  });

  const updateTestimonialMutation = trpc.admin.updateTestimonial.useMutation({
    onSuccess: () => {
      utils.admin.getAllTestimonials.invalidate();
      toast.success("Testimonial updated");
    },
  });

  const deleteTestimonialMutation = trpc.admin.deleteTestimonial.useMutation({
    onSuccess: () => {
      utils.admin.getAllTestimonials.invalidate();
      toast.success("Testimonial deleted");
    },
  });

  const saveNotificationSettings = trpc.admin.updateNotificationSettings.useMutation({
    onSuccess: () => {
      utils.admin.getNotificationSettings.invalidate();
      toast.success("Notification settings saved");
    },
    onError: (error) => {
      toast.error("Failed to save settings: " + error.message);
    },
  });

  // =============================================================================
  // LOCAL STATE
  // =============================================================================

  const [newContent, setNewContent] = useState({
    section: "",
    key: "",
    value: "",
    label: "",
    contentType: "text" as "text" | "textarea" | "link" | "image",
  });

  const [newTestimonial, setNewTestimonial] = useState({
    clientName: "",
    practiceName: "",
    specialty: "",
    location: "",
    quote: "",
    growthPercent: undefined as number | undefined,
    newPatientsPerMonth: undefined as number | undefined,
    rating: 5,
  });

  const [notifForm, setNotifForm] = useState({
    email_enabled: "false",
    email_recipient: "",
    sms_enabled: "false",
    sms_phone: "",
    whatsapp_enabled: "false",
    whatsapp_phone: "",
  });

  // Sync notification settings when loaded
  useEffect(() => {
    if (notificationSettings) {
      setNotifForm({
        email_enabled: notificationSettings.email_enabled || "false",
        email_recipient: notificationSettings.email_recipient || "",
        sms_enabled: notificationSettings.sms_enabled || "false",
        sms_phone: notificationSettings.sms_phone || "",
        whatsapp_enabled: notificationSettings.whatsapp_enabled || "false",
        whatsapp_phone: notificationSettings.whatsapp_phone || "",
      });
    }
  }, [notificationSettings]);

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  // Loading/Verifying state
  if (isVerifying || verifyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-primary">Admin Login Required</CardTitle>
            <CardDescription>
              Please log in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/login">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Go to Login
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Group content by section
  const contentBySection = siteContent?.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof siteContent>);

  const handleAddContent = () => {
    if (!newContent.section || !newContent.key || !newContent.value) {
      toast.error("Please fill in all required fields");
      return;
    }
    upsertContent.mutate({
      section: newContent.section,
      key: newContent.key,
      value: newContent.value,
      label: newContent.label || undefined,
      contentType: newContent.contentType,
    });
    setNewContent({ section: "", key: "", value: "", label: "", contentType: "text" });
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.clientName || !newTestimonial.quote) {
      toast.error("Please fill in client name and quote");
      return;
    }
    createTestimonialMutation.mutate({
      clientName: newTestimonial.clientName,
      practiceName: newTestimonial.practiceName || undefined,
      specialty: newTestimonial.specialty || undefined,
      location: newTestimonial.location || undefined,
      quote: newTestimonial.quote,
      growthPercent: newTestimonial.growthPercent,
      newPatientsPerMonth: newTestimonial.newPatientsPerMonth,
      rating: newTestimonial.rating,
      isVisible: "true",
      isFeatured: "false",
    });
  };

  const handleSaveNotifications = () => {
    saveNotificationSettings.mutate(notifForm);
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-lg">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/images/docpropel-logo.png" alt="DocPropel" className="h-8" />
            </Link>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100 text-sm">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Quote className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* ============================================================= */}
          {/* CONTENT TAB */}
          {/* ============================================================= */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Content
                </CardTitle>
                <CardDescription>
                  Add editable content blocks for your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <Label>Section *</Label>
                    <Input
                      placeholder="e.g., header, footer, hero"
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Key *</Label>
                    <Input
                      placeholder="e.g., phone, headline"
                      value={newContent.key}
                      onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Label</Label>
                    <Input
                      placeholder="Display label"
                      value={newContent.label}
                      onChange={(e) => setNewContent({ ...newContent, label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={newContent.contentType}
                      onValueChange={(v) => setNewContent({ ...newContent, contentType: v as typeof newContent.contentType })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddContent} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Value *</Label>
                  <Textarea
                    placeholder="Content value"
                    value={newContent.value}
                    onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Existing Content */}
            {contentLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : contentBySection && Object.keys(contentBySection).length > 0 ? (
              Object.entries(contentBySection).map(([section, items]) => (
                <Card key={section}>
                  <CardHeader>
                    <CardTitle className="capitalize">{section}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>Label</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-mono text-sm">{item.key}</TableCell>
                            <TableCell>{item.label || "-"}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{item.value}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.contentType}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteContent.mutate({ id: item.id })}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No content added yet. Use the form above to add your first content block.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ============================================================= */}
          {/* LEADS TAB */}
          {/* ============================================================= */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Lead Submissions
                </CardTitle>
                <CardDescription>
                  View and manage leads from the contact form and ROI calculator
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : leads && leads.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="text-sm">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                              {lead.email}
                            </a>
                          </TableCell>
                          <TableCell>{lead.specialty || "-"}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Form</Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={lead.status}
                              onValueChange={(v) => updateLeadStatusMutation.mutate({ id: lead.id, status: v as "new" | "contacted" | "qualified" | "converted" | "closed" })}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteLead.mutate({ id: lead.id })}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No leads yet. Leads will appear here when visitors submit the contact form or ROI calculator.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================= */}
          {/* TESTIMONIALS TAB */}
          {/* ============================================================= */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Testimonial
                </CardTitle>
                <CardDescription>
                  Add client testimonials to display on the Results page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Client Name *</Label>
                    <Input
                      placeholder="Dr. John Smith"
                      value={newTestimonial.clientName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Practice Name</Label>
                    <Input
                      placeholder="Smith Family Dentistry"
                      value={newTestimonial.practiceName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, practiceName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Specialty</Label>
                    <Select
                      value={newTestimonial.specialty}
                      onValueChange={(v) => setNewTestimonial({ ...newTestimonial, specialty: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Doctors">Doctors</SelectItem>
                        <SelectItem value="Dentists">Dentists</SelectItem>
                        <SelectItem value="Pharmacies">Pharmacies</SelectItem>
                        <SelectItem value="PT/OT">PT / OT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="Austin, TX"
                      value={newTestimonial.location}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Growth %</Label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={newTestimonial.growthPercent || ""}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, growthPercent: e.target.value ? parseInt(e.target.value) : undefined })}
                    />
                  </div>
                  <div>
                    <Label>New Patients/Month</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={newTestimonial.newPatientsPerMonth || ""}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, newPatientsPerMonth: e.target.value ? parseInt(e.target.value) : undefined })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Quote *</Label>
                  <Textarea
                    placeholder="DocPropel transformed our practice..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddTestimonial}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Testimonials */}
            {testimonialsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {testimonials.map((t) => (
                  <Card key={t.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold">{t.clientName}</h4>
                          {t.practiceName && <p className="text-sm text-muted-foreground">{t.practiceName}</p>}
                          {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={t.isVisible ? "default" : "secondary"}>
                            {t.isVisible ? "Visible" : "Hidden"}
                          </Badge>
                          {t.isFeatured && <Badge variant="outline">Featured</Badge>}
                        </div>
                      </div>
                      <p className="text-sm italic mb-4">"{t.quote}"</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        {t.growthPercent && <span>+{t.growthPercent}% growth</span>}
                        {t.newPatientsPerMonth && <span>{t.newPatientsPerMonth} new patients/mo</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTestimonialMutation.mutate({ id: t.id, isVisible: t.isVisible === "true" ? "false" : "true" })}
                        >
                          {t.isVisible === "true" ? "Hide" : "Show"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTestimonialMutation.mutate({ id: t.id, isFeatured: t.isFeatured === "true" ? "false" : "true" })}
                        >
                          {t.isFeatured === "true" ? "Unfeature" : "Feature"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTestimonialMutation.mutate({ id: t.id })}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No testimonials yet. Add your first client testimonial above.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ============================================================= */}
          {/* NOTIFICATIONS TAB */}
          {/* ============================================================= */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications when new leads come in.
                  Make sure to set the required environment variables on Railway.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Email Notifications</h3>
                    </div>
                    <Switch
                      checked={notifForm.email_enabled === "true"}
                      onCheckedChange={(c) => setNotifForm({ ...notifForm, email_enabled: c ? "true" : "false" })}
                    />
                  </div>
                  {notifForm.email_enabled === "true" && (
                    <div>
                      <Label>Recipient Email</Label>
                      <Input
                        type="email"
                        placeholder="admin@docpropel.com"
                        value={notifForm.email_recipient}
                        onChange={(e) => setNotifForm({ ...notifForm, email_recipient: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Requires SENDGRID_API_KEY environment variable
                      </p>
                    </div>
                  )}
                </div>

                {/* SMS Notifications */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">SMS Notifications</h3>
                    </div>
                    <Switch
                      checked={notifForm.sms_enabled === "true"}
                      onCheckedChange={(c) => setNotifForm({ ...notifForm, sms_enabled: c ? "true" : "false" })}
                    />
                  </div>
                  {notifForm.sms_enabled === "true" && (
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        placeholder="+1234567890"
                        value={notifForm.sms_phone}
                        onChange={(e) => setNotifForm({ ...notifForm, sms_phone: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
                      </p>
                    </div>
                  )}
                </div>

                {/* WhatsApp Notifications */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">WhatsApp Notifications</h3>
                    </div>
                    <Switch
                      checked={notifForm.whatsapp_enabled === "true"}
                      onCheckedChange={(c) => setNotifForm({ ...notifForm, whatsapp_enabled: c ? "true" : "false" })}
                    />
                  </div>
                  {notifForm.whatsapp_enabled === "true" && (
                    <div>
                      <Label>WhatsApp Number</Label>
                      <Input
                        type="tel"
                        placeholder="+1234567890"
                        value={notifForm.whatsapp_phone}
                        onChange={(e) => setNotifForm({ ...notifForm, whatsapp_phone: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Requires TWILIO_WHATSAPP_NUMBER (uses Twilio WhatsApp API)
                      </p>
                    </div>
                  )}
                </div>

                <Button onClick={handleSaveNotifications} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
