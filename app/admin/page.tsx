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
  Lock,
  LogOut,
  Key,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
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
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // CMS State
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
    const authStored = localStorage.getItem("ares_authenticated");
    if (authStored === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
    setCheckingAuth(false);
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const targetEmail = "ares@gmail.com";
    const targetPw = "ares123";

    if (
      loginEmail.trim().toLowerCase() === targetEmail &&
      loginPassword === targetPw
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("ares_authenticated", "true");
      showNotify("Verifikasi berhasil! Selamat datang di Ares Panel.");
      fetchData();
    } else {
      setLoginError("Email atau Password tidak sesuai! Silakan periksa kembali.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ares_authenticated");
    setLoginEmail("");
    setLoginPassword("");
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Image / Video Upload Handler with Stats
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onSuccess(data.url);
        const savedText = data.stats?.savings ? ` (Kompresi ${data.stats.savings} lebih ringan)` : "";
        showNotify(`Media berhasil diunggah dan di-compress!${savedText}`);
      } else {
        alert("Gagal mengunggah file.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Terjadi kesalahan saat mengunggah.");
    } finally {
      setUploading(false);
    }
  };

  // Open Modal Add Project
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormProject({
      titleEn: "",
      titleId: "",
      category: "Agronomy",
      statusEn: "Published Data",
      statusId: "Data Dipublikasi",
      descriptionEn: "",
      descriptionId: "",
      metaEn: "",
      metaId: "",
      tags: "Research, Innovation",
      image: "/uploads/clip_ipb.mp4",
    });
    setIsModalOpen(true);
  };

  // Open Modal Edit Project
  const handleOpenEdit = (item: ProjectItem) => {
    setEditingId(item.id || null);
    setFormProject({ ...item });
    setIsModalOpen(true);
  };

  // Save Project (Create / Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formProject, id: editingId } : formProject;

      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  // Save Site Settings (Hero & About media)
  const handleSaveSettings = async (key: string, value: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      }).then((r) => r.json());

      if (res.success) {
        showNotify(`Pengaturan media ${key} berhasil disimpan!`);
        fetchData();
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setSaving(false);
    }
  };

  const isVideo = (url?: string) =>
    url ? url.toLowerCase().endsWith(".mp4") || url.toLowerCase().endsWith(".webm") : false;

  // 1. Initial Checking Screen
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0C110E] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // 2. Unauthenticated LOGIN GATE Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C110E] text-stone-100 font-sans flex flex-col justify-center items-center px-6 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-stone-950/90 border border-stone-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-title text-2xl font-bold tracking-tight text-white">
              Ares Panel Verification
            </h1>
            <p className="text-xs text-stone-400">
              Masukkan Email dan Password untuk mengakses Dashboard
            </p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Email Access
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Ares@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-stone-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-stone-600 pr-11 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-900/30 active:scale-[0.99] mt-2 flex items-center justify-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Verifikasi & Masuk Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-900 text-center">
            <a
              href="/"
              className="text-xs text-stone-400 hover:text-emerald-400 transition-colors inline-flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Utama</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated DASHBOARD Screen
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
                <span>Ares Panel</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                  Live DB
                </span>
              </h1>
              <p className="text-xs text-stone-400">Kelola Data Proyek & Media Landing Page (Gambar & Video MP4)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-full bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-200 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Lihat Website ↗
            </a>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5"
              title="Keluar dari Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
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
        <div className="flex items-center space-x-3 border-b border-stone-800/80 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "projects"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                : "bg-stone-900/60 text-stone-400 hover:text-white border border-stone-800"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Kelola Riset & Proyek</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "settings"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                : "bg-stone-900/60 text-stone-400 hover:text-white border border-stone-800"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Ubah Media Landing Page</span>
          </button>
        </div>

        {/* TAB 1: Projects Management */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-950/60 p-6 rounded-2xl border border-stone-800/80">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Daftar Proyek & Riset</span>
                  <span className="text-xs font-normal text-stone-400">({projects.length} Total)</span>
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Seluruh perubahan data proyek di sini akan langsung tampil pada landing page utama.
                </p>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                <p className="text-stone-400 text-sm">Memuat data proyek...</p>
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
                    className="bg-stone-950 border border-stone-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300 shadow-lg"
                  >
                    <div>
                      {/* Media Header */}
                      <div className="relative h-44 w-full bg-stone-900 overflow-hidden">
                        {isVideo(proj.image) ? (
                          <video
                            src={proj.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={proj.image || "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=600"}
                            alt={proj.titleId}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                          {proj.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="space-y-1">
                          <h3 className="font-bold text-white text-base line-clamp-1">{proj.titleId}</h3>
                          <p className="text-xs text-stone-400 font-serif italic line-clamp-1">{proj.titleEn}</p>
                        </div>

                        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                          {proj.descriptionId}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-5 py-4 bg-stone-900/50 border-t border-stone-800/60 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 font-mono">{proj.metaId}</span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-2 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white transition-colors"
                          title="Edit Proyek"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => proj.id && handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white transition-colors"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Site Media Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-stone-950/60 p-6 rounded-2xl border border-stone-800/80 space-y-1">
              <h2 className="text-lg font-bold text-white">Ubah Media Landing Page</h2>
              <p className="text-xs text-stone-400">
                Ganti gambar atau video MP4 yang tampil di Hero Section utama portofolio.
              </p>
            </div>

            {/* Hero Media Card */}
            <div className="bg-stone-950 border border-stone-800/80 p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Media Utama Hero Section</h3>
                  <p className="text-xs text-stone-400">Tampilan media besar paling atas landing page (Mendukung JPG, PNG, & MP4)</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  Hero Showcase
                </span>
              </div>

              {/* Preview */}
              <div className="relative h-64 w-full bg-stone-900 rounded-xl overflow-hidden border border-stone-800">
                {isVideo(settings.hero_image || "/uploads/clip_ipb.mp4") ? (
                  <video
                    src={settings.hero_image || "/uploads/clip_ipb.mp4"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={settings.hero_image || "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1000"}
                    alt="Hero Preview"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Upload Input & URL input */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Unggah File Baru (Otomatis Di-Compress)
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="cursor-pointer px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : <Upload className="w-4 h-4 text-emerald-400" />}
                    <span>{uploading ? "Mengunggah & Compress..." : "Pilih Foto / Video MP4"}</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleFileUpload(e, (url) => {
                          setSettings((prev) => ({ ...prev, hero_image: url }));
                        })
                      }
                    />
                  </label>

                  <input
                    type="text"
                    value={settings.hero_image || "/uploads/clip_ipb.mp4"}
                    onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })}
                    placeholder="/uploads/clip_ipb.mp4 atau URL media"
                    className="flex-1 px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-900 flex justify-end">
                <button
                  onClick={() => handleSaveSettings("hero_image", settings.hero_image || "/uploads/clip_ipb.mp4")}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-widest flex items-center space-x-2 transition-all shadow-md"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Simpan Perubahan Hero Media</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL EDIT / ADD PROJECT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-6 p-6 md:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{editingId ? "Edit Proyek Riset" : "Tambah Proyek Riset Baru"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              {/* Bahasa Indonesia Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Judul (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    required
                    value={formProject.titleId}
                    onChange={(e) => setFormProject({ ...formProject, titleId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Contoh: Optimalisasi Mikronutrisi Tanah"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Judul (English)</label>
                  <input
                    type="text"
                    required
                    value={formProject.titleEn}
                    onChange={(e) => setFormProject({ ...formProject, titleEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Contoh: Soil Micronutrient Optimization"
                  />
                </div>
              </div>

              {/* Category & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Kategori Riset</label>
                  <input
                    type="text"
                    required
                    value={formProject.category}
                    onChange={(e) => setFormProject({ ...formProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Agronomy, Biotech, Remote Sensing"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Tags (Pisahkan Koma)</label>
                  <input
                    type="text"
                    required
                    value={formProject.tags}
                    onChange={(e) => setFormProject({ ...formProject, tags: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="NPK, Sensor, AI"
                  />
                </div>
              </div>

              {/* Description ID */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Deskripsi Ringkas (Indonesia)</label>
                <textarea
                  rows={3}
                  required
                  value={formProject.descriptionId}
                  onChange={(e) => setFormProject({ ...formProject, descriptionId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Penjelasan singkat mengenai metode dan hasil riset..."
                />
              </div>

              {/* Description EN */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Deskripsi Ringkas (English)</label>
                <textarea
                  rows={3}
                  required
                  value={formProject.descriptionEn}
                  onChange={(e) => setFormProject({ ...formProject, descriptionEn: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Brief description of research methods and outcomes..."
                />
              </div>

              {/* Meta Stats ID & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Statistik Meta (Indonesia)</label>
                  <input
                    type="text"
                    required
                    value={formProject.metaId}
                    onChange={(e) => setFormProject({ ...formProject, metaId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Contoh: 8 Lapangan Uji • Peningkatan Hasil +24%"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Statistik Meta (English)</label>
                  <input
                    type="text"
                    required
                    value={formProject.metaEn}
                    onChange={(e) => setFormProject({ ...formProject, metaEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Contoh: 8 Field Sites • +24% Yield Increase"
                  />
                </div>
              </div>

              {/* Upload Image / Video */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="block text-xs font-semibold text-stone-300">File Gambar / Video Proyek</label>
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white text-xs font-semibold flex items-center space-x-2">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : <Upload className="w-4 h-4 text-emerald-400" />}
                    <span>{uploading ? "Compress..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleFileUpload(e, (url) => {
                          setFormProject((prev) => ({ ...prev, image: url }));
                        })
                      }
                    />
                  </label>

                  <input
                    type="text"
                    required
                    value={formProject.image}
                    onChange={(e) => setFormProject({ ...formProject, image: e.target.value })}
                    placeholder="/uploads/file.webp atau URL"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-stone-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-md"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
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
