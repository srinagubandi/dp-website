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
 * ACCESS: Requires admin role. Regular users will be redirected.
 * 
 * =============================================================================
 */

import { useAuth } from "@/_core/hooks/useAuth";
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
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();
  
  // =============================================================================
  // DATA FETCHING
  // =============================================================================
  
  const { data: siteContent, isLoading: contentLoading } = trpc.admin.getAllContent.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );
  const { data: leads, isLoading: leadsLoading } = trpc.admin.getAllLeads.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );
  const { data: testimonials, isLoading: testimonialsLoading } = trpc.admin.getAllTestimonials.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );
  const { data: notificationSettings, isLoading: notificationsLoading } = trpc.admin.getNotificationSettings.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
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

  const updateLeadStatus = trpc.admin.updateLeadStatus.useMutation({
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

  const createTestimonial = trpc.admin.createTestimonial.useMutation({
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

  const updateTestimonial = trpc.admin.updateTestimonial.useMutation({
    onSuccess: () => {
      utils.admin.getAllTestimonials.invalidate();
      toast.success("Testimonial updated");
    },
  });

  const deleteTestimonial = trpc.admin.deleteTestimonial.useMutation({
    onSuccess: () => {
      utils.admin.getAllTestimonials.invalidate();
      toast.success("Testimonial deleted");
    },
  });

  const updateNotificationSettings = trpc.admin.updateNotificationSettings.useMutation({
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

  // New content form
  const [newContent, setNewContent] = useState({
    section: "",
    key: "",
    value: "",
    label: "",
    contentType: "text" as "text" | "textarea" | "image" | "link",
  });

  // New testimonial form
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

  // Notification settings form
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

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in or not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You must be an administrator to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
      toast.error("Client name and quote are required");
      return;
    }
    createTestimonial.mutate({
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

  const handleSaveNotificationSettings = () => {
    updateNotificationSettings.mutate(notifForm);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "qualified": return "bg-purple-100 text-purple-800";
      case "converted": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-blue-100">Manage site content, leads, and settings</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Logged in as: {user.name || user.email}</span>
            <Badge variant="secondary">Admin</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads ({leads?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Quote className="h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* ================================================================= */}
          {/* SITE CONTENT TAB */}
          {/* ================================================================= */}
          <TabsContent value="content" className="space-y-6">
            {/* Add New Content Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Content
                </CardTitle>
                <CardDescription>
                  Add a new editable content block to the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      placeholder="e.g., hero, contact, footer"
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="key">Key</Label>
                    <Input
                      id="key"
                      placeholder="e.g., headline, phone"
                      value={newContent.key}
                      onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="label">Label (optional)</Label>
                    <Input
                      id="label"
                      placeholder="Display label"
                      value={newContent.label}
                      onChange={(e) => setNewContent({ ...newContent, label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newContent.contentType}
                      onValueChange={(value: "text" | "textarea" | "image" | "link") => 
                        setNewContent({ ...newContent, contentType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="image">Image URL</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddContent} disabled={upsertContent.isPending}>
                      {upsertContent.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      Add
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="value">Value</Label>
                  {newContent.contentType === "textarea" ? (
                    <Textarea
                      id="value"
                      placeholder="Content value"
                      value={newContent.value}
                      onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id="value"
                      placeholder="Content value"
                      value={newContent.value}
                      onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Existing Content by Section */}
            {contentLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : contentBySection && Object.keys(contentBySection).length > 0 ? (
              Object.entries(contentBySection).map(([section, items]) => (
                <Card key={section}>
                  <CardHeader>
                    <CardTitle className="capitalize">{section} Section</CardTitle>
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
                          <ContentRow 
                            key={item.id} 
                            item={item} 
                            onUpdate={(id, value) => updateContent.mutate({ id, value })}
                            onDelete={(id) => deleteContent.mutate({ id })}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No content entries yet. Add your first content block above.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ================================================================= */}
          {/* LEADS TAB */}
          {/* ================================================================= */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Lead Submissions</CardTitle>
                <CardDescription>
                  View and manage leads from the ROI Calculator and Contact forms
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
                        <TableHead>Contact</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="text-sm">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {lead.contactName && (
                                <div className="font-medium">{lead.contactName}</div>
                              )}
                              {lead.email && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {lead.email}
                                </div>
                              )}
                              {lead.phone && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {lead.phone}
                                </div>
                              )}
                              {lead.practiceName && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Building className="h-3 w-3" />
                                  {lead.practiceName}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{lead.specialty || "-"}</TableCell>
                          <TableCell>
                            <Select
                              value={lead.status}
                              onValueChange={(value: "new" | "contacted" | "qualified" | "converted" | "closed") => 
                                updateLeadStatus.mutate({ id: lead.id, status: value })
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <Badge className={getStatusColor(lead.status)}>
                                  {lead.status}
                                </Badge>
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
                          <TableCell className="max-w-[200px] truncate text-sm">
                            {lead.message || lead.adminNotes || "-"}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this lead?")) {
                                  deleteLead.mutate({ id: lead.id });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No leads yet. Leads will appear here when visitors submit forms.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================= */}
          {/* TESTIMONIALS TAB */}
          {/* ================================================================= */}
          <TabsContent value="testimonials" className="space-y-6">
            {/* Add New Testimonial */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Testimonial
                </CardTitle>
                <CardDescription>
                  Add client testimonials and case study highlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      placeholder="Dr. John Smith"
                      value={newTestimonial.clientName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="practiceName">Practice Name</Label>
                    <Input
                      id="practiceName"
                      placeholder="Smith Family Dental"
                      value={newTestimonial.practiceName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, practiceName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select
                      value={newTestimonial.specialty}
                      onValueChange={(value) => setNewTestimonial({ ...newTestimonial, specialty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Doctors">Doctors</SelectItem>
                        <SelectItem value="Dentists">Dentists</SelectItem>
                        <SelectItem value="Pharmacies">Pharmacies</SelectItem>
                        <SelectItem value="PT/OT">PT/OT Clinics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Austin, TX"
                      value={newTestimonial.location}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="growthPercent">Growth %</Label>
                    <Input
                      id="growthPercent"
                      type="number"
                      placeholder="32"
                      value={newTestimonial.growthPercent || ""}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, growthPercent: e.target.value ? parseInt(e.target.value) : undefined })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPatients">New Patients/Month</Label>
                    <Input
                      id="newPatients"
                      type="number"
                      placeholder="45"
                      value={newTestimonial.newPatientsPerMonth || ""}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, newPatientsPerMonth: e.target.value ? parseInt(e.target.value) : undefined })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="quote">Testimonial Quote *</Label>
                  <Textarea
                    id="quote"
                    placeholder="DocPropel transformed our practice..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddTestimonial} disabled={createTestimonial.isPending}>
                    {createTestimonial.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                {testimonialsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : testimonials && testimonials.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Quote</TableHead>
                        <TableHead>Metrics</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell>
                            <div className="font-medium">{t.clientName}</div>
                            {t.practiceName && (
                              <div className="text-sm text-muted-foreground">{t.practiceName}</div>
                            )}
                            {t.location && (
                              <div className="text-xs text-muted-foreground">{t.location}</div>
                            )}
                          </TableCell>
                          <TableCell>{t.specialty || "-"}</TableCell>
                          <TableCell className="max-w-[250px]">
                            <p className="truncate text-sm italic">"{t.quote}"</p>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              {t.growthPercent && <div>+{t.growthPercent}% growth</div>}
                              {t.newPatientsPerMonth && <div>{t.newPatientsPerMonth} new/mo</div>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <Badge variant={t.isVisible === "true" ? "default" : "secondary"}>
                                {t.isVisible === "true" ? "Visible" : "Hidden"}
                              </Badge>
                              {t.isFeatured === "true" && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" /> Featured
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  updateTestimonial.mutate({
                                    id: t.id,
                                    isVisible: t.isVisible === "true" ? "false" : "true",
                                  });
                                }}
                              >
                                {t.isVisible === "true" ? "👁" : "👁‍🗨"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => {
                                  if (confirm("Delete this testimonial?")) {
                                    deleteTestimonial.mutate({ id: t.id });
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No testimonials yet. Add your first testimonial above.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================= */}
          {/* NOTIFICATIONS TAB */}
          {/* ================================================================= */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications when new leads come in.
                  Enable Email, SMS, and/or WhatsApp notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {notificationsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    {/* Email Notifications */}
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive lead notifications via email (requires SendGrid API key)
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifForm.email_enabled === "true"}
                          onCheckedChange={(checked) => 
                            setNotifForm({ ...notifForm, email_enabled: checked ? "true" : "false" })
                          }
                        />
                      </div>
                      {notifForm.email_enabled === "true" && (
                        <div>
                          <Label htmlFor="email_recipient">Recipient Email</Label>
                          <Input
                            id="email_recipient"
                            type="email"
                            placeholder="you@example.com"
                            value={notifForm.email_recipient}
                            onChange={(e) => setNotifForm({ ...notifForm, email_recipient: e.target.value })}
                          />
                        </div>
                      )}
                    </div>

                    {/* SMS Notifications */}
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">SMS Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive lead notifications via SMS (requires Twilio credentials)
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifForm.sms_enabled === "true"}
                          onCheckedChange={(checked) => 
                            setNotifForm({ ...notifForm, sms_enabled: checked ? "true" : "false" })
                          }
                        />
                      </div>
                      {notifForm.sms_enabled === "true" && (
                        <div>
                          <Label htmlFor="sms_phone">Phone Number</Label>
                          <Input
                            id="sms_phone"
                            type="tel"
                            placeholder="+1234567890"
                            value={notifForm.sms_phone}
                            onChange={(e) => setNotifForm({ ...notifForm, sms_phone: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Include country code (e.g., +1 for US)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* WhatsApp Notifications */}
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                          <div>
                            <h3 className="font-semibold">WhatsApp Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive lead notifications via WhatsApp (requires Twilio WhatsApp)
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifForm.whatsapp_enabled === "true"}
                          onCheckedChange={(checked) => 
                            setNotifForm({ ...notifForm, whatsapp_enabled: checked ? "true" : "false" })
                          }
                        />
                      </div>
                      {notifForm.whatsapp_enabled === "true" && (
                        <div>
                          <Label htmlFor="whatsapp_phone">WhatsApp Number</Label>
                          <Input
                            id="whatsapp_phone"
                            type="tel"
                            placeholder="+1234567890"
                            value={notifForm.whatsapp_phone}
                            onChange={(e) => setNotifForm({ ...notifForm, whatsapp_phone: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Include country code. Must be registered with WhatsApp.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <Button 
                      onClick={handleSaveNotificationSettings}
                      disabled={updateNotificationSettings.isPending}
                      className="w-full"
                    >
                      {updateNotificationSettings.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Notification Settings
                    </Button>

                    {/* API Keys Notice */}
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Required API Keys</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        To enable notifications, you need to configure the following environment variables:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li><code className="bg-background px-1 rounded">SENDGRID_API_KEY</code> - For email notifications</li>
                        <li><code className="bg-background px-1 rounded">TWILIO_ACCOUNT_SID</code> - For SMS/WhatsApp</li>
                        <li><code className="bg-background px-1 rounded">TWILIO_AUTH_TOKEN</code> - For SMS/WhatsApp</li>
                        <li><code className="bg-background px-1 rounded">TWILIO_PHONE_NUMBER</code> - For SMS</li>
                        <li><code className="bg-background px-1 rounded">TWILIO_WHATSAPP_NUMBER</code> - For WhatsApp</li>
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function ContentRow({ 
  item, 
  onUpdate, 
  onDelete 
}: { 
  item: { id: number; key: string; label: string | null; value: string; contentType: string };
  onUpdate: (id: number, value: string) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.value);

  const handleSave = () => {
    onUpdate(item.id, editValue);
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-sm">{item.key}</TableCell>
      <TableCell>{item.label || "-"}</TableCell>
      <TableCell className="max-w-[300px]">
        {isEditing ? (
          item.contentType === "textarea" ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={3}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          )
        ) : (
          <span className="truncate block">{item.value}</span>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="outline">{item.contentType}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          {isEditing ? (
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4 text-green-600" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this content?")) {
                onDelete(item.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
