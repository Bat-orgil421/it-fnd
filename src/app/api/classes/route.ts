import { NextRequest, NextResponse } from "next/server";
import { classes } from "@/lib/data";
import { nanoid } from "nanoid";

export const GET = async () => {
  const allClasses = classes;

  return NextResponse.json(allClasses);
};

export const POST = async (req: NextRequest) => {
  try {
    const requestData = await req.json();

    const newClasses = {
      name: requestData.name,
      id: nanoid(),
    };
    classes?.push(newClasses);

    return NextResponse.json({ status: 202, data: newClasses });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 500, message: `error: ${error}` });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 500, message: `error: ${error}` });
  }
};
