import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { patientName, phone, reportName, reportFileUrl, reportFileName } =
    await req.json();
  try {
    const user = await prisma.userDetails.upsert({
      where: { phoneNumber: phone },
      update: {
        name: patientName ?? undefined,
        reports: {
          create: {
            reportName: reportName ?? undefined,
            reportFileName: reportFileName ?? undefined,
            reportFileUrl: reportFileUrl ?? undefined,
          },
        },
      },
      create: {
        name: patientName ?? undefined,
        phoneNumber: phone,
        reports: {
          create: {
            reportName: reportName ?? undefined,
            reportFileName: reportFileName ?? undefined,
            reportFileUrl: reportFileUrl ?? undefined,
          },
        },
      },
    });
    console.log("User Details Inserted Successfully", user);
    return NextResponse.json(
      { message: "Patient details inserted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error inserting patient details" },
      { status: 500 }
    );
  }
}
