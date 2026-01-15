/**
 * =============================================================================
 * ADMIN.TSX - Admin Dashboard for Content Management
 * =============================================================================
 * 
 * This page allows administrators to:
 *   - View and manage site content (text, images, links)
 *   - View and manage lead submissions
 *   - Add/edit/delete content blocks
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Loader2
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();
  
  // Fetch data
  const { data: siteContent, isLoading: contentLoading } = trpc.admin.getAllContent.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );
  const { data: leads, isLoading: leadsLoading } = trpc.admin.getAllLeads.useQuery(
    undefined,
    { enabled: user?.role === "admin" }
  );

  // Mutations
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

  // Form state for adding new content
  const [newContent, setNewContent] = useState({
    section: "",
    key: "",
    value: "",
    label: "",
    contentType: "text" as "text" | "textarea" | "image" | "link",
  });

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
              <p className="text-sm text-blue-100">Manage site content and leads</p>
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
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Site Content
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads ({leads?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Site Content Tab */}
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

          {/* Leads Tab */}
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
                        <TableHead className="w-[150px]">Actions</TableHead>
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
                    No leads yet. Leads will appear here when visitors submit the ROI Calculator or Contact forms.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Editable content row component
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
