import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_SETTINGS: Record<string, string> = {
  hero_image: "/uploads/clip_ipb.mp4",
  about_image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop",
};

export async function GET() {
  try {
    const settingsList = await prisma.siteSetting.findMany();
    const settingsObj: Record<string, string> = { ...DEFAULT_SETTINGS };

    settingsList.forEach((item: { key: string; value: string }) => {
      settingsObj[item.key] = item.value;
    });

    return NextResponse.json({ settings: settingsObj, success: true });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS, success: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || typeof value !== "string") {
      return NextResponse.json({ error: "Invalid key or value" }, { status: 400 });
    }

    const updatedSetting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ setting: updatedSetting, success: true });
  } catch (error) {
    console.error("POST settings error:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
