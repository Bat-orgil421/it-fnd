import { classes } from "@/lib/data";
import { AreaChartIcon } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const data = classes?.filter((item) => item.id === id);

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: `error: ${error}` }, { status: 500 });
  }
};
