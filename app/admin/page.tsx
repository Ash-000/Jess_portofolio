"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  ArrowLeft,
  CheckCircle,
  FolderOpen,
  Image as ImageIcon,
  Save,
  Loader2,
  Sparkles,
} from "lucide-react";

interface ProjectItem {
  id?: number;
  titleEn: string;
  titleId: string;
  category: string;
  statusEn: string;
  statusId: string;
  descriptionEn: string;
  descriptionId: string;
  metaEn: string;
  metaId: string;
  tags: string;
  image: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "settings">("projects");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [settings, setSettings] = useState<{ hero_image?: string; about_image?: string }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State for Project Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formProject, setFormProject] = useState<ProjectItem>({
    titleEn: "",
    titleId: "",
    category: "Agronomy",
    statusEn: "Published Data",
    statusId: "Data Dipublikasi",
    descriptionEn: "",
    descriptionId: "",
    metaEn: "",
    metaId: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProj, resSet] = await Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/settings").then((r) => r.json()),
      ]);

      if (resProj.projects) setProjects(resProj.projects);
      if (resSet.settings) setSettings(resSet.settings);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Upload file helper
  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data }).then((r) => r.json());
      if (res.url) {
        return res.url;
      }
      return null;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Open Add Project Modal
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormProject({
      titleEn: "",
      titleId: "",
      category: "Agronomy Research",
      statusEn: "Active Trial",
      statusId: "Uji Coba Aktif",
      descriptionEn: "",
      descriptionId: "",
      metaEn: "",
      metaId: "",
      tags: "",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop",
    });
    setIsModalOpen(true);
  };

  // Open Edit Project Modal
  const handleOpenEdit = (proj: ProjectItem) => {
    if (!proj.id) return;
    setEditingId(proj.id);
    setFormProject({ ...proj });
    setIsModalOpen(true);
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { id: editingId, ...formProject } : formProject;

      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json());

      if (res.success) {
        showNotify(editingId ? "Proyek berhasil diperbarui!" : "Proyek baru berhasil ditambahkan!");
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error("Save project error:", err);
    } finally {
      setSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" }).then((r) => r.json());
      if (res.success) {
        showNotify("Proyek berhasil dihapus!");
        fetchData();
      }
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  // Save Site Settings (Hero & About images)
  const handleSaveSettings = async (key: string, value: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      }).then((r) => r.json());

      if (res.success) {
        showNotify(`Pengaturan gambar ${key} berhasil disimpan!`);
        fetchData();
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C110E] text-stone-100 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Header */}
      <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors"
              title="Kembali ke Portofolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="font-title text-xl font-bold text-white flex items-center gap-2">
                <span>CMS Dashboard Database</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                  Live DB
                </span>
              </h1>
              <p className="text-xs text-stone-400">Kelola Data Proyek & Gambar Landing Page</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Lihat Website Utama ↗
          </a>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 space-x-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-4 font-title text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Kelola Proyek ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 font-title text-sm font-bold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === "settings"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Ubah Gambar Landing Page</span>
          </button>
        </div>

        {/* Tab 1: Manage Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Daftar Proyek di Database</h2>
                <p className="text-xs text-stone-400">
                  Proyek yang ada di sini akan langsung tampil pada section &ldquo;Proyek Riset Utama&rdquo; di Landing Page.
                </p>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            {loading ? (
              <div className="py-20 text-center text-stone-400 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500" />
                <p className="text-sm">Memuat data dari SQLite database...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="py-16 text-center bg-stone-900/50 rounded-2xl border border-stone-800 space-y-3">
                <FolderOpen className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-stone-400 text-sm">Belum ada proyek di database.</p>
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold"
                >
                  Tambah Proyek Pertama
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-emerald-800/80 transition-all"
                  >
                    <div>
                      {/* Project Image */}
                      <div className="relative h-44 w-full bg-stone-950">
                        {proj.image ? (
                          <Image
                            src={proj.image}
                            alt={proj.titleEn}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-600 text-xs">
                            Tidak Ada Gambar
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-800/50">
                          {proj.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="space-y-1">
                          <h3 className="font-title text-base font-bold text-white line-clamp-1">
                            {proj.titleId} / {proj.titleEn}
                          </h3>
                          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                            {proj.descriptionId || proj.descriptionEn}
                          </p>
                        </div>

                        {proj.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.tags.split(",").map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-stone-300 font-medium"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-stone-800/80 bg-stone-950/40 flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-mono">ID: #{proj.id}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id!)}
                          className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-semibold flex items-center space-x-1 border border-rose-800/50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Landing Page Images Settings */}
        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="text-lg font-bold text-white">Ubah Gambar Landing Page</h2>
              <p className="text-xs text-stone-400">
                Unggah file gambar dari komputer Anda atau masukkan URL gambar secara langsung.
              </p>
            </div>

            {/* Hero Image Setting */}
            <div className="p-6 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-title text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Gambar Hero Section</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image Preview */}
                <div className="md:col-span-5 relative h-48 w-full bg-stone-950 rounded-xl overflow-hidden border border-stone-800">
                  {settings.hero_image ? (
                    <Image src={settings.hero_image} alt="Hero Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                      Default Image Active
                    </div>
                  )}
                </div>

                {/* Input & Upload */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      URL Gambar Hero
                    </label>
                    <input
                      type="text"
                      value={settings.hero_image || ""}
                      onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })}
                      placeholder="https://... atau /uploads/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 cursor-pointer flex items-center space-x-2 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? "Mengunggah..." : "Unggah File Gambar"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            if (url) {
                              setSettings({ ...settings, hero_image: url });
                            }
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => handleSaveSettings("hero_image", settings.hero_image || "")}
                      disabled={saving}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Image Setting */}
            <div className="p-6 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-title text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Gambar About / Profil Section</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image Preview */}
                <div className="md:col-span-5 relative h-48 w-full bg-stone-950 rounded-xl overflow-hidden border border-stone-800">
                  {settings.about_image ? (
                    <Image src={settings.about_image} alt="About Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                      Default Image Active
                    </div>
                  )}
                </div>

                {/* Input & Upload */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      URL Gambar About
                    </label>
                    <input
                      type="text"
                      value={settings.about_image || ""}
                      onChange={(e) => setSettings({ ...settings, about_image: e.target.value })}
                      placeholder="https://... atau /uploads/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 cursor-pointer flex items-center space-x-2 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? "Mengunggah..." : "Unggah File Gambar"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            if (url) {
                              setSettings({ ...settings, about_image: url });
                            }
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => handleSaveSettings("about_image", settings.about_image || "")}
                      disabled={saving}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Project Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-title text-xl font-bold text-white">
                {editingId ? `Edit Proyek #${editingId}` : "Tambah Proyek Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Judul (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    required
                    value={formProject.titleId}
                    onChange={(e) => setFormProject({ ...formProject, titleId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={formProject.titleEn}
                    onChange={(e) => setFormProject({ ...formProject, titleEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Kategori</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Agronomy Research"
                    value={formProject.category}
                    onChange={(e) => setFormProject({ ...formProject, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Status (ID / EN)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Uji Coba Aktif"
                      value={formProject.statusId}
                      onChange={(e) => setFormProject({ ...formProject, statusId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Active Trial"
                      value={formProject.statusEn}
                      onChange={(e) => setFormProject({ ...formProject, statusEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Deskripsi (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  required
                  value={formProject.descriptionId}
                  onChange={(e) => setFormProject({ ...formProject, descriptionId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Description (English)</label>
                <textarea
                  rows={2}
                  required
                  value={formProject.descriptionEn}
                  onChange={(e) => setFormProject({ ...formProject, descriptionEn: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Meta Highlight (ID)</label>
                  <input
                    type="text"
                    placeholder="1.200+ Sampel Tanah"
                    value={formProject.metaId}
                    onChange={(e) => setFormProject({ ...formProject, metaId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Meta Highlight (EN)</label>
                  <input
                    type="text"
                    placeholder="1,200+ Soil Samples"
                    value={formProject.metaEn}
                    onChange={(e) => setFormProject({ ...formProject, metaEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Tags (Dipisah Koma)</label>
                <input
                  type="text"
                  placeholder="Genomics, Soil Health, Mycorrhizae"
                  value={formProject.tags}
                  onChange={(e) => setFormProject({ ...formProject, tags: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-300">Gambar Proyek</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    required
                    placeholder="https://... atau /uploads/..."
                    value={formProject.image}
                    onChange={(e) => setFormProject({ ...formProject, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm"
                  />

                  <label className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 cursor-pointer flex items-center space-x-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "..." : "Unggah"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const url = await handleFileUpload(e.target.files[0]);
                          if (url) {
                            setFormProject({ ...formProject, image: url });
                          }
                        }
                      }}
                    />
                  </label>
                </div>

                {formProject.image && (
                  <div className="relative h-32 w-full rounded-xl overflow-hidden border border-stone-800 mt-2">
                    <Image src={formProject.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-stone-800 text-stone-400 hover:text-white text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? "Simpan Perubahan" : "Tambah Proyek"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
