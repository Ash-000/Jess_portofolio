import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_PROJECTS = [
  {
    titleEn: "Micro-Climate Sensor Array",
    titleId: "Sensor Array Mikro-Iklim",
    category: "Engineering & IoT",
    statusEn: "Published Data",
    statusId: "Data Dipublikasi",
    descriptionEn: "Autonomous telemetry nodes measuring soil volumetric water content, canopy temperature, and PAR flux in real-time.",
    descriptionId: "Node telemetri otonom yang mengukur kandungan air volumetrik tanah, suhu kanopi, dan fluks PAR secara real-time.",
    metaEn: "99.4% Uptime · solar-powered",
    metaId: "Uptime 99,4% · tenaga surya",
    tags: "IoT Sensors, LoRaWAN, Micro-Climate, Soil Moisture",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Soil Microbiome Genomics",
    titleId: "Genomika Mikrobioma Tanah",
    category: "Agronomy Research",
    statusEn: "Active Trial",
    statusId: "Uji Coba Aktif",
    descriptionEn: "Longitudinal metagenomic sequencing of mycorrhizal fungi network resilience under prolonged drought conditions.",
    descriptionId: "Sekuensing metagenomik longitudinal jaringan jamur mikoriza di bawah kondisi kekeringan berkepanjangan.",
    metaEn: "1,200+ Soil Samples · 4 Biomes",
    metaId: "1.200+ Sampel Tanah · 4 Bioma",
    tags: "Genomics, Soil Health, Mycorrhizae, Bio-Fertilizers",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Automated Precision Irrigation",
    titleId: "Irigasi Presisi Terautomasi",
    category: "Smart Farming",
    statusEn: "In Field Trial",
    statusId: "Uji Lapangan",
    descriptionEn: "Closed-loop fertigation control system using real-time sap flow telemetry to optimize crop water efficiency.",
    descriptionId: "Sistem kontrol fertigasi closed-loop menggunakan telemetri aliran getah real-time untuk efisiensi air tanaman.",
    metaEn: "38% Water Saved · 15 ha Trial",
    metaId: "38% Hemat Air · Lahan 15 ha",
    tags: "Fertigation, Precision Ag, Sap Flow, Automation",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Vertical Aeroponic Crop Yield Study",
    titleId: "Studi Hasil Panen Aeroponik Vertikal",
    category: "Urban Agriculture",
    statusEn: "Completed Study",
    statusId: "Studi Selesai",
    descriptionEn: "Comparative analysis of leafy green biomass accumulation under custom LED spectrum regimes in vertical misting chambers.",
    descriptionId: "Analisis komparatif akumulasi biomassa sayuran daun di bawah pengkondisian spektrum LED khusus pada ruang kabut vertikal.",
    metaEn: "+42% Biomass · 0 Pesticides",
    metaId: "+42% Biomassa · 0 Pestisida",
    tags: "Aeroponics, Urban Farming, LED Spectrum, Biomass",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Biochar Carbon Sequestration Model",
    titleId: "Model Sekuestrasi Karbon Biochar",
    category: "Environmental Tech",
    statusEn: "Peer Reviewed",
    statusId: "Penelaahan Sejawat",
    descriptionEn: "Quantifying long-term soil carbon persistence across tropical latosol soils amended with pyrolyzed agricultural biomass.",
    descriptionId: "Mengukur persistensi karbon tanah jangka panjang pada tanah latosol tropis yang diperbaiki dengan biomassa pertanian terpirolisis.",
    metaEn: "15-Year Carbon Half-Life",
    metaId: "Waktu Paruh Karbon 15 Tahun",
    tags: "Biochar, Carbon Sink, Tropical Soil, Sequestration",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Multispectral Drone Crop Stress Mapping",
    titleId: "Pemetaan Stres Tanaman Drone Multispektral",
    category: "Remote Sensing",
    statusEn: "Active Flight Phase",
    statusId: "Fase Penerbangan",
    descriptionEn: "UAV-mounted multispectral imaging detecting NDVI stress patterns before visible chlorosis in large-scale orchards.",
    descriptionId: "Pencitraan multispektral UAV mendeteksi pola stres NDVI sebelum klorosis yang terlihat pada perkebunan skala besar.",
    metaEn: "sub-cm/pixel resolution · 500 ha mapped",
    metaId: "Resolusi sub-cm/piksel · 500 ha terpetakan",
    tags: "Drone Mapping, NDVI, Crop Stress, Remote Sensing",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop",
  },
];

export async function GET() {
  try {
    let projects = await prisma.project.findMany({
      orderBy: { id: "asc" },
    });

    // Auto seed if empty
    if (projects.length === 0) {
      await prisma.project.createMany({
        data: DEFAULT_PROJECTS,
      });
      projects = await prisma.project.findMany({
        orderBy: { id: "asc" },
      });
    }

    return NextResponse.json({ projects, success: true });
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = await prisma.project.create({
      data: {
        titleEn: body.titleEn || body.titleId || "Untitled Project",
        titleId: body.titleId || body.titleEn || "Proyek Tanpa Judul",
        category: body.category || "Agronomy",
        statusEn: body.statusEn || "Active",
        statusId: body.statusId || "Aktif",
        descriptionEn: body.descriptionEn || "",
        descriptionId: body.descriptionId || "",
        metaEn: body.metaEn || "",
        metaId: body.metaId || "",
        tags: body.tags || "",
        image: body.image || "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop",
      },
    });
    return NextResponse.json({ project: newProject, success: true });
  } catch (error) {
    console.error("POST project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({ project: updatedProject, success: true });
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
