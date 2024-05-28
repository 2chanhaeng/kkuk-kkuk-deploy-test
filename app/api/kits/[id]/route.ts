import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const kit = await prisma.kit.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      tags: true,
      thumbnailImage: true,
      rewardImage: true,
      uploader: true,
      stamps: true,
    },
  });

  return NextResponse.json({ data: kit }, { status: kit ? 200 : 404 });
}
