import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { skip, limit, search, order } = await request.json();

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          {
            phoneNumber: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const response = await prisma.userDetails.findMany({
    skip: skip,
    take: limit ? limit : undefined,
    where: whereClause,
    orderBy: {
      createdAt: order || "desc",
    },
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      email: true,
      address: true,
      gender: true,
      age: true,
      purchases: true,
      reports: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  console.log(response);
  return NextResponse.json(response);
}
